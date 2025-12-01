package br.com.mindcare.controller;

import br.com.mindcare.dto.AgendamentoRequest;
import br.com.mindcare.dto.AgendamentoResponse;
import br.com.mindcare.service.AgendamentoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "http://localhost:5173") // opcional se já tiver CORS global
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    // Criar um novo agendamento
    @PostMapping
    public ResponseEntity<AgendamentoResponse> criar(
            @Valid @RequestBody AgendamentoRequest request
    ) {
        AgendamentoResponse response = agendamentoService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Listar agendamentos por paciente
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<AgendamentoResponse>> listarPorPaciente(
            @PathVariable Long pacienteId
    ) {
        List<AgendamentoResponse> lista = agendamentoService.listarPorPaciente(pacienteId);
        return ResponseEntity.ok(lista);
    }

    // Listar agendamentos por psicólogo
    @GetMapping("/psicologo/{psicologoId}")
    public ResponseEntity<List<AgendamentoResponse>> listarPorPsicologo(
            @PathVariable Long psicologoId
    ) {
        List<AgendamentoResponse> lista = agendamentoService.listarPorPsicologo(psicologoId);
        return ResponseEntity.ok(lista);
    }

    // Cancelar agendamento pelo paciente
    @PostMapping("/{agendamentoId}/cancelar/paciente")
    public ResponseEntity<Void> cancelarPorPaciente(
            @PathVariable Long agendamentoId
    ) {
        agendamentoService.cancelarPorPaciente(agendamentoId);
        return ResponseEntity.noContent().build();
    }
}
