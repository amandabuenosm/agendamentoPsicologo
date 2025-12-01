package br.com.mindcare.service;

import br.com.mindcare.dto.UsuarioRequest;
import br.com.mindcare.dto.UsuarioResponse;
import br.com.mindcare.model.Usuario;
import br.com.mindcare.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioResponse criar(UsuarioRequest request) {

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Já existe um usuário com esse e-mail");
        }

        if (usuarioRepository.existsByCpf(request.getCpf())) {
            throw new IllegalArgumentException("Já existe um usuário com esse CPF");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setCpf(request.getCpf());
        usuario.setTelefone(request.getTelefone());
        usuario.setEmail(request.getEmail());

        // Criptografa a senha
        String senhaCriptografada = passwordEncoder.encode(request.getSenha());
        usuario.setSenha(senhaCriptografada);

        usuario.setDataNascimento(request.getDataNascimento());
        usuario.setEndereco(request.getEndereco());
        usuario.setDataCadastro(LocalDate.now());
        usuario.setAtivo(true);

        Usuario salvo = usuarioRepository.save(usuario);

        return toResponse(salvo);
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioResponse buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        return toResponse(usuario);
    }

    @Transactional
    public UsuarioResponse atualizar(Long id, UsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        usuario.setNome(request.getNome());
        usuario.setTelefone(request.getTelefone());
        usuario.setDataNascimento(request.getDataNascimento());
        usuario.setEndereco(request.getEndereco());

        Usuario atualizado = usuarioRepository.save(usuario);
        return toResponse(atualizado);
    }

    @Transactional
    public void inativar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        usuario.setAtivo(false);
        usuarioRepository.save(usuario);
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        UsuarioResponse resp = new UsuarioResponse();
        resp.setId(usuario.getId());
        resp.setNome(usuario.getNome());
        resp.setCpf(usuario.getCpf());
        resp.setTelefone(usuario.getTelefone());
        resp.setEmail(usuario.getEmail());
        resp.setDataNascimento(usuario.getDataNascimento());
        resp.setEndereco(usuario.getEndereco());
        resp.setDataCadastro(usuario.getDataCadastro());
        resp.setAtivo(usuario.getAtivo());
        return resp;
    }
}
