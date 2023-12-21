# {{app}}

## Development

### 1. Create docker postgres instance

```sh
docker run \
   --name {{app}} \
   -p 5432:5432 \
   -e POSTGRES_PASSWORD=pw \
   -e POSTGRES_USER={{app}}-user \
   -e POSTGRES_DB={{app}} \
   -d postgres:15
```

### 2. Generate code from schema

```bash
npm run p:gen && npx prisma migrate dev
## or yarn
yarn p:gen && yarn prisma migrate dev
```

### 3. Running it locally

#### With watch mode

```bash
npm run dev
## or with yarn
yarn dev
```
