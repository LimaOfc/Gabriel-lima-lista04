const estado = document.querySelector('#estado')
const cidade = document.querySelector('#cidade')
const resultado = document.querySelector('#resultado')

async function carregarEstados() {

    try {

        const resposta = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')

        const dados = await resposta.json()

        // Organiza os estados em ordem alfabética
        dados.sort((a, b) => a.nome.localeCompare(b.nome))

        // Percorre todos os estados recebidos
        dados.forEach(function(item) {

            const opcao = document.createElement('option')

            opcao.value = item.sigla;                                     
            opcao.textContent = item.nome;

            estado.appendChild(opcao)

        });

    } catch (erro) {

        resultado.textContent = 'Erro ao carregar os estados.'

    }

}

estado.addEventListener('change', async function() {

    const uf = estado.value;

    // Limpa as cidades anteriores
    cidade.innerHTML = '<option value="">Selecione uma cidade</option>'

    cidade.disabled = true;

    resultado.textContent = ''

    // Verifica se algum estado foi selecionado
    if (uf === '') {
        return;
    }

    try {

        // 4. Busca as cidades do estado selecionado
        const resposta = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
        );

        const dados = await resposta.json();

        // Organiza as cidades em ordem alfabética
        dados.sort((a, b) => a.nome.localeCompare(b.nome))

        // 5. Adiciona as cidades ao select
        dados.forEach(function(item) {

            const opcao = document.createElement('option')

            opcao.value = item.nome
            opcao.textContent = item.nome

            cidade.appendChild(opcao)

        });

        cidade.disabled = false

    } catch (erro) {

        resultado.textContent = 'Erro ao carregar as cidades.'

    }

});

cidade.addEventListener('change', function() {

    const nomeCidade = cidade.value

    const nomeEstado = estado.options[estado.selectedIndex].text

    if (nomeCidade === '') {
        resultado.textContent = ''
        return;
    }

    resultado.textContent =
        `Você selecionou: ${nomeCidade} - ${nomeEstado}`;

})
carregarEstados()
