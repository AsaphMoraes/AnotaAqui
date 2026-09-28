import type { Categoria } from "@/types/Categoria"
import { connection } from "@/utils/connection"
import { User } from "@/models/User"

/**
 * Classe que representa uma categoria de anotação.
 *
 * Gerencia as operações de CRUD relacionadas à tabela `tbCategoria`,
 * incluindo criação, busca por usuário, busca por nome, busca de categorias
 * populares, pesquisa por termo, atualização e remoção.
 */
export class CategoriaModel {
  categ_id: number
  user_id: number
  categNome: string
  created_at: string
  updated_at: string

  /**
   * Cria uma nova instância de {@link CategoriaModel}.
   *
   * @param data - Dados parciais da categoria para inicialização.
   */
  constructor(data: Partial<Categoria> = {}) {
    this.categ_id = data.categ_id ?? 0
    this.user_id = data.user_id ?? 0
    this.categNome = data.categNome ?? ""
    this.created_at = data.created_at ?? ""
    this.updated_at = data.updated_at ?? ""
  }

  /**
   * Cria uma nova categoria no banco de dados.
   *
   * Antes de criar, verifica se o usuário existente através do ID informado.
   * Os campos `created_at` e `updated_at` são definidos automaticamente.
   *
   * @param user_id - ID do usuário que está criando a categoria.
   * @param categNome - Nome da categoria.
   * @returns Uma instância de {@link CategoriaModel} ou `null` se o usuário não existir.
   */
  static async create(user_id: number, categNome: string): Promise<CategoriaModel | null> {
    const user = await User.findById(user_id)
    if (!user) return null

    const sql = `
      INSERT INTO tbCategoria (user_id, categNome, created_at, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `
    await connection(sql, [user_id.toString(), categNome])
    return this.findByNome(categNome)
  }

  /**
   * Busca uma categoria pelo seu ID.
   *
   * @param id - ID da categoria a ser buscada.
   * @returns Uma instância de {@link CategoriaModel} ou `null` se não encontrada.
   */
  static async findById(id: number): Promise<CategoriaModel | null> {
    const sql = `
      SELECT categ_id, user_id, categNome, created_at, updated_at
      FROM tbCategoria
      WHERE categ_id = ?;
    `
    const result = await Promise.resolve(connection(sql, [id.toString()]))
    if (!result) return null

    const row = result.results?.[0] as Categoria | undefined
    if (!row) return null

    return new this(row)
  }

  /**
   * Busca todas as categorias de um usuário específico.
   *
   * As categorias são retornadas ordenadas alfabeticamente pelo nome.
   *
   * @param user_id - ID do usuário cujas categorias serão buscadas.
   * @returns Um array de instâncias de {@link CategoriaModel} (vazio se nenhuma for encontrada).
   */
  static async findByUserId(user_id: number): Promise<CategoriaModel[]> {
    const sql = `
      SELECT categ_id, user_id, categNome, created_at, updated_at
      FROM tbCategoria
      WHERE user_id = ?
      ORDER BY categNome ASC;
    `
    const result = await Promise.resolve(connection(sql, [user_id.toString()]))
    if (!result) return []

    const rows = result.results as Categoria[] | undefined
    if (!rows) return []

    return rows.map(row => new this(row))
  }

  /**
   * Busca uma categoria pelo nome exato.
   *
   * @param nome - Nome da categoria a ser buscada.
   * @returns Uma instância de {@link CategoriaModel} ou `null` se não encontrada.
   */
  static async findByNome(nome: string): Promise<CategoriaModel | null> {
    const sql = `
      SELECT categ_id, user_id, categNome, created_at, updated_at
      FROM tbCategoria
      WHERE categNome = ?
      LIMIT 1;
    `
    const result = await Promise.resolve(connection(sql, [nome]))
    if (!result) return null

    const row = result.results?.[0] as Categoria | undefined
    if (!row) return null

    return new this(row)
  }

  /**
   * Pesquisa categorias de um usuário que contêm o termo informado no nome.
   *
   * @param user_id - ID do usuário cujas categorias serão pesquisadas.
   * @param term - Termo de busca.
   * @returns Um array de instâncias de {@link CategoriaModel} que correspondem à pesquisa.
   */
  static async search(user_id: number, term: string): Promise<CategoriaModel[]> {
    const sql = `
      SELECT categ_id, user_id, categNome, created_at, updated_at
      FROM tbCategoria
      WHERE user_id = ? AND categNome LIKE ?
      ORDER BY categNome ASC;
    `
    const result = await Promise.resolve(connection(sql, [user_id.toString(), `%${term}%`]))
    if (!result) return []

    const rows = result.results as Categoria[] | undefined
    if (!rows) return []

    return rows.map(row => new this(row))
  }

  /**
   * Busca as categorias mais populares de um usuário, baseado na quantidade
   * de anotações associadas a cada categoria.
   *
   * @param user_id - ID do usuário cujas categorias serão buscadas.
   * @param limit - Número máximo de categorias a retornar (padrão: 5).
   * @returns Um array de instâncias de {@link CategoriaModel} ordenadas por popularidade.
   */
  static async findPopular(user_id: number, limit: number = 5): Promise<CategoriaModel[]> {
    const sql = `
      SELECT c.categ_id, c.user_id, c.categNome, c.created_at, c.updated_at
      FROM tbCategoria c
      LEFT JOIN tbAnotacoes a ON a.categ_id = c.categ_id
      WHERE c.user_id = ?
      GROUP BY c.categ_id
      ORDER BY COUNT(a.anota_id) DESC
      LIMIT ?;
    `
    const result = await Promise.resolve(connection(sql, [user_id.toString(), limit.toString()]))
    if (!result) return []

    const rows = result.results as Categoria[] | undefined
    if (!rows) return []

    return rows.map(row => new this(row))
  }

  /**
   * Atualiza o nome de uma categoria existente.
   *
   * O campo `updated_at` é atualizado automaticamente para o timestamp atual.
   *
   * @param id - ID da categoria a ser atualizada.
   * @param categNome - Novo nome da categoria.
   * @returns Uma instância de {@link CategoriaModel} atualizada ou `null`.
   */
  static async update(id: number, categNome: string): Promise<CategoriaModel | null> {
    const sql = `
      UPDATE tbCategoria
      SET categNome = ?, updated_at = CURRENT_TIMESTAMP
      WHERE categ_id = ?;
    `
    await connection(sql, [categNome, id.toString()])
    return this.findById(id)
  }

  /**
   * Remove uma categoria do banco de dados pelo ID.
   *
   * @param id - ID da categoria a ser removida.
   * @returns `true` se a categoria foi removida, `false` caso contrário.
   */
  static async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM tbCategoria
      WHERE categ_id = ?;
    `
    const result = await Promise.resolve(connection(sql, [id.toString()]))
    return result?.meta?.changes != undefined ? result.meta.changes > 0 : false
  }
}
