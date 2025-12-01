package br.com.mindcare.controller;

import br.com.mindcare.dto.PsicologoRequest;
import br.com.mindcare.dto.PsicologoResponse;
import br.com.mindcare.service.PsicologoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/psicologos")
public class PsicologoController {

    private final PsicologoService psicologoService;

    public PsicologoController(PsicologoService psicologoService) {
        this.psicologoService = psicologoService;
    }

    @PostMapping
    public ResponseEntity<PsicologoResponse> criar(@Valid @RequestBody PsicologoRequest request) {
        PsicologoResponse response = psicologoService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PsicologoResponse>> listarTodos() {
        return ResponseEntity.ok(psicologoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PsicologoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(psicologoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PsicologoResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody PsicologoRequest request
    ) {
        return ResponseEntity.ok(psicologoService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        psicologoService.inativar(id);
        return ResponseEntity.noContent().build();
    }
}
