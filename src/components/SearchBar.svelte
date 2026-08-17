<script lang="ts">
  export let value: string = '';
  export let placeholder: string = 'Buscar anotação...';
  export let onSearch: (query: string) => void = () => {};
  export let onFilterClick: () => void = () => {};
</script>

<div class="search-bar">
  <div class="search-input-wrapper">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      bind:value
      {placeholder}
      class="search-input"
      aria-label="Buscar anotações"
      on:input={() => onSearch(value)}
    />
  </div>
  <button class="filter-btn" on:click={onFilterClick} aria-label="Abrir filtros">
    <span class="filter-icon">⚙️</span>
    <span class="filter-text">Filtro</span>
  </button>
</div>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-surface);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-card);
    margin-bottom: var(--spacing-md);
  }
  .search-input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    background: var(--color-background);
    border-radius: var(--border-radius-sm);
    padding: 0 var(--spacing-sm);
    border: 1px solid var(--color-border);
    transition: border-color var(--transition);
  }
  .search-input-wrapper:focus-within {
    border-color: var(--color-primary);
  }
  .search-icon {
    margin-right: var(--spacing-sm);
    color: var(--color-text-secondary);
  }
  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    padding: var(--spacing-sm) 0;
    min-height: 44px;
    color: var(--color-text);
    outline: none;
  }
  .filter-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    min-height: 44px;
    background: var(--color-primary);
    color: var(--color-primary-contrast);
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    transition: background var(--transition);
    white-space: nowrap;
  }
  .filter-btn:hover {
    filter: brightness(1.1);
  }
  .filter-icon {
    font-size: 1.2rem;
  }

  @media (max-width: 360px) {
    .search-bar {
      padding: var(--spacing-xs) var(--spacing-sm);
    }
    .filter-text {
      display: none;
    }
    .filter-btn {
      padding: var(--spacing-sm);
    }
  }
</style>