## Installation

```bash
# install dependencies
$ npm install or npm i
```

```bash
# generate .env
$ cp .env.example .env
```

```bash
# generate tables in database
$ npm run knex:migrate
```

```bash
# rollback all migrations
$ npm run knex:rollback
```

## Up Postgres

```bash
docker-compose up -d
```

## Running

```bash
npm start
```
