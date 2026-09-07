import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 12;

async function PasswordHash(password: string){
    const hashpass = await hash(password, SALT_ROUNDS)
    return hashpass
}

async function PasswordIsValidy(password: string, passwordHash: string){
    const isValidy = await compare(password, passwordHash)
    return isValidy
}

export {
    PasswordHash,
    PasswordIsValidy
}