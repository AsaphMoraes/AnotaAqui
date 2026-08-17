<!-- src/lib/components/Header.svelte -->
<script lang="ts">
  export let titulo: string;
  export let acao?: { icone: string; aoClicar: () => void; descricao: string };
</script>

<header class="header">
  <h1 class="titulo">{titulo}</h1>
  {#if acao}
    <button
      class="btn-acao"
      on:click={acao.aoClicar}
      aria-label={acao.descricao}
      type="button"
    >
      <span class="icone">{acao.icone}</span>
    </button>
  {/if}
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    background-color: var(--bg-header, #f5f5f5);
    border-bottom: 1px solid #ddd;
    min-height: 56px;
  }
  .titulo {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
    color: var(--text-primary, #111);
  }
  .btn-acao {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1.5rem;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-acao:focus-visible {
    outline: 2px solid #005a9c;
    outline-offset: 2px;
  }
  .icone {
    font-size: 1.5rem;
    line-height: 1;
  }
</style>