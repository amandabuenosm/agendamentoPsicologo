const Paciente = require('../models/pacientesModel');
const bcrypt = require('bcrypt');

exports.cadastro = async (req, res) => { // criar novo paciente
    try {
        const paciente = await Paciente.create(req.body);
        const { senhaPaciente, ...pacienteSemSenha } = paciente.toJSON();

        res.status(201).json({
            message: 'Paciente criado com sucesso!',
            data: pacienteSemSenha
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') { // tratar erro de dados únicos
            const campos = error.errors.map(err => err.path);
            return res.status(400).json({ 
                erro: 'Dados já existentes',
                mensagem: `Os seguintes campos já estão em uso: ${campos.join(', ')}`
            });
        } res.status(500).json ({
            erro: 'Erro interno do servidor',
            mensagem: error.message
        });
    }
};

exports.login = async (req, res) => { // login do paciente
    try {
        const { cpfPaciente, senhaPaciente } = req.body;

        if (!cpfPaciente || !senhaPaciente) { // validar campos obrigatórios
            return res.status(400).json({
                erro: 'Dados incompletos',
                mensagem: 'CPF e senha são obrigatórios'
            });
        }

        const paciente = await Paciente.findOne({
            where: { cpfPaciente}
        });

        if (!paciente) { // campos do login inválidos
            return res.status(401).json({
                erro: 'Credenciais inválidas',
                mensagem: 'CPF ou senha incorretos!'
            });
        }

        const isPasswordValid = await paciente.validarSenha(senhaPaciente); // validar senha no login
        if (!isPasswordValid) {
            return res.status(401).json({
                erro: 'Credenciais inválidas',
                mensagem: 'Senha incorreta!'
            });
        }

        const pacienteData = { // mostrar dados do paciente logado
            id: paciente.id,
            nome: paciente.nomePaciente,
            cpf: paciente.cpfPaciente,
            idade: paciente.idadePaciente
        };

        res.json({
            message: 'Login realizado com sucesso!',
            data: pacienteData
        });
    } catch (error) {
        console.error('Erro no login:', error);
		res.status(500).json({
			erro: 'Erro interno do servidor',
			mensagem: error.message
		});
    }
};

exports.listarPacientes = async (req, res) => { // listar todos os pacientes
    try {
        const pacientes = await Paciente.findAll({
            atributtes: { exclude: ['senhaPaciente', 'createdAt', 'updatedAt'] }
        });

        res.json({
            message: 'Pacientes enontrados com sucesso!',
            quantidade: pacientes.length,
            dados: pacientes
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
    }
};

exports.buscarPeloId = async (req, res) => { // buscar paciente pelo ID
    try {
		const paciente = await Paciente.findByPk(req.params.id, {
			attributes: { exclude: ['senhaPaciente', 'createdAt', 'updatedAt'] }
		});

		if (!paciente) {
			return res.status(404).json({
				erro: 'Paciente não encontrado',
				mensagem: `Nenhum paciente encontrado com o ID: ${req.params.id}`
			});
		}

		res.json({
			message: 'Paciente encontrado com sucesso!',
			dados: paciente
		});
	} catch (error) {
		res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
	}
};

exports.buscaPeloCpf = async (req, res) => { // buscar paciente pelo CPF
    try {
		const paciente = await Paciente.findOne({
			where: { cpfPaciente: req.params.cpfPaciente },
			attributes: { exclude: ['senhaPaciente', 'createdAt', 'updatedAt'] }
		});

		if (!paciente) {
			return res.status(404).json({
				erro: 'Paciente não encontrado',
				mensagem: `Nenhum paciente encontrado com o CRP: ${req.params.crp}`
			});
		}

		res.json({
			message: 'Paciente encontrado com sucesso!',
			dados: paciente
		});
	} catch (error) {
		res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
	}
};

exports.editarPeloId = async (req, res) => { // editar paciente pelo Id
    try {
		const paciente = await Paciente.findByPk(req.params.id);

		if (!paciente) {
			return res.status(404).json({
				erro: 'Paciente não encontrado',
				mensagem: `Nenhum paciente encontrado com o ID: ${req.params.id}`
			});
		}
		await paciente.update(req.body);
		const { senhaPaciente, ...pacienteSemSenha } = paciente.toJSON();

		res.json({
			message: 'Paciente atualizado com sucesso!',
			dados: pacienteSemSenha
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

exports.deletarPeloId = async (req, res) => { // excluir paciente pelo ID
	try {
		const paciente = await Paciente.findByPk(req.params.id);

		if (!paciente) {
			return res.status(404).json({
				erro: 'Paciente não encontrado',
				mensagem: `Nenhum paciente encontrado com o ID: ${req.params.id}`
			});
		} await paciente.destroy();

		res.status(200).json({
			message: 'Paciente excluído com sucesso!',
			idDeletado: req.params.id
		});
	} catch (error) {
		res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
	}
};

exports.editarSenha = async (req, res) => { // atualizar senha (com o usuário já logado)
	try {
		const { senhaAtual, novaSenhaPaciente } = req.body;
		const { id } = req.params;

		const paciente = await Paciente.findByPk(id);
		if (!paciente) {
			return res.status(404).json({
				erro: 'Paciente não encontrado',
				mensagem: `Nenhum paciente encontrado com o ID: ${id}`
			});
		}
		
		const senhaCorreta = await bcrypt.compare(senhaAtual, paciente.senhaPaciente);
		if (!senhaCorreta) { // verificar senha atual
			return res.status(401).json({
				erro: 'Senha incorreta',
				mensagem: 'A senha atual fornecida está incorreta'
			});
		}
		
		const novaSenhaCriptografada = await bcrypt.hash(novaSenhaPaciente, 10); // editar senha
		await paciente.update({ senhaPaciente: novaSenhaCriptografada });

		res.json({ message: 'Senha atualizada com sucesso!' });
	} catch (error) {
		res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
	}
};

exports.resetPassword = async (req, res) => { // resetar senha (esquecida pelo usuário no login)
	try {
		const { emailPaciente, novaSenhaPaciente } = req.body;
		const { id } = req.params;

		const paciente = await Paciente.findByPk(id);
		if (!paciente) {
			return res.status(404).json({
				erro: 'Paciente não encontrado',
				mensagem: `Nenhum paciente encontrado com o ID: ${id}`
			});
		}
		
		if (!paciente.emailPaciente) { // solicitar e-mail cadastrado
			return res.status(400).json({
				erro: 'E-mail não cadastrado',
				mensagem: 'Não é possível redefinir a senha sem um e-mail registrado'
			});
		}
		
		if (emailPaciente !== paciente.emailPaciente) { // verificar se existe usuário com o email fornecido
			return res.status(401).json({
				erro: 'E-mail incorreto',
				mensagem: 'O e-mail informado não corresponde a nenhum usuário cadastrado. Tente outro e-mail!'
			});
		}

		const novaSenhaCriptografada = await bcrypt.hash(novaSenhaPaciente, 10); // resetar senha
		await paciente.update({ senhaPaciente: novaSenhaCriptografada });

		res.json({ message: 'Senha resetada com sucesso!' });
	} catch (error) {
		res.status(500).json({ erro: 'Erro interno do servidor', mensagem: error.message });
	}
};
