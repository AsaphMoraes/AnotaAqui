import type { Response, Request } from "express"
import { connection } from "@/db/connection"
import { PasswordIsValidy } from '@/utils/auth'
import type { Users } from "@/db/types/tbUsers"
import { GenerateJWT } from "@/utils/jwt"

export async function loginUser(req: Request, res: Response){
    const {email, password} = req.body

    const sql = `
    SELECT user_id, userPassword
    FROM tbUsers
    WHERE userEmail = ?;
    `

    try {
        const result = await Promise.resolve(connection(sql, [email]))
        if (!result) return res.json('Conexão mal estabelecida')

        const user = result.results?.[0] as Users
        if (!user) return res.json('Usuário não encontrado')

        const userPassword: string = user.userPassword
        const isValidy = await Promise.resolve(PasswordIsValidy(password, userPassword))
        if (!isValidy) return res.json('Senha inválida')

        const jwt = GenerateJWT(user.user_id.toString())

        res.cookie('anota_aqui_token', jwt, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //Dias * Horas * Minutos * Segundos * Milisegundos
        })
        return res.json('Login realizado com sucesso')

    } catch (error){
        return res.json('Erro, consultar desenvolvedor')
    }
}