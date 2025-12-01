package br.com.mindcare.controller;

import br.com.mindcare.dto.LoginRequest;
import br.com.mindcare.dto.LoginResponse;
import br.com.mindcare.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // 401 Unauthorized quando credenciais forem inválidas
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
