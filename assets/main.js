'use strict';

const endereco = document.getElementById('endereco');
const bairro   = document.getElementById('bairro');
const cidade   = document.getElementById('cidade'); 
const estado   = document.getElementById('estado');

/* <<<<<<<<<< Limpa  Formulário >>>>>>>>>*/
const limparFormulario = () => {
    endereco.value = "";
    bairro.value   = "";
    cidade.value   = ""; 
    estado.value   = "";
}

/* <<<<<<<<<< Preenchendo o formulário >>>>>>>>>*/
const preencherFormulario = (endere) => {
    endereco.value = endere.logradouro;
    bairro.value = endere.bairro;
    cidade.value = endere.localidade;
    estado.value = endere.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);
/* <<<<<<<<<< Evento focusout >>>>>>>>>  async/await */ 

const pesquisarCep = async() => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        // usando a ferramenta fetch API
        const dados = await fetch(url); // recebendo o resultado do fetch
        const endereco = await dados.json();// pegando os dados e aplicando essa function json()

        // TRATANDO CEP NÃO ENCONTRADO
        if (endereco.hasOwnProperty('erro') || !endereco){
            document.getElementById('endereco').value = "CEP não encontrado";
            return
        }
        preencherFormulario(endereco);// Vou mandar pro método que vai preencher o form
        return
    }
    document.getElementById('endereco').value = "CEP incorreto!";
} 

document.getElementById('cep')
            .addEventListener('focusout' ,pesquisarCep);
