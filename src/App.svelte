<script lang="ts">
  import { currentRoute, routeParams } from './stores/route';
  import Home from './pages/Home.svelte';
  import Settings from './pages/Settings.svelte';
  import NoteView from './pages/NoteView.svelte';
  import NoteForm from './pages/NoteForm.svelte';

  $: route = $currentRoute;
</script>

<div class="app">
  {#if route === 'home'}
    <Home />
  {:else if route === 'settings'}
    <Settings />
  {:else if route === 'note-view'}
    <NoteView />
  {:else if route === 'note-add'}
    <NoteForm mode="add" />
  {:else if route === 'note-edit'}
    <NoteForm mode="edit" />
  {:else}
    <p>Nada bom</p>
  {/if}
</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--color-background);
  }
</style>