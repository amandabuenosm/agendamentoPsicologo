package br.com.mindcare.service;

import br.com.mindcare.dto.LoginRequest;
import br.com.mindcare.dto.LoginResponse;
import br.com.mindcare.model.Psicologo;
import br.com.mindcare.model.TipoUsuario;
import br.com.mindcare.model.Usuario;
import br.com.mindcare.repository.PsicologoRepository;
import br.com.mindcare.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final PsicologoRepository psicologoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(PsicologoRepository psicologoRepository,
                       UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder) {
        this.psicologoRepository = psicologoRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        // 1) tenta como psicólogo
        Psicologo psicologo = psicologoRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (psicologo != null) {
            if (passwordEncoder.matches(request.getSenha(), psicologo.getSenha())) {
                return new LoginResponse(
                        psicologo.getId(),
                        psicologo.getNome(),
                        psicologo.getEmail(),
                        TipoUsuario.PSICOLOGO
                );
            } else {
                throw new RuntimeException("Credenciais inválidas");
            }
        }

        // 2) tenta como paciente/usuário
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (usuario != null) {
            if (passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
                return new LoginResponse(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        TipoUsuario.PACIENTE
                );
            } else {
                throw new RuntimeException("Credenciais inválidas");
            }
        }

        // 3) nenhum encontrado
        throw new RuntimeException("Credenciais inválidas");
    }
}
