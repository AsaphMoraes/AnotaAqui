<script lang="ts">
  import Modal from '../components/Modal.svelte';
  import Button from '../components/Button.svelte';
  import { filters } from '../stores/filters';
  import type { FilterOptions } from '../types';

  export let open = false;
  export let onApply: (filters: FilterOptions) => void = () => {};
  export let onClose: () => void = () => {};

  let localFilters: FilterOptions;

  $: {
    if (open) {
      localFilters = { ...$filters };
    }
  }

  function apply() {
    onApply(localFilters);
  }

  function reset() {
    localFilters = {
      sortBy: 'recent',
      categories: [],
    };
  }

  function toggleCategory(cat: string) {
    const index = localFilters.categories.indexOf(cat);
    if (index >= 0) {
      localFilters.categories.splice(index, 1);
    } else {
      localFilters.categories.push(cat);
    }
    localFilters = { ...localFilters };
  }
</script>

<Modal {open} title="Filtros" onClose={onClose}>
  <div class="filter-section">
    <h3 class="filter-label">Ordenar por</h3>
    <div class="radio-group">
      <label>
        <input type="radio" bind:group={localFilters.sortBy} value="recent" />
        Mais recentes
      </label>
      <label>
        <input type="radio" bind:group={localFilters.sortBy} value="oldest" />
        Mais antigas
      </label>
      <label>
        <input type="radio" bind:group={localFilters.sortBy} value="title" />
        Título (A-Z)
      </label>
    </div>
  </div>

  <div class="filter-section">
    <h3 class="filter-label">Categorias</h3>
    <div class="checkbox-group">
      {#each ['Trabalho', 'Pessoal', 'Estudos'] as cat}
        <label>
          <input
            type="checkbox"
            checked={localFilters.categories.includes(cat)}
            on:change={() => toggleCategory(cat)}
          />
          {cat}
        </label>
      {/each}
    </div>
  </div>

  <div class="filter-actions">
    <Button variant="secondary" on:click={reset}>Limpar</Button>
    <Button variant="primary" on:click={apply}>Aplicar</Button>
  </div>
</Modal>

<style>
  .filter-section {
    margin-bottom: var(--spacing-lg);
  }
  .filter-label {
    font-size: var(--font-size-body);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
  .radio-group, .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .radio-group label, .checkbox-group label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-body);
    min-height: 44px;
    cursor: pointer;
  }
  .filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    padding-top: var(--spacing-md);
  }

  @media (max-width: 360px) {
    .filter-actions {
      flex-direction: column;
    }
    /*.filter-actions Button {
      width: 100%;
    }*/
  }
</style>