package br.com.mindcare.service;

import br.com.mindcare.dto.HorarioDisponivelRequest;
import br.com.mindcare.dto.HorarioDisponivelResponse;
import br.com.mindcare.model.HorarioDisponivel;
import br.com.mindcare.model.Psicologo;
import br.com.mindcare.model.StatusHorario;
import br.com.mindcare.repository.HorarioDisponivelRepository;
import br.com.mindcare.repository.PsicologoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HorarioDisponivelService {

    private final HorarioDisponivelRepository horarioDisponivelRepository;
    private final PsicologoRepository psicologoRepository;

    public HorarioDisponivelService(HorarioDisponivelRepository horarioDisponivelRepository,
                                    PsicologoRepository psicologoRepository) {
        this.horarioDisponivelRepository = horarioDisponivelRepository;
        this.psicologoRepository = psicologoRepository;
    }

    @Transactional
    public HorarioDisponivelResponse criar(HorarioDisponivelRequest request) {

        Psicologo psicologo = psicologoRepository.findById(request.getPsicologoId())
                .orElseThrow(() -> new EntityNotFoundException("Psicólogo não encontrado"));

        HorarioDisponivel horario = new HorarioDisponivel();
        horario.setPsicologo(psicologo);
        horario.setData(request.getData());
        horario.setHoraInicio(request.getHoraInicio());
        horario.setHoraFim(request.getHoraFim());
        horario.setStatus(StatusHorario.LIVRE);
        horario.setAtivo(true);

        HorarioDisponivel salvo = horarioDisponivelRepository.save(horario);
        return toResponse(salvo);
    }

    @Transactional(readOnly = true)
    public List<HorarioDisponivelResponse> listarPorPsicologo(Long psicologoId, boolean apenasLivres) {
        List<HorarioDisponivel> horarios;

        if (apenasLivres) {
            horarios = horarioDisponivelRepository
                    .findByPsicologoIdAndStatusAndAtivoTrue(psicologoId, StatusHorario.LIVRE);
        } else {
            horarios = horarioDisponivelRepository
                    .findByPsicologoIdAndStatus(psicologoId, StatusHorario.LIVRE);
        }

        return horarios.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HorarioDisponivelResponse buscarPorId(Long id) {
        HorarioDisponivel horario = horarioDisponivelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Horário não encontrado"));
        return toResponse(horario);
    }

    @Transactional
    public void cancelar(Long id) {
        HorarioDisponivel horario = horarioDisponivelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Horário não encontrado"));

        horario.setStatus(StatusHorario.CANCELADO);
        horario.setAtivo(false);
        horarioDisponivelRepository.save(horario);
    }

    @Transactional
    public void marcarReservado(HorarioDisponivel horario) {
        horario.setStatus(StatusHorario.RESERVADO);
        horarioDisponivelRepository.save(horario);
    }

    @Transactional
    public void marcarLivre(HorarioDisponivel horario) {
        horario.setStatus(StatusHorario.LIVRE);
        horarioDisponivelRepository.save(horario);
    }

    private HorarioDisponivelResponse toResponse(HorarioDisponivel horario) {
        HorarioDisponivelResponse resp = new HorarioDisponivelResponse();
        resp.setId(horario.getId());
        resp.setPsicologoId(horario.getPsicologo().getId());
        resp.setData(horario.getData());
        resp.setHoraInicio(horario.getHoraInicio());
        resp.setHoraFim(horario.getHoraFim());
        resp.setStatus(horario.getStatus());
        resp.setAtivo(horario.getAtivo());
        return resp;
    }
}
