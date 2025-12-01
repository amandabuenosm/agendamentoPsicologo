package br.com.mindcare.service;

import br.com.mindcare.dto.AgendamentoRequest;
import br.com.mindcare.dto.AgendamentoResponse;
import br.com.mindcare.model.*;
import br.com.mindcare.repository.AgendamentoRepository;
import br.com.mindcare.repository.HorarioDisponivelRepository;
import br.com.mindcare.repository.PsicologoRepository;
import br.com.mindcare.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PsicologoRepository psicologoRepository;
    private final HorarioDisponivelRepository horarioDisponivelRepository;
    private final HorarioDisponivelService horarioDisponivelService;

    public AgendamentoService(AgendamentoRepository agendamentoRepository,
                              UsuarioRepository usuarioRepository,
                              PsicologoRepository psicologoRepository,
                              HorarioDisponivelRepository horarioDisponivelRepository,
                              HorarioDisponivelService horarioDisponivelService) {
        this.agendamentoRepository = agendamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.psicologoRepository = psicologoRepository;
        this.horarioDisponivelRepository = horarioDisponivelRepository;
        this.horarioDisponivelService = horarioDisponivelService;
    }

    @Transactional
    public AgendamentoResponse criar(AgendamentoRequest request) {

        Usuario paciente = usuarioRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));

        Psicologo psicologo = psicologoRepository.findById(request.getPsicologoId())
                .orElseThrow(() -> new EntityNotFoundException("Psicólogo não encontrado"));

        HorarioDisponivel horario = horarioDisponivelRepository.findById(request.getHorarioId())
                .orElseThrow(() -> new EntityNotFoundException("Horário não encontrado"));

        if (!horario.getPsicologo().getId().equals(psicologo.getId())) {
            throw new IllegalArgumentException("Horário não pertence ao psicólogo informado");
        }

        if (!Boolean.TRUE.equals(horario.getAtivo()) || horario.getStatus() != StatusHorario.LIVRE) {
            throw new IllegalArgumentException("Horário não está disponível para agendamento");
        }

        Agendamento agendamento = new Agendamento();
        agendamento.setPaciente(paciente);
        agendamento.setPsicologo(psicologo);
        agendamento.setHorario(horario);
        agendamento.setDataHoraAgendamento(LocalDateTime.now());
        agendamento.setStatus(StatusAgendamento.MARCADO);

        // marca o horário como reservado
        horarioDisponivelService.marcarReservado(horario);

        Agendamento salvo = agendamentoRepository.save(agendamento);
        return toResponse(salvo);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> listarPorPaciente(Long pacienteId) {
        return agendamentoRepository.findByPacienteId(pacienteId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> listarPorPsicologo(Long psicologoId) {
        return agendamentoRepository.findByPsicologoId(psicologoId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelarPorPaciente(Long agendamentoId) {
        Agendamento agendamento = agendamentoRepository.findById(agendamentoId)
                .orElseThrow(() -> new EntityNotFoundException("Agendamento não encontrado"));

        agendamento.setStatus(StatusAgendamento.CANCELADO_PELO_PACIENTE);

        // libera o horário novamente
        horarioDisponivelService.marcarLivre(agendamento.getHorario());

        agendamentoRepository.save(agendamento);
    }

    private AgendamentoResponse toResponse(Agendamento agendamento) {
        AgendamentoResponse resp = new AgendamentoResponse();
        resp.setId(agendamento.getId());
        resp.setPacienteId(agendamento.getPaciente().getId());
        resp.setPacienteNome(agendamento.getPaciente().getNome());
        resp.setPsicologoId(agendamento.getPsicologo().getId());
        resp.setPsicologoNome(agendamento.getPsicologo().getNome());
        resp.setHorarioId(agendamento.getHorario().getId());
        resp.setDataConsulta(agendamento.getHorario().getData());
        resp.setHoraInicio(agendamento.getHorario().getHoraInicio());
        resp.setHoraFim(agendamento.getHorario().getHoraFim());
        resp.setDataHoraAgendamento(agendamento.getDataHoraAgendamento());
        resp.setStatus(agendamento.getStatus());
        return resp;
    }
}
