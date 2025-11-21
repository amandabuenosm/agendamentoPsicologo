const Psicologo = require('../models/psicologosModel');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.cadastro = async (req, res) => { // criar novo psicólogo
  try {
	const psicologo = await Psicologo.create(req.body);
	const { senhaPsicologo, ...psicologoSemSenha } = psicologo.toJSON();

	res.status(201).json({
	  message: 'Psicólogo criado com sucesso!',
	  data: psicologoSemSenha
	});
  } catch (error) {
	if (error.name === 'SequelizeUniqueConstraintError') { // tratar erro de dados únicos
	  const campos = error.errors.map(err => err.path);
	  return res.status(400).json({ 
		erro: 'Dados já existentes',
		mensagem: `Os seguintes campos já estão em uso: ${campos.join(', ')}`
	  });
	} res.status(500).json({ 
	  erro: 'Erro interno do servidor',
	  mensagem: error.message
	});
  }
};

exports.login = async (req, res) => { // login do psicólogo
  try {
	const { emailPsicologo, senhaPsicologo } = req.body;

	if (!emailPsicologo || !senhaPsicologo) { // validar campos obrigatórios
	  return res.status(400).json({
		erro: 'Dados incompletos',
		mensagem: 'Email e senha são obrigatórios'
	  });
	}

	const psicologo = await Psicologo.findOne({ 
	  where: { emailPsicologo } 
	});

	if (!psicologo) { // campos do login inválidos
	  return res.status(401).json({
		erro: 'Credenciais inválidas',
		mensagem: 'E-mail ou senha incorretos!'
	  });
	}

	const isPasswordValid = await psicologo.validarSenha(senhaPsicologo); // validar senha no login
	if (!isPasswordValid) {
	  return res.status(401).json({
		erro: 'Credenciais inválidas',
		mensagem: 'Senha incorreta!'
	  });
	}

	const psicologoData = { // mostrar dados do psicólogo logado
	  id: psicologo.id,
	  nome: psicologo.nomePsicologo,
	  crp: psicologo.crp,
	  especialidades: psicologo.especialidades
	};

	res.json({
	  message: 'Login realizado com sucesso!',
	  psicologo: psicologoData
	});
  } catch (error) {
	console.error('Erro no login:', error);
	res.status(500).json({
	  erro: 'Erro interno do servidor',
	  mensagem: error.message
	});
  }
};

