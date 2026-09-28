import type { Users } from "@/types/Users"
import { connection } from "@/utils/connection"
import { PasswordHash } from "@/utils/auth"

/**
 * Classe que representa um usuário do sistema.
 *
 * Responsável por gerenciar as operações de CRUD (Criar, Ler, Atualizar e Deletar)
 * relacionadas à tabela `tbUsers` no banco de dados.
 */
export class User {
  user_id: number
  userEmail: string
  userPassword: string
  created_at: string
  updated_at: string

  /**
   * Cria uma nova instância de {@link User}.
   *
   * @param data - Dados parciais do usuário para inicialização.
   */
  constructor(data: Partial<Users> = {}) {
    this.user_id = data.user_id ?? 0
    this.userEmail = data.userEmail ?? ""
    this.userPassword = data.userPassword ?? ""
    this.created_at = data.created_at ?? ""
    this.updated_at = data.updated_at ?? ""
  }

  /**
   * Cria um novo usuário no banco de dados com email e senha.
   *
   * A senha é criptografada utilizando bcrypt antes de ser armazenada.
   * Após a inserção, o usuário é recuperado pelo email.
   *
   * @param email - Email do usuário.
   * @param password - Senha do usuário (será criptografada).
   * @returns Uma instância de {@link User} ou `null` em caso de falha.
   */
  static async create(email: string, password: string): Promise<User | null> {
    const hash = await PasswordHash(password)
    const sql = `
      INSERT INTO tbUsers (userEmail, userPassword, created_at, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `
    await connection(sql, [email, hash])
    return this.findByEmail(email)
  }

  /**
   * Busca um usuário pelo email no banco de dados.
   *
   * @param email - Email do usuário a ser buscado.
   * @returns Uma instância de {@link User} ou `null` se não encontrado.
   */
  static async findByEmail(email: string): Promise<User | null> {
    const sql = `
      SELECT user_id, userEmail, userPassword, created_at, updated_at
      FROM tbUsers
      WHERE userEmail = ?;
    `
    const result = await Promise.resolve(connection(sql, [email]))
    if (!result) return null

    const row = result.results?.[0] as Users | undefined
    if (!row) return null

    return new this(row)
  }

  /**
   * Busca um usuário pelo ID no banco de dados.
   *
   * @param id - ID do usuário a ser buscado.
   * @returns Uma instância de {@link User} ou `null` se não encontrado.
   */
  static async findById(id: number): Promise<User | null> {
    const sql = `
      SELECT user_id, userEmail, userPassword, created_at, updated_at
      FROM tbUsers
      WHERE user_id = ?;
    `
    const result = await Promise.resolve(connection(sql, [id.toString()]))
    if (!result) return null

    const row = result.results?.[0] as Users | undefined
    if (!row) return null

    return new this(row)
  }

  /**
   * Atualiza os dados de um usuário existente.
   *
   * Apenas os campos fornecidos são atualizados. O campo `updated_at`
   * é sempre atualizado para o timestamp atual. A senha, se informada,
   * é criptografada antes de ser armazenada.
   *
   * @param id - ID do usuário a ser atualizado.
   * @param email - Novo email (opcional).
   * @param password - Nova senha (opcional, será criptografada).
   * @returns Uma instância de {@link User} atualizada ou `null`.
   */
  static async update(id: number, email?: string, password?: string): Promise<User | null> {
    const updates: string[] = []
    const params: string[] = []

    if (email) {
      updates.push("userEmail = ?")
      params.push(email)
    }
    if (password) {
      updates.push("userPassword = ?")
      params.push(await PasswordHash(password))
    }
    updates.push("updated_at = CURRENT_TIMESTAMP")

    if (updates.length === 0) return User.findById(id)

    params.push(id.toString())
    const sql = `
      UPDATE tbUsers
      SET ${updates.join(", ")}
      WHERE user_id = ?;
    `
    await connection(sql, params)
    return this.findById(id)
  }

  /**
   * Remove um usuário do banco de dados pelo ID.
   *
   * @param id - ID do usuário a ser removido.
   * @returns `true` se o usuário foi removido, `false` caso contrário.
   */
  static async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM tbUsers
      WHERE user_id = ?;
    `
    const result = await Promise.resolve(connection(sql, [id.toString()]))
    return result?.meta?.changes != undefined ?  result.meta.changes > 0 : false
  }
}
