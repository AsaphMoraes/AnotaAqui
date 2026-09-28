import "dotenv/config"
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env["JWT_SECRET"]!

/**
 * Gera um token JWT (JSON Web Token) para autenticação de usuário.
 *
 * O token contém o ID do usuário como payload e expira em 7 dias.
 *
 * @param id - ID do usuário a ser incluído no token.
 * @returns O token JWT assinado.
 */
function GenerateJWT(id: string){
    return sign(id, JWT_SECRET, {expiresIn: '7d'})
}

/**
 * Verifica a validade de um token JWT (JSON Web Token).
 *
 * @param token - Token JWT a ser verificado.
 * @returns O payload decodificado do token se válido, ou `null` se o token for inválido ou expirado.
 */
function VerifyJWT(token: string){
    try {
        return verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

export {
    GenerateJWT,
    VerifyJWT
}
