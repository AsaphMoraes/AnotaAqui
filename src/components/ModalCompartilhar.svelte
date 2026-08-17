<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let aberto: boolean = false;
  export let anotacaoId: string;
  let formato: 'pdf' | 'docx' = 'pdf';

  const dispatch = createEventDispatcher();

  function compartilhar() {
    dispatch('compartilhar', { id: anotacaoId, formato });
    aberto = false;
  }

  function fechar() {
    aberto = false;
  }

  function handleBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) fechar();
  }
</script>

{#if aberto}
  <div class="backdrop" on:click={handleBackdrop} role="dialog" aria-modal="true">
    <div class="modal">
      <header>
        <h2>Compartilhar anotação</h2>
        <button class="fechar" on:click={fechar}>&times;</button>
      </header>
      <div class="corpo">
        <fieldset>
          <legend>Formato</legend>
          <label>
            <input type="radio" name="formato" value="pdf" bind:group={formato} />
            PDF
          </label>
          <label>
            <input type="radio" name="formato" value="docx" bind:group={formato} />
            DOCX
          </label>
        </fieldset>
        <div class="botoes-app">
          <button class="app" on:click={() => compartilhar()}>WhatsApp</button>
          <button class="app" on:click={() => compartilhar()}>E-mail</button>
          <button class="app" on:click={() => compartilhar()}>Outros...</button>
        </div>
      </div>
      <footer>
        <button class="btn-primario" on:click={compartilhar}>Compartilhar</button>
      </footer>
    </div>
  </div>
{/if}

<style>
  /* Similar ao FiltroModal, com ajustes */
  .backdrop { /* mesmo estilo do filtro */ }
  .modal { /* mesmo estilo */ }
  .botoes-app {
    display: flex;
    gap: var(--spacing-unit);
    flex-wrap: wrap;
    margin: var(--spacing-unit) 0;
  }
  .app {
    background: #e0e0e0;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    min-height: var(--touch-target);
    cursor: pointer;
  }
  /* (reaproveitar estilos do FiltroModal para .btn-primario, .fechar, etc) */
</style>