const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;

// 1. Configuração da conexão com o banco
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cadastro",
    port: 3306
});

// 2. Rota principal que exibe o formulário e os resultados
app.get("/pessoas", (req, res) => {
    // Pega o nome digitado na pesquisa (se houver) ex: /pessoas?nome=Carlos
    const nomePesquisa = req.query.nome || "";

    // Criamos a consulta SQL dinâmica básica
    let sql = "SELECT * FROM pessoas";
    let params = [];

    // Se o usuário digitou algo na busca, filtramos com o WHERE
    if (nomePesquisa) {
        sql += " WHERE nome LIKE ?";
        params.push(`%${nomePesquisa}%`); // O % permite buscar por partes do nome (ex: "Car" acha "Carlos")
    }

    // Executando a consulta de forma segura usando Prepared Statements (params)
    conexao.query(sql, params, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao consultar o banco:", erro);
            return res.status(500).send("Erro interno ao buscar dados.");
        }

        // Montando as linhas da tabela com os resultados encontrados
        let linhasTabela = "";
        if (resultados.length === 0) {
            linhasTabela = `<tr><td colspan="5" style="text-align:center;">Nenhuma pessoa encontrada.</td></tr>`;
        } else {
            resultados.forEach(pessoa => {
                linhasTabela += `
                    <tr>
                        <td>${pessoa.id}</td>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.idade} anos</td>
                        <td>${pessoa.telefone}</td>
                        <td>${pessoa.cidade}</td>
                    </tr>
                `;
            });
        }

        // HTML completo contendo o formulário de busca e a tabela de resultados
        const htmlHtml = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Busca de Pessoas</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f9; }
                h1 { color: #333; }
                
                /* Estilo do formulário de busca */
                .busca-container { margin-bottom: 20px; }
                input[type="text"] { padding: 10px; width: 300px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; }
                button { padding: 10px 15px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
                button:hover { background-color: #218838; }
                .btn-limpar { background-color: #6c757d; text-decoration: none; padding: 10px 15px; color: white; border-radius: 4px; font-size: 16px; margin-left: 5px; }
                .btn-limpar:hover { background-color: #5a6268; }

                /* Estilo da tabela */
                table { width: 100%; border-collapse: collapse; margin-top: 10px; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #007BFF; color: white; }
                tr:hover { background-color: #f1f1f1; }
            </style>
        </head>
        <body>
            <h1>Pesquisar Cadastro de Pessoas</h1>
            
            <div class="busca-container">
                <form action="/pessoas" method="GET">
                    <input type="text" name="nome" placeholder="Digite o nome para buscar..." value="${nomePesquisa}">
                    <button type="submit">Buscar</button>
                    ${nomePesquisa ? '<a href="/pessoas" class="btn-limpar">Limpar Filtro</a>' : ''}
                </form>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Telefone</th>
                        <th>Cidade</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhasTabela}
                </tbody>
            </table>
        </body>
        </html>
        `;

        res.send(htmlHtml);
    });
});

// 3. Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando com sucesso!`);
    console.log(`Acesse o sistema em: http://localhost:${port}/pessoas`);
});