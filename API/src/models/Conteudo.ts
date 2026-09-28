import type { Conteudo } from "@/types/Conteudo"
import { connection } from "@/utils/connection"

/**
 * Classe que representa o conteúdo textual de uma anotação.
 *
 * Cada anotação pode possuir um texto (conteúdo) armazenado na tabela
 * `tbConteudo`. Esta classe gerencia as operações de CRUD para essa tabela.
 */
export class ConteudoModel {
  cont_id: number
  anota_id: number
  contTexto: string
  created_at: string
  updated_at: string

  /**
   * Cria uma nova instância de {@link ConteudoModel}.
   *
   * @param data - Dados parciais do conteúdo para inicialização.
   */
  constructor(data: Partial<Conteudo> = {}) {
    this.cont_id = data.cont_id ?? 0
    this.anota_id = data.anota_id ?? 0
    this.contTexto = data.contTexto ?? ""
    this.created_at = data.created_at ?? ""
    this.updated_at = data.updated_at ?? ""
  }

  /**
   * Cria um novo conteúdo para uma anotação no banco de dados.
   *
   * Os campos `created_at` e `updated_at` são definidos automaticamente.
   *
   * @param anota_id - ID da anotação à qual o conteúdo pertence.
   * @param contTexto - Texto do conteúdo.
   * @returns Uma instância de {@link ConteudoModel} ou `null` em caso de falha.
   */
  static async create(anota_id: number, contTexto: string): Promise<ConteudoModel | null> {
    const sql = `
      INSERT INTO tbConteudo (anota_id, contTexto, created_at, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `
    await connection(sql, [anota_id.toString(), contTexto])
    return this.findByAnotaId(anota_id)
  }

  /**
   * Busca um conteúdo pelo seu ID.
   *
   * @param id - ID do conteúdo a ser buscado.
   * @returns Uma instância de {@link ConteudoModel} ou `null` se não encontrado.
   */
  static async findById(id: number): Promise<ConteudoModel | null> {
    const sql = `
      SELECT cont_id, anota_id, contTexto, created_at, updated_at
      FROM tbConteudo
      WHERE cont_id = ?;
    `
    const result = await Promise.resolve(connection(sql, [id.toString()]))
    if (!result) return null

    const row = result.results?.[0] as Conteudo | undefined
    if (!row) return null

    return new this(row)
  }

  /**
   * Busca o conteúdo mais recente associado a uma anotação específica.
   *
   * @param anota_id - ID da anotação cujo conteúdo será buscado.
   * @returns Uma instância de {@link ConteudoModel} ou `null` se não encontrado.
   */
  static async findByAnotaId(anota_id: number): Promise<ConteudoModel | null> {
    const sql = `
      SELECT cont_id, anota_id, contTexto, created_at, updated_at
      FROM tbConteudo
      WHERE anota_id = ?
      ORDER BY created_at DESC
      LIMIT 1;
    `
    const result = await Promise.resolve(connection(sql, [anota_id.toString()]))
    if (!result) return null

    const row = result.results?.[0] as Conteudo | undefined
    if (!row) return null

    return new this(row)
  }

  /**
   * Atualiza o texto de um conteúdo existente.
   *
   * O campo `updated_at` é atualizado automaticamente para o timestamp atual.
   *
   * @param id - ID do conteúdo a ser atualizado.
   * @param contTexto - Novo texto do conteúdo.
   * @returns Uma instância de {@link ConteudoModel} atualizada ou `null`.
   */
  static async update(id: number, contTexto: string): Promise<ConteudoModel | null> {
    const sql = `
      UPDATE tbConteudo
      SET contTexto = ?, updated_at = CURRENT_TIMESTAMP
      WHERE cont_id = ?;
    `
    await connection(sql, [contTexto, id.toString()])
    return this.findById(id)
  }

  /**
   * Remove um conteúdo do banco de dados pelo ID.
   *
   * @param id - ID do conteúdo a ser removido.
   * @returns `true` se o conteúdo foi removido, `false` caso contrário.
   */
  static async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM tbConteudo
      WHERE cont_id = ?;
    `
    const result = await Promise.resolve(connection(sql, [id.toString()]))
    return result?.meta?.changes != undefined ? result.meta.changes > 0 : false
  }
}
