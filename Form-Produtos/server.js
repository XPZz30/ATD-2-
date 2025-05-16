export default async function handler(req, res) {
  if (req.method === 'POST') {
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

      console.log('Dados recebidos:', dados);

      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <h2>Produto cadastrado com sucesso!</h2>
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>Preço:</strong> R$ ${dados.preco}</p>
        <a href="/form.html">Voltar</a>
      `);
    });
  } else {
    res.status(405).send('Método não permitido');
  }
}
