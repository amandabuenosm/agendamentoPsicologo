package br.com.mindcare.controller;

import br.com.mindcare.dto.HorarioDisponivelRequest;
import br.com.mindcare.dto.HorarioDisponivelResponse;
import br.com.mindcare.service.HorarioDisponivelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horarios")
public class HorarioDisponivelController {

    private final HorarioDisponivelService horarioDisponivelService;

    public HorarioDisponivelController(HorarioDisponivelService horarioDisponivelService) {
        this.horarioDisponivelService = horarioDisponivelService;
    }

    @PostMapping
    public ResponseEntity<HorarioDisponivelResponse> criar(@Valid @RequestBody HorarioDisponivelRequest request) {
        HorarioDisponivelResponse response = horarioDisponivelService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/psicologo/{psicologoId}")
    public ResponseEntity<List<HorarioDisponivelResponse>> listarPorPsicologo(
            @PathVariable Long psicologoId,
            @RequestParam(name = "apenasLivres", defaultValue = "true") boolean apenasLivres
    ) {
        return ResponseEntity.ok(
                horarioDisponivelService.listarPorPsicologo(psicologoId, apenasLivres)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorarioDisponivelResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(horarioDisponivelService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelar(@PathVariable Long id) {
        horarioDisponivelService.cancelar(id);
        return ResponseEntity.noContent().build();
    }
}
