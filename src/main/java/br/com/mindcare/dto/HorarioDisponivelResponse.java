package br.com.mindcare.dto;

import br.com.mindcare.model.StatusHorario;

import java.time.LocalDate;
import java.time.LocalTime;

public class HorarioDisponivelResponse {

    private Long id;
    private Long psicologoId;
    private LocalDate data;
    private LocalTime horaInicio;
    private LocalTime horaFim;
    private StatusHorario status;
    private Boolean ativo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPsicologoId() {
        return psicologoId;
    }

    public void setPsicologoId(Long psicologoId) {
        this.psicologoId = psicologoId;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFim() {
        return horaFim;
    }

    public void setHoraFim(LocalTime horaFim) {
        this.horaFim = horaFim;
    }

    public StatusHorario getStatus() {
        return status;
    }

    public void setStatus(StatusHorario status) {
        this.status = status;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
