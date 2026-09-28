import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 12;

/**
 * Criptografa uma senha utilizando o algoritmo bcrypt.
 *
 * @param password - Senha em texto plano a ser criptografada.
 * @returns O hash da senha criptografada.
 */
async function PasswordHash(password: string){
    const hashpass = await hash(password, SALT_ROUNDS)
    return hashpass
}

/**
 * Verifica se uma senha em texto plano corresponde a um hash criptografado.
 *
 * @param password - Senha em texto plano a ser verificada.
 * @param passwordHash - Hash da senha armazenado no banco de dados.
 * @returns `true` se a senha for válida, `false` caso contrário.
 */
async function PasswordIsValidy(password: string, passwordHash: string){
    const isValidy = await compare(password, passwordHash)
    return isValidy
}

export {
    PasswordHash,
    PasswordIsValidy
}