exports.listarPsicologos = async (req, res) => { // listar todos os psicólogos
  try {
	const psicologos = await Psicologo.findAll({
	  attributes: { exclude: ['senhaPsicologo', 'createdAt', 'updatedAt'] }
	});

	res.json({
	  message: 'Psicólogos encontrados com sucesso!',
	  quantidade: psicologos.length,
	  dados: psicologos
	});
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.buscarPeloId = async (req, res) => { // buscar psicólogo por ID
  try {
	const psicologo = await Psicologo.findByPk(req.params.id, {
	  attributes: { exclude: ['senhaPsicologo', 'createdAt', 'updatedAt'] }
	});

	if (!psicologo) {
	  return res.status(404).json({
		erro: 'Psicólogo não encontrado',
		mensagem: `Nenhum psicólogo encontrado com o ID: ${req.params.id}`
	  });
	}

	res.json({
	  message: 'Psicólogo encontrado com sucesso!',
	  dados: psicologo
	});
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.buscarPeloCrp = async (req, res) => { // buscar psicólogo por CRP
  try {
	const psicologo = await Psicologo.findOne({
	  where: { crp: req.params.crp },
	  attributes: { exclude: ['senhaPsicologo', 'createdAt', 'updatedAt'] }
	});

	if (!psicologo) {
	  return res.status(404).json({
		erro: 'Psicólogo não encontrado',
		mensagem: `Nenhum psicólogo encontrado com o CRP: ${req.params.crp}`
	  });
	}

	res.json({
	  message: 'Psicólogo encontrado com sucesso!',
	  dados: psicologo
	});
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.buscarPelaEspecialidade = async (req, res) => { // buscar psicólogos por especialidade
  try {
	const { especialidades } = req.params;

	const psicologos = await Psicologo.findAll({
	  where: { especialidades: { [Op.like]: `%${especialidades}%` } }, // busca parcial de especialidade
	  attributes: { exclude: ['senhaPsicologo', 'createdAt', 'updatedAt'] }
	});

	if (psicologos.length === 0) {
	  return res.status(404).json({
		erro: 'Psicólogo não encontrado',
		mensagem: `Nenhum psicólogo encontrado com a especialidade: ${especialidades}`
	  });
	}

	res.json({
	  message: `Psicólogos com especialidade em ${especialidades}`,
	  dados: psicologos
	});
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.buscarPelaModalidade = async (req, res) => { // buscar psicólogos por modalidade de atendimento
  try {
	const { modalidade } = req.params;

	const psicologos = await Psicologo.findAll({
	  attributes: { exclude: ['senhaPsicologo', 'createdAt', 'updatedAt'] }
	});

	const filtrados = psicologos.filter(p => // filtrar todos os psicólogos pela modalidade
	  p.modalidadeAtendimento.includes(modalidade)
	);

	res.json({
	  message: `Psicólogos com atendimento ${modalidade.toLowerCase()}`,
	  quantidade: filtrados.length,
	  dados: filtrados
	});
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.editarPeloId = async (req, res) => { // atualizar psicólogo pelo ID
  try {
	const psicologo = await Psicologo.findByPk(req.params.id);

	if (!psicologo) {
	  return res.status(404).json({
		erro: 'Psicólogo não encontrado',
		mensagem: `Nenhum psicólogo encontrado com o ID: ${req.params.id}`
	  });
	}
	await psicologo.update(req.body);
	const { senhaPsicologo, ...psicologoSemSenha } = psicologo.toJSON();

	res.json({
	  message: 'Psicólogo atualizado com sucesso!',
	  dados: psicologoSemSenha
	});
  } catch (error) {
	if (error.name === 'SequelizeUniqueConstraintError') {
	  const campos = error.errors.map(err => err.path);
	  return res.status(400).json({ 
		erro: 'Dados já existentes',
		mensagem: `Os seguintes campos já estão em uso: ${campos.join(', ')}`
	  });
	} res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.deletarPeloId = async (req, res) => { // excluir psicólogo pelo ID
  try {
	const psicologo = await Psicologo.findByPk(req.params.id);

	if (!psicologo) {
	  return res.status(404).json({
		erro: 'Psicólogo não encontrado',
		mensagem: `Nenhum psicólogo encontrado com o ID: ${req.params.id}`
	  });
	} await psicologo.destroy();

	res.status(200).json({
	  message: 'Psicólogo excluído com sucesso!',
	  idDeletado: req.params.id
	});
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.editarSenha = async (req, res) => { // atualizar senha (com o usuário já logado)
  try {
	const { senhaAtual, novaSenhaPsicologo } = req.body;
	const { id } = req.params;

	const psicologo = await Psicologo.findByPk(id);
	if (!psicologo) {
	  return res.status(404).json({
		erro: 'Psicólogo não encontrado',
		mensagem: `Nenhum psicólogo encontrado com o ID: ${id}`
	  });
	}
	
	const senhaCorreta = await bcrypt.compare(senhaAtual, psicologo.senhaPsicologo);
	if (!senhaCorreta) { // verificar senha atual
	  return res.status(401).json({
		erro: 'Senha incorreta',
		mensagem: 'A senha atual fornecida está incorreta'
	  });
	}
	
	const novaSenhaCriptografada = await bcrypt.hash(novaSenhaPsicologo, 10); // editar senha
	await psicologo.update({ senhaPsicologo: novaSenhaCriptografada });

	res.json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};

exports.resetPassword = async (req, res) => { // resetar senha (esquecida pelo usuário no login)
  try {
	const { emailPsicologo, novaSenhaPsicologo } = req.body;
	const { id } = req.params;

	const psicologo = await Psicologo.findByPk(id);
	if (!psicologo) {
	  return res.status(404).json({
		erro: 'Psicólogo não encontrado',
		mensagem: `Nenhum psicólogo encontrado com o ID: ${id}`
	  });
	}
	
	if (!psicologo.emailPsicologo) { // solicitar e-mail cadastrado
	  return res.status(400).json({
		erro: 'E-mail não cadastrado',
		mensagem: 'Não é possível redefinir a senha sem um e-mail registrado'
	  });
	}
	
	if (emailPsicologo !== psicologo.emailPsicologo) { // verificar se existe usuário com o email fornecido
	  return res.status(401).json({
		erro: 'E-mail incorreto',
		mensagem: 'O e-mail informado não corresponde a nenhum usuário cadastrado. Tente outro e-mail!'
	  });
	}

	const novaSenhaCriptografada = await bcrypt.hash(novaSenhaPsicologo, 10); // resetar senha
	await psicologo.update({ senhaPsicologo: novaSenhaCriptografada });

	res.json({ message: 'Senha resetada com sucesso!' });
  } catch (error) {
	res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
  }
};
