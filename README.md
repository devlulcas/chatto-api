> **Warning**: Arquitetura guiada pelas vozes da minha cabeça! Não tome este projeto como exemplo nem se estiver sob uma febre delirante de 40 graus!

- Clone o projeto

```bash
git clone https://github.com/devlulcas/tcc-api.git
```

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

## PARA FAZER:

- Implementar parte de acesso aos tópicos de trilha
- Listar tipos de conteúdos disponíveis em um tópico junto com as buscas por tópicos
- Listar os conteúdos de um tópico
- Adicionar possibilidade de criar conteúdos e ligá-los a um tópico que por sua vez está ligado a uma trilha
- Na parte de adição de conteúdos, adicionar possibilidade de enviar markdown (este deve ser gravado no banco como HTML já processado)
- Na parte de adição de conteúdos, adicionar lista de sites bloqueados para evitar spam
- Na parte de adição de vídeos, garantir que seja publicado apenas vídeos de sites com embeds confiáveis
- Adicionar possibilidade de denuncia dos conteúdos (para todos) e de banimento (para admins)
- Adicionar listagem de conteúdos denunciados e banidos
- Refatorar código para obter uma arquitetura limpa
- Criar testes unitários para a aplicação
- Adicionar upload de imagens (diretamente ou via um serviço externo)
- [Ports and adapters](https://medium.com/bemobi-tech/ports-adapters-architecture-ou-arquitetura-hexagonal-b4b9904dad1a)
