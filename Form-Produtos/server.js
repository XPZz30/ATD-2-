const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/cadastro', (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const dados = {};
        body.split('&').forEach(par => {
            const [chave, valor] = par.split('=');
            dados[chave] = decodeURIComponent(valor.replace(/\+/g, ' '));
        });
        res.send(`
            <h2>Produto cadastrado com sucesso!</h2>
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Preço:</strong> R$ ${dados.preco}</p>
            <a href="/">Voltar</a>
        `);

        console.log('Dados recebidos:', dados);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
