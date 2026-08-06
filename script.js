function buscarCep() {
    //ENTRADA
    let cep = document.getElementById("cep").value;

    //retirar o hífen
    cep = cep.replace("-", "");

    //VALIDAÇÃO
    if (cep.length !== 8) {
        alert("CEP inválido");
        return;
    }

    //viacep
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro) {
                alert("CEP não encontrado.");
                return;
            }
            document.getElementById("rua").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("estado").value = dados.uf;
        })
        .catch(erro => {
            alert("Não foi possível buscar o CEP informado.")
        })
}

function registrar() {
    //ENTRADA
    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let rua = document.getElementById("rua").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;

    //VALIDAÇÃO
    if (nome === "") {
        alert("Digite o seu nome, aventureiro!");
        return;
    }

    if (cep === "" || cidade === "") {
        alert("Informe um CEP válido antes de registrar!");
        return;
    }

    //PROCESSAMENTO
    let aventureiro = {
        nome: nome,
        cep: cep,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado
    }

    //SAÍDA
    document.getElementById("mensagem").innerHTML = `🧭 Aventureiro registrado com sucesso! <br><br>

📜 Nome: ${aventureiro.nome} <br>

🗺️ Base localizada em: ${aventureiro.cidade} - ${aventureiro.estado} `;

    //LIMPAR FORMULÁRIO
    document.querySelector("form").reset();
}

//CHAMANDO O EVENTO BUSCARCEP
document.getElementById("cep").addEventListener("change", buscarCep);

//CHAMANDO O EVENTO REGISTRAR
document.getElementById("registrar").addEventListener("click", registrar);

//MUDAR TEMA
function trocarTema() {
    let botaoTema = document.getElementById("tema");

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }
}

//CHAMANDO O EVENTO TEMA
document.getElementById("tema").addEventListener("click", trocarTema);