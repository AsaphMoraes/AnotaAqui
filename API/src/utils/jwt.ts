import "dotenv/config"
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env["JWT_SECRET"]!

function GenerateJWT(id: string){
    return sign(id, JWT_SECRET, {expiresIn: '7d'})
}

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