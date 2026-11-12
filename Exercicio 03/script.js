const usuario = document.querySelector('#usuario');
const postagens = document.querySelector('#postagens');
const detalhes = document.querySelector('#detalhes');

async function carregarUsuarios() {

    try {

        const resposta = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );

        const dados = await resposta.json();

        dados.forEach(function(item) {

            const opcao = document.createElement('option');

            opcao.value = item.id;
            opcao.textContent = item.name;

            usuario.appendChild(opcao);

        });

    } catch (erro) {

        postagens.textContent = 'Erro ao carregar usuários.';

    }

}

usuario.addEventListener('change', async function() {

    const idUsuario = usuario.value;

    postagens.innerHTML = '';
    detalhes.innerHTML = '';

    if (idUsuario === '') {
        return;
    }

    try {

        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${idUsuario}`
        );

        const dados = await resposta.json();

        dados.forEach(function(item) {

            const titulo = document.createElement('p');

            titulo.textContent = item.title;

            titulo.style.cursor = 'pointer';

            titulo.addEventListener('click', function() {

                carregarDetalhes(item.id);

            });

            postagens.appendChild(titulo);

        });

    } catch (erro) {

        postagens.textContent = 'Erro ao carregar postagens.';

    }

});

async function carregarDetalhes(idPostagem) {

    try {
        
        const respostaPost = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${idPostagem}`
        );

        const dadosPost = await respostaPost.json();

        const respostaComentarios = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${idPostagem}/comments`
        );

        const dadosComentarios = await respostaComentarios.json()

        detalhes.innerHTML = `
            <h3>${dadosPost.title}</h3>
            <p>${dadosPost.body}</p>
            <h4>Comentários:</h4>`

        dadosComentarios.forEach(function(item) {

            detalhes.innerHTML += `
                <p>
                    <strong>${item.name}</strong><br>
                    ${item.body}
                </p>
            `

        });

    } catch (erro) {

        detalhes.textContent = 'Erro ao carregar os detalhes da postagem.'

    }
}

carregarUsuarios();
