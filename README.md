# Sistema de Gestão de Convênios Públicos — Backend

## Visão Geral

Plataforma web para gestão integrada de convênios públicos (federal, estadual e municipal), cobrindo:
- Cadastro e gestão de convênios, licitações, contratos, obras e prestação de contas
- Upload/gerenciamento de documentos em todas as etapas
- Autenticação JWT e controle de permissões multiusuário (administrador, gestor, técnico)
- Notificações automáticas por e-mail
- Geração de relatórios em PDF
- Conformidade com a Lei 14.133/2021 e Lei da Transparência

---

## Requisitos

- Node.js 20+
- PostgreSQL 13+
- Docker (opcional, recomendado)
- Yarn ou npm

---

## Configuração

1. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme seu ambiente.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o banco de dados PostgreSQL conforme especificado em `.env`.

4. Gere as tabelas executando o projeto (o Sequelize irá sincronizar automaticamente):

   ```bash
   npm run dev
   ```

---

## Executando com Docker

```bash
docker build -t convenios-backend .
docker run -p 3000:3000 --env-file .env convenios-backend
```

---

## Principais Endpoints

### Autenticação

- `POST /api/auth/register` — Cadastro de usuário
- `POST /api/auth/login` — Login (retorna JWT)

### Convênios

- `GET /api/convenios` — Listar convênios
- `POST /api/convenios` — Criar convênio
- `GET /api/convenios/:id` — Detalhar convênio
- `PUT /api/convenios/:id` — Atualizar convênio
- `DELETE /api/convenios/:id` — Remover convênio

### Licitações, Contratos, Obras

- Mesma estrutura REST acima, substituindo `/convenios` por `/licitacoes`, `/contratos`, `/obras`

### Documentos

- `POST /api/documentos/upload` — Upload de documento (multipart)
- `GET /api/documentos` — Listar documentos por entidade
- `GET /api/documentos/:id` — Detalhar documento
- `GET /api/documentos/download/:id` — Baixar documento
- `DELETE /api/documentos/:id` — Remover documento

### Prestação de Contas

- `POST /api/prestacao-contas/upload` — Upload de documento p/ prestação de contas
- `GET /api/prestacao-contas` — Listar docs por convênio
- `GET /api/prestacao-contas/download/:id` — Baixar doc
- `DELETE /api/prestacao-contas/:id` — Remover doc
- `GET /api/prestacao-contas/relatorio/:convenioId` — Gerar PDF de relatório

---

## Observações

- Todas as rotas (exceto login/register) exigem autenticação JWT.
- O sistema envia notificações automáticas por e-mail para prazos de vigência.
- O job de verificação de notificações é executado automaticamente a cada 24h.
- O upload de arquivos é realizado na pasta `/uploads` (garanta permissão de escrita).

---

## Licença

MIT