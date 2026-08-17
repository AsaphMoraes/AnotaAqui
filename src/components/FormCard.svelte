<!-- src/lib/components/FormCard.svelte -->
<script lang="ts">
  import type { Anotacao } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let anotacao: Partial<Anotacao> & { id?: string };
  export let modo: 'view' | 'edit' | 'new';
  export let salvando = false;

  const dispatch = createEventDispatcher<{
    salvar: Partial<Anotacao> & { id?: string };
    cancelar: void;
  }>();

  let titulo = anotacao.titulo || '';
  let categoria = anotacao.categoria || 'Geral';
  let conteudo = anotacao.conteudo || '';

  function handleSalvar() {
    if (!titulo.trim() || !conteudo.trim()) {
      alert('Preencha título e conteúdo.');
      return;
    }
    dispatch('salvar', {
      id: anotacao.id,
      titulo: titulo.trim(),
      categoria,
      conteudo: conteudo.trim(),
      dataModificacao: new Date() // será sobrescrito pelo backend
    });
  }
</script>

<div class="form-card">
  <div class="campo">
    <label for="titulo">Título *</label>
    <input
      id="titulo"
      type="text"
      bind:value={titulo}
      disabled={modo === 'view'}
      placeholder="Título da anotação"
      class={modo === 'view' ? 'readonly' : ''}
    />
  </div>
  <div class="campo">
    <label for="categoria">Categoria *</label>
    <select id="categoria" bind:value={categoria} disabled={modo === 'view'}>
      <option value="Trabalho">Trabalho</option>
      <option value="Pessoal">Pessoal</option>
      <option value="Estudos">Estudos</option>
      <option value="Geral">Geral</option>
    </select>
  </div>
  <div class="campo">
    <label for="conteudo">Conteúdo *</label>
    <textarea
      id="conteudo"
      bind:value={conteudo}
      disabled={modo === 'view'}
      placeholder="Escreva sua anotação..."
      rows="6"
      class={modo === 'view' ? 'readonly' : ''}
    />
  </div>

  <div class="acoes">
    {#if modo === 'view'}
      <button class="btn-editar" on:click={() => dispatch('cancelar')} type="button">
        Editar
      </button>
      <!-- Botão compartilhar será controlado pela página pai -->
    {:else}
      <button class="btn-salvar" on:click={handleSalvar} disabled={salvando}>
        {salvando ? 'Salvando...' : 'Salvar'}
      </button>
      <button class="btn-cancelar" on:click={() => dispatch('cancelar')} type="button">
        Cancelar
      </button>
    {/if}
  </div>
</div>

<style>
  .form-card {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1rem 0;
  }
  .campo {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .campo label {
    font-weight: 500;
    font-size: 0.9rem;
    color: #333;
  }
  .campo input, .campo select, .campo textarea {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }
  .campo input:focus, .campo select:focus, .campo textarea:focus {
    outline: 2px solid #005a9c;
    outline-offset: 1px;
    border-color: #005a9c;
  }
  .readonly {
    background-color: #f5f5f5;
    color: #555;
  }
  .acoes {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
  .btn-salvar, .btn-editar, .btn-cancelar {
    padding: 0.6rem 1.5rem;
    border-radius: 20px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    min-height: 44px;
  }
  .btn-salvar {
    background: #005a9c;
    color: #fff;
  }
  .btn-salvar:disabled {
    opacity: 0.6;
  }
  .btn-editar {
    background: #005a9c;
    color: #fff;
  }
  .btn-cancelar {
    background: #e0e0e0;
    color: #111;
  }
  .btn-salvar:focus-visible, .btn-editar:focus-visible, .btn-cancelar:focus-visible {
    outline: 2px solid #005a9c;
    outline-offset: 2px;
  }
</style>