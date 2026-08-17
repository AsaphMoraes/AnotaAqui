<script lang="ts">
  import { onMount } from 'svelte';
  import { notes, currentNoteId } from '../stores/notes';
  import { filters } from '../stores/filters';
  import { currentRoute, routeParams } from '../stores/route';
  import Card from '../components/Card.svelte';
  import SearchBar from '../components/SearchBar.svelte';
  import FAB from '../components/FAB.svelte';
  import FilterModal from './FilterModal.svelte';
  import type { FilterOptions, Note } from '../types';

  let searchQuery = '';
  let showFilter = false;
  let filteredNotes: typeof notes | any= [];

  $: {
    // Aplica filtro de texto (cliente) - futuramente pode ser backend
    if ($notes) {
      const q = searchQuery.toLowerCase();
      filteredNotes = $notes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
      );
      // Ordenação (simples) - o filtro real será aplicado via modal
      // Aqui só ordenamos por data (já que o sortBy está no filtro)
      const sortBy = $filters.sortBy;
      if (sortBy === 'recent') {
        filteredNotes.sort(({a, b} : any ) => b.updatedAt.getTime() - a.updatedAt.getTime());
      } else if (sortBy === 'oldest') {
        filteredNotes.sort(({a, b} : any) => a.updatedAt.getTime() - b.updatedAt.getTime());
      } else if (sortBy === 'title') {
        filteredNotes.sort(({a, b} : any) => a.title.localeCompare(b.title));
      }
      // Filtro por categoria
      if ($filters.categories.length > 0) {
        filteredNotes = filteredNotes.filter((n : Note) => $filters.categories.includes(n.category));
      }
    } else {
      filteredNotes = [];
    }
  }
  
  onMount(async () => {
    await notes.load($filters);
  });

  function goToNote(id: string) {
    currentNoteId.set(id);
    currentRoute.set('note-view');
  }

  function goToAdd() {
    currentRoute.set('note-add');
  }

  function goToSettings() {
    currentRoute.set('settings');
  }

  function applyFilters(newFilters: FilterOptions) {
    filters.set(newFilters);
    notes.load(newFilters);
    showFilter = false;
  }
</script>

<div class="home">
  <header class="home-header">
    <h1 class="home-title">Minhas Anotações</h1>
    <button class="settings-btn" on:click={goToSettings} aria-label="Configurações">
      ⚙️
    </button>
  </header>

  <SearchBar
    bind:value={searchQuery}
    onFilterClick={() => showFilter = true}
  />

  <div class="notes-list">
    {#each filteredNotes as note (note.id)}
      <Card {note} onClick={() => goToNote(note.id)} />
    {:else}
      <p class="empty-state">Nenhuma anotação encontrada.</p>
    {/each}
  </div>

  <FAB onClick={goToAdd} />

  <FilterModal
    bind:open={showFilter}
    onApply={applyFilters}
    onClose={() => showFilter = false}
  />
</div>

<style>
  .home {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-md);
    padding-bottom: 80px; /* espaço para o FAB */
  }
  .home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }
  .home-title {
    font-size: var(--font-size-heading);
    font-weight: 700;
    margin: 0;
  }
  .settings-btn {
    font-size: 1.5rem;
    min-height: 44px;
    min-width: 44px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-text);
  }
  .notes-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .empty-state {
    text-align: center;
    color: var(--color-text-secondary);
    padding: var(--spacing-xl) 0;
  }

  @media (max-width: 360px) {
    .home {
      padding: var(--spacing-sm);
    }
    .home-title {
      font-size: var(--font-size-title);
    }
  }
</style>