package br.com.mindcare.service;

import br.com.mindcare.dto.PsicologoRequest;
import br.com.mindcare.dto.PsicologoResponse;
import br.com.mindcare.model.Psicologo;
import br.com.mindcare.repository.PsicologoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PsicologoService {

    private final PsicologoRepository psicologoRepository;
    private final PasswordEncoder passwordEncoder;

    public PsicologoService(PsicologoRepository psicologoRepository,
                            PasswordEncoder passwordEncoder) {
        this.psicologoRepository = psicologoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public PsicologoResponse criar(PsicologoRequest request) {

        if (psicologoRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Já existe um psicólogo com esse e-mail");
        }

        if (psicologoRepository.existsByCpf(request.getCpf())) {
            throw new IllegalArgumentException("Já existe um psicólogo com esse CPF");
        }

        if (psicologoRepository.existsByCrp(request.getCrp())) {
            throw new IllegalArgumentException("Já existe um psicólogo com esse CRP");
        }

        Psicologo psicologo = new Psicologo();
        psicologo.setNome(request.getNome());
        psicologo.setCpf(request.getCpf());
        psicologo.setCrp(request.getCrp());
        psicologo.setTelefone(request.getTelefone());
        psicologo.setEmail(request.getEmail());

        // Criptografa a senha antes de salvar
        String senhaCriptografada = passwordEncoder.encode(request.getSenha());
        psicologo.setSenha(senhaCriptografada);

        psicologo.setDataNascimento(request.getDataNascimento());
        psicologo.setEspecialidade(request.getEspecialidade());
        psicologo.setEnderecoConsultorio(request.getEnderecoConsultorio());
        psicologo.setCidade(request.getCidade());
        psicologo.setEstado(request.getEstado());
        psicologo.setValorConsulta(request.getValorConsulta());
        psicologo.setModalidadeAtendimento(request.getModalidadeAtendimento());
        psicologo.setDataCadastro(LocalDate.now());
        psicologo.setAtivo(true);

        Psicologo salvo = psicologoRepository.save(psicologo);

        return toResponse(salvo);
    }

    @Transactional(readOnly = true)
    public List<PsicologoResponse> listarTodos() {
        return psicologoRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PsicologoResponse buscarPorId(Long id) {
        Psicologo psicologo = psicologoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Psicólogo não encontrado"));
        return toResponse(psicologo);
    }

    @Transactional
    public PsicologoResponse atualizar(Long id, PsicologoRequest request) {
        Psicologo psicologo = psicologoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Psicólogo não encontrado"));

        psicologo.setNome(request.getNome());
        psicologo.setTelefone(request.getTelefone());
        psicologo.setDataNascimento(request.getDataNascimento());
        psicologo.setEspecialidade(request.getEspecialidade());
        psicologo.setEnderecoConsultorio(request.getEnderecoConsultorio());
        psicologo.setCidade(request.getCidade());
        psicologo.setEstado(request.getEstado());
        psicologo.setValorConsulta(request.getValorConsulta());
        psicologo.setModalidadeAtendimento(request.getModalidadeAtendimento());

        Psicologo atualizado = psicologoRepository.save(psicologo);
        return toResponse(atualizado);
    }

    @Transactional
    public void inativar(Long id) {
        Psicologo psicologo = psicologoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Psicólogo não encontrado"));

        psicologo.setAtivo(false);
        psicologoRepository.save(psicologo);
    }

    private PsicologoResponse toResponse(Psicologo psicologo) {
        PsicologoResponse resp = new PsicologoResponse();
        resp.setId(psicologo.getId());
        resp.setNome(psicologo.getNome());
        resp.setCpf(psicologo.getCpf());
        resp.setCrp(psicologo.getCrp());
        resp.setTelefone(psicologo.getTelefone());
        resp.setEmail(psicologo.getEmail());
        resp.setDataNascimento(psicologo.getDataNascimento());
        resp.setEspecialidade(psicologo.getEspecialidade());
        resp.setEnderecoConsultorio(psicologo.getEnderecoConsultorio());
        resp.setCidade(psicologo.getCidade());
        resp.setEstado(psicologo.getEstado());
        resp.setValorConsulta(psicologo.getValorConsulta());
        resp.setModalidadeAtendimento(psicologo.getModalidadeAtendimento());
        resp.setDataCadastro(psicologo.getDataCadastro());
        resp.setAtivo(psicologo.getAtivo());
        return resp;
    }
}
