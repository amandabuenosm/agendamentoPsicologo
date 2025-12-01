package br.com.mindcare.dto;

import br.com.mindcare.model.ModalidadeAtendimento;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PsicologoResponse {

    private Long id;
    private String nome;
    private String cpf;
    private String crp;
    private String telefone;
    private String email;
    private LocalDate dataNascimento;
    private String especialidade;
    private String enderecoConsultorio;
    private String cidade;
    private String estado;
    private BigDecimal valorConsulta;
    private ModalidadeAtendimento modalidadeAtendimento;
    private LocalDate dataCadastro;
    private Boolean ativo;

    // Getters e setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCrp() {
        return crp;
    }

    public void setCrp(String crp) {
        this.crp = crp;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getEnderecoConsultorio() {
        return enderecoConsultorio;
    }

    public void setEnderecoConsultorio(String enderecoConsultorio) {
        this.enderecoConsultorio = enderecoConsultorio;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getValorConsulta() {
        return valorConsulta;
    }

    public void setValorConsulta(BigDecimal valorConsulta) {
        this.valorConsulta = valorConsulta;
    }

    public ModalidadeAtendimento getModalidadeAtendimento() {
        return modalidadeAtendimento;
    }

    public void setModalidadeAtendimento(ModalidadeAtendimento modalidadeAtendimento) {
        this.modalidadeAtendimento = modalidadeAtendimento;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
