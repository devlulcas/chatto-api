> **Warning**: Esse projeto não tem um objetivo claro, é apenas um playground para testar algumas coisas. Não é recomendado para uso em produção.

- Clone o projeto

- Instale as dependências

```bash
pnpm i
```

- Crie um `.env` semelhante ao `.env.example`, mas substitua por dados reais

- Crie as chaves JWT da aplicação

```bash
pnpm setup:key
```

- Inicie o banco de dados usando Docker Compose

```bash
docker-compose up -d
```

- Crie o Prisma Client e execute as migrations

```bash
pnpm setup:database
```

- Inicie a aplicação

```bash
pnpm dev
```

> Uma URL de desenvolvimento será mostrada em seu console
