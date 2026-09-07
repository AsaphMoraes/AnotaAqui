import express, { type Express } from 'express';
import { routes } from '@routes/index'
import 'dotenv/config'

const app: Express = express();

routes(app)

app.listen(3000, () => console.log("Servidor rodando na porta http://localhost:3000"))