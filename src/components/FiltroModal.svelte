<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let aberto: boolean = false;
  export let categoriasDisponiveis: string[] = [];
  export let filtroSelecionado = {
    ordenarPor: 'recente' as 'recente' | 'antigo' | 'titulo',
    categorias: [] as string[]
  };

  const dispatch = createEventDispatcher();

  function aplicar() {
    dispatch('aplicar', filtroSelecionado);
    aberto = false;
  }

  function limpar() {
    filtroSelecionado = { ordenarPor: 'recente', categorias: [] };
    dispatch('limpar');
  }

  function fechar() {
    aberto = false;
  }

  // Fecha ao clicar fora (backdrop)
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) fechar();
  }
</script>

{#if aberto}
  <div class="backdrop" on:click={handleBackdropClick} role="dialog" aria-modal="true">
    <div class="modal">
      <header class="modal-header">
        <h2 id="filtro-titulo">Filtros</h2>
        <button class="fechar" on:click={fechar} aria-label="Fechar filtros">&times;</button>
      </header>
      <div class="modal-body">
        <fieldset>
          <legend>Ordenar por</legend>
          <label>
            <input type="radio" name="ordenar" value="recente" bind:group={filtroSelecionado.ordenarPor} />
            Mais recentes
          </label>
          <label>
            <input type="radio" name="ordenar" value="antigo" bind:group={filtroSelecionado.ordenarPor} />
            Mais antigos
          </label>
          <label>
            <input type="radio" name="ordenar" value="titulo" bind:group={filtroSelecionado.ordenarPor} />
            Título (A-Z)
          </label>
        </fieldset>
        <fieldset>
          <legend>Categorias</legend>
          {#each categoriasDisponiveis as cat}
            <label>
              <input type="checkbox" value={cat} bind:group={filtroSelecionado.categorias} />
              {cat}
            </label>
          {/each}
        </fieldset>
      </div>
      <footer class="modal-footer">
        <button class="btn-secundario" on:click={limpar}>Limpar</button>
        <button class="btn-primario" on:click={aplicar}>Aplicar</button>
      </footer>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-unit);
  }
  .modal {
    background: var(--color-surface);
    border-radius: var(--border-radius);
    max-width: 400px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    padding: calc(var(--spacing-unit) * 2);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-unit);
  }
  .modal-header h2 {
    font-size: 1.25rem;
    margin: 0;
  }
  .fechar {
    background: none;
    border: none;
    font-size: 1.8rem;
    line-height: 1;
    cursor: pointer;
    min-width: var(--touch-target);
    min-height: var(--touch-target);
  }
  fieldset {
    border: none;
    margin-bottom: var(--spacing-unit);
    padding: 0;
  }
  legend {
    font-weight: bold;
    margin-bottom: calc(var(--spacing-unit) * 0.5);
  }
  label {
    display: block;
    margin-bottom: calc(var(--spacing-unit) * 0.5);
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-unit);
    margin-top: var(--spacing-unit);
  }
  .btn-primario, .btn-secundario {
    padding: calc(var(--spacing-unit) * 0.75) calc(var(--spacing-unit) * 2);
    border-radius: 20px;
    border: none;
    font-weight: 500;
    min-height: var(--touch-target);
    cursor: pointer;
  }
  .btn-primario {
    background: var(--color-primary);
    color: white;
  }
  .btn-secundario {
    background: #ccc;
    color: #222;
  }
  @media (max-width: 374px) {
    .modal {
      padding: var(--spacing-unit);
    }
  }
</style>