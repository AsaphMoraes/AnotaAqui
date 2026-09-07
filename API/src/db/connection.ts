import 'dotenv/config'
import Cloudflare from 'cloudflare';

const API_TOKEN: string = process.env['API_TOKEN']!
const ACCOUNT_ID: string = process.env['ACCOUNT_ID']!
const DATABASE_ID: string = process.env['DATABASE_ID']!

const client = new Cloudflare({
  apiToken: API_TOKEN, 
});

export const connection = async(sql: string, params: string[]) => {
  for await (const queryResult of client.d1.database.query(DATABASE_ID, {
    account_id: ACCOUNT_ID,
    sql: sql,
    params: params
  })) {
    return queryResult
  }
}
