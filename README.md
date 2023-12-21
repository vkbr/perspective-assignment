# Perspective assignment

## Development

### 1. Create docker postgres instance

```sh
docker run \
   --name perspective-assignment \
   -p 5432:5432 \
   -e POSTGRES_PASSWORD=pw \
   -e POSTGRES_USER=perspective-assignment-user \
   -e POSTGRES_DB=perspective-assignment \
   -d postgres:15
```

> :warning: Don't forget to add `.env` file for migration to work. Rename `.env.example` -> `.env`

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
