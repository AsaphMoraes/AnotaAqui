import 'dotenv/config'
import Cloudflare from 'cloudflare';

const API_TOKEN: string = process.env['API_TOKEN']!
const ACCOUNT_ID: string = process.env['ACCOUNT_ID']!
const DATABASE_ID: string = process.env['DATABASE_ID']!

const client = new Cloudflare({
  apiToken: API_TOKEN,
});

/**
 * Executa uma query SQL na base de dados Cloudflare D1.
 *
 * Carrega as variáveis de ambiente necessárias (API_TOKEN, ACCOUNT_ID e
 * DATABASE_ID) e utiliza o cliente da API Cloudflare para enviar a query.
 *
 * @param sql - String contendo a query SQL a ser executada.
 * @param params - Array de parâmetros para substituição na query (bindings).
 * @returns O resultado da query retornado pelo Cloudflare D1.
 */
export const connection = async(sql: string, params: string[]) => {
  for await (const queryResult of client.d1.database.query(DATABASE_ID, {
    account_id: ACCOUNT_ID,
    sql: sql,
    params: params
  })) {
    return queryResult
  }
}
