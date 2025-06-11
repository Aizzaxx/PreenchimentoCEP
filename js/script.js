const inputCep = document.querySelector("#cep");
const inputLogradouro = document.querySelector("#logradouro");
const inputBairro = document.querySelector("#bairro");
const inputCidade = document.querySelector("#cidade");
const inputEstado = document.querySelector("#estado");
const inputNumero = document.querySelector("#numero");
const inputComplemento = document.querySelector("#complemento");
const btnBuscar = document.querySelector("#btn-buscar");

function limparFormulario() {
  inputLogradouro.value = "";
  inputBairro.value = "";
  inputCidade.value = "";
  inputEstado.value = "";
  inputNumero.value = "";
  inputComplemento.value = "";
  inputNumero.disabled = true;
  inputComplemento.disabled = true;
}

async function preencherForm() {
  let cep = inputCep.value.replace("-", "");

  if (cep.length !== 8) {
    alert("CEP inválido. Digite um CEP com 8 dígitos.");
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado!");
      limparFormulario();
      return;
    }

    inputLogradouro.value = data.logradouro;
    inputBairro.value = data.bairro;
    inputCidade.value = data.localidade;
    inputEstado.value = data.uf;
    inputComplemento.value = data.complemento || "";

    
    inputNumero.disabled = false;
    inputComplemento.disabled = false;

  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    limparFormulario();
  }
}

function mask() {
  let valueInputCep = inputCep.value;
  let lengthInputCep = valueInputCep.length;

  if (lengthInputCep === 5 && !valueInputCep.includes("-")) {
    inputCep.value += "-";
  }
}

inputCep.addEventListener("keypress", mask);
btnBuscar.addEventListener("click", preencherForm);

