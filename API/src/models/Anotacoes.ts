import type { Anotacoes } from "@/types/Anotacoes"
import { connection } from "@/utils/connection"
import { User } from "@/models/User"

/**
 * Classe que representa uma anotação (nota) do sistema.
 *
 * Gerencia as operações de CRUD relacionadas à tabela `tbAnotacoes`,
 * incluindo criação, busca por usuário, busca por título, atualização e remoção.
 */
export class Anotacao {
  anota_id: number
  user_id: number
  anotaTitle: string
  categ_id: number
  created_at: string
  updated_at: string

  /**
   * Cria uma nova instância de {@link Anotacao}.
   *
   * @param data - Dados parciais da anotação para inicialização.
   */
  constructor(data: Partial<Anotacoes> = {}) {
    this.anota_id = data.anota_id ?? 0
    this.user_id = data.user_id ?? 0
    this.anotaTitle = data.anotaTitle ?? ""
    this.categ_id = data.categ_id ?? 0
    this.created_at = data.created_at ?? ""
    this.updated_at = data.updated_at ?? ""
  }

  /**
   * Cria uma nova anotação no banco de dados.
   *
   * Antes de criar, verifica se o usuário existente através do ID informado.
   * Os campos `created_at` e `updated_at` são definidos automaticamente.
   *
   * @param user_id - ID do usuário que está criando a anotação.
   * @param anotaTitle - Título da anotação.
   * @param categ_id - ID da categoria associada à anotação.
   * @returns Uma instância de {@link Anotacao} ou `null` se o usuário não existir.
   */
  static async create(user_id: number, anotaTitle: string, categ_id: number): Promise<Anotacao | null> {
    const user = await User.findById(user_id)
    if (!user) return null

    const sql = `
      INSERT INTO tbAnotacoes (user_id, anotaTitle, categ_id, created_at, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `
    await connection(sql, [user_id.toString(), anotaTitle, categ_id.toString()])
    return this.findByTitle(anotaTitle)
  }

  /**
   * Busca todas as anotações de um usuário específico.
   *
   * As anotações são retornadas ordenadas por data de atualização (mais recentes primeiro).
   *
   * @param user_id - ID do usuário cujas anotações serão buscadas.
   * @returns Um array de instâncias de {@link Anotacao} (vazio se nenhuma for encontrada).
   */
  static async findByUserId(user_id: number): Promise<Anotacao[]> {
    const sql = `
      SELECT anota_id, user_id, anotaTitle, categ_id, created_at, updated_at
      FROM tbAnotacoes
      WHERE user_id = ?
      ORDER BY updated_at DESC;
    `
    const result = await Promise.resolve(connection(sql, [user_id.toString()]))
    if (!result) return []

    const rows = result.results as Anotacoes[] | undefined
    if (!rows) return []

    return rows.map(row => new this(row))
  }

  /**
   * Busca a anotação mais recente com o título especificado.
   *
   * @param title - Título da anotação a ser buscada.
   * @returns Uma instância de {@link Anotacao} ou `null` se não encontrada.
   */
  static async findByTitle(title: string): Promise<Anotacao | null> {
    const sql = `
      SELECT anota_id, user_id, anotaTitle, categ_id, created_at, updated_at
      FROM tbAnotacoes
      WHERE anotaTitle = ?
      ORDER BY created_at DESC
      LIMIT 1;
    `
    const result = await Promise.resolve(connection(sql, [title]))
    if (!result) return null

    const row = result.results?.[0] as Anotacoes | undefined
    if (!row) return null

    return new this(row)
  }

  /**
   * Atualiza os dados de uma anotação existente.
   *
   * Apenas os campos fornecidos são atualizados e o campo `updated_at`
   * é sempre definido para o timestamp atual.
   *
   * @param id - ID da anotação a ser atualizada.
   * @param anotaTitle - Novo título (opcional).
   * @param categ_id - Nova categoria (opcional).
   * @returns `null` após a atualização bem-sucedida (os dados são atualizados no cache local pelo frontend).
   */
  static async update(id: number, anotaTitle?: string, categ_id?: number): Promise<Anotacao | null> {
    const updates: string[] = []
    const params: string[] = []

    if (anotaTitle) {
      updates.push("anotaTitle = ?")
      params.push(anotaTitle)
    }
    if (categ_id !== undefined) {
      updates.push("categ_id = ?")
      params.push(categ_id.toString())
    }
    updates.push("updated_at = CURRENT_TIMESTAMP")

    if (updates.length === 0) return null

    params.push(id.toString())
    const sql = `
      UPDATE tbAnotacoes
      SET ${updates.join(", ")}
      WHERE anota_id = ?;
    `
    await connection(sql, params)
    return null
  }

  /**
   * Remove uma anotação do banco de dados pelo ID.
   *
   * @param id - ID da anotação a ser removida.
   * @returns `true` se a anotação foi removida, `false` caso contrário.
   */
  static async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM tbAnotacoes
      WHERE anota_id = ?;
    `
    const result = await Promise.resolve(connection(sql, [id.toString()]))
    return result?.meta?.changes != undefined ? result.meta.changes > 0 : false
  }
}
