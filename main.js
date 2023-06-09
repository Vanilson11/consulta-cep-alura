async function buscaEndereco(cep){
  let mensagemErro = document.querySelector('.erro');
  mensagemErro.innerHTML = ''
  try{
    let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCepConvertida = await consultaCep.json();
    if(consultaCepConvertida.erro){
      throw Error('CEP inexistente!')
    }
    atribuiValoresAosCampos(consultaCepConvertida);
    console.log(consultaCepConvertida);
  } catch (erro){
    mensagemErro.innerHTML = `<p style="color: red"> CEP inválido! Por favor, tente novamente.</p>`
    console.log(erro);
  }
}

async function atribuiValoresAosCampos(consultaCepConvertida){
  let logradouro = document.getElementById('endereco');
  let complemento = document.getElementById('complemento');
  let bairro = document.getElementById('bairro');
  let cidade = document.getElementById('cidade');
  let estado = document.getElementById('estado');

  logradouro.value = consultaCepConvertida.logradouro;
  complemento.value = consultaCepConvertida.complemento;
  bairro.value = consultaCepConvertida.bairro;
  cidade.value = consultaCepConvertida.localidade;
  estado.value = consultaCepConvertida.uf;
}

const cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));