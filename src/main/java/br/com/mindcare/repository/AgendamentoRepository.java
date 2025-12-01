package br.com.mindcare.repository;

import br.com.mindcare.model.Agendamento;
import br.com.mindcare.model.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    List<Agendamento> findByPacienteId(Long pacienteId);

    List<Agendamento> findByPsicologoId(Long psicologoId);

    List<Agendamento> findByPacienteIdAndStatus(Long pacienteId, StatusAgendamento status);

    List<Agendamento> findByPsicologoIdAndStatus(Long psicologoId, StatusAgendamento status);
}
