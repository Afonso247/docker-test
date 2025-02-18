# Docker Hello World com SQLite

Uma aplicação simples que demonstra a integração entre Node.js, SQLite e Docker. Este projeto foi criado usando o WSL Ubuntu 22.04

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- npm (geralmente vem com Node.js)
- Docker
- Docker Compose
- WSL2 com Ubuntu 22.04 (se estiver usando Windows)

## Instalação

1. Clone o repositório (ou crie os arquivos manualmente):
```bash
git clone <seu-repositorio>
cd <nome-da-pasta>
```

2. Instale as dependências do Node.js:
```bash
npm install
```

## Executando a aplicação

### Usando Docker (Recomendado)

1. Construa e inicie os containers:
```bash
docker-compose up --build
```

2. A aplicação estará disponível em:
```
http://localhost:8080
```

3. Para parar a aplicação:
```bash
docker-compose down
```

### Executando localmente (sem Docker)

1. Certifique-se de que as dependências estão instaladas:
```bash
npm install
```

2. Inicie a aplicação:
```bash
node app.js
```

## Estrutura do projeto

```
.
├── app.js              # Arquivo principal da aplicação
├── database/           # Pasta onde o SQLite armazena os dados
├── Dockerfile         # Configuração do container da aplicação
├── docker-compose.yml # Configuração dos serviços Docker
└── package.json       # Dependências e scripts do Node.js
```

## Verificando os dados no SQLite

1. Com o container rodando, execute:
```bash
docker exec -it <container_id> bash
apt-get update
apt-get install sqlite3
cd /usr/src/app/database
sqlite3 messages.db
```

2. Dentro do SQLite, você pode executar:
```sql
.tables          -- Lista todas as tabelas
SELECT * FROM messages;  -- Mostra todos os registros
```

## Problemas comuns

1. **Erro de permissão na pasta database**
   - Certifique-se de que a pasta tem as permissões corretas:
   ```bash
   chmod 777 database
   ```

2. **Porta 8080 já em uso**
   - Altere a porta no docker-compose.yml para outra disponível:
   ```yaml
   ports:
     - "3000:8080"  # Exemplo usando porta 3000
   ```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request
