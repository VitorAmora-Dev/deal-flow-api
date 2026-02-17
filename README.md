Markdown# API de Clientes e CRM (Node + Sequelize)

Este projeto é uma API REST desenvolvida para o gerenciamento de leads e clientes. O sistema conta com um CRUD completo e uma rota de relatório que automatiza o cálculo de comissões e métricas do funil de vendas.

## Tecnologias utilizadas
- Node.js e Express
- Sequelize (ORM)
- SQLite (Banco de dados em arquivo)
- dotenv (Variáveis de ambiente)

---

## Estrutura do projeto
O código segue um padrão MVC simplificado para facilitar a manutenção:
* controllers/: Lógica de negócio e manipulação dos dados.
* models/: Definição dos schemas das tabelas.
* routes/: Definição dos endpoints.
* database/: Configuração e conexão com o banco.

---

## Como configurar e rodar

1. Instale as dependências:
```bash
npm install
Configure o arquivo .env:Crie um arquivo .env na raiz do projeto com as seguintes chaves:Snippet de códigoPORT=3000
NODE_ENV=development
DB_STORAGE=./database.sqlite
DB_LOGGING=false
Inicie o servidor:Para desenvolvimento (com recarregamento automático):Bashnpm run dev
Endpoints da APIURL base: http://localhost:3000MétodoRotaDescriçãoGET/clientesLista todos os clientes cadastradosGET/clientes/:idRetorna os dados de um cliente específicoPOST/clientesCadastra um novo lead ou clientePUT/clientes/:idAtualiza dados (recalcula comissão automaticamente)DELETE/clientes/:idRemove um registro do bancoGET/relatorioConsolida dados do funil e total de comissõesRegra de negócioO campo de comissão é calculado automaticamente pelo servidor como 5% do valorPotencial enviado no corpo da requisição.Exemplo de payload (POST/PUT):JSON{
  "nome": "João Silva",
  "email": "joao@email.com",
  "status": "fechado", 
  "valorPotencial": 10000
}
Deploy no RenderPara hospedar o projeto:Conecte o repositório do GitHub ao Render.Build Command: npm installStart Command: npm startVariáveis de ambiente: Configure as mesmas chaves do .env nas configurações de Environment do painel.Caso utilize o SQLite em produção no Render, lembre-se de configurar um Persistent Disk para que os dados não sejam apagados entre os deploys.
Deseja que eu te ajude a criar o arquivo de rotas ou o controller para validar se esses campos 
