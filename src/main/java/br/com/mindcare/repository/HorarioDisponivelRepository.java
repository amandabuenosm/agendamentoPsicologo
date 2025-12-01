package br.com.mindcare.repository;

import br.com.mindcare.model.HorarioDisponivel;
import br.com.mindcare.model.StatusHorario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HorarioDisponivelRepository extends JpaRepository<HorarioDisponivel, Long> {

    List<HorarioDisponivel> findByPsicologoIdAndDataAndStatus(
            Long psicologoId,
            LocalDate data,
            StatusHorario status
    );

    List<HorarioDisponivel> findByPsicologoIdAndStatus(Long psicologoId, StatusHorario status);

    List<HorarioDisponivel> findByPsicologoIdAndStatusAndAtivoTrue(Long psicologoId, StatusHorario status);
}
