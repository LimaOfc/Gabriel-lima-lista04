const cep = document.querySelector('#cep')
const buscar = document.querySelector('#buscar')
const resultado = document.querySelector('#resultado')

buscar.addEventListener('click', async function() {

    let numeroCep = cep.value.replace(/\D/g, '')

    if (numeroCep.length !== 8) {
        resultado.innerHTML = 'Erro ao buscar endereço.'
        return;
    }

    try {

        const resposta = await fetch(`https://viacep.com.br/ws/${numeroCep}/json/`)

        const dados = await resposta.json()

        if (dados.erro) {
            resultado.innerHTML = 'Erro ao buscar endereço.'
            return;
        }

        resultado.innerHTML = `
            <p><strong>Logradouro:</strong> ${dados.logradouro}</p>
            <p><strong>Bairro:</strong> ${dados.bairro}</p>
            <p><strong>Cidade:</strong> ${dados.localidade}</p>
            <p><strong>Estado:</strong> ${dados.uf}</p>
        `;

    } catch (erro) {

        resultado.innerHTML = 'Erro ao buscar endereço.'

    }

});