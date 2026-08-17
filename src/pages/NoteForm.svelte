<script lang="ts">
  import { onMount } from 'svelte';
  import { currentRoute, routeParams } from '../stores/route';
  import { notes, currentNoteId, currentNote } from '../stores/notes';
  import Input from '../components/Input.svelte';
  import Button from '../components/Button.svelte';

  export let mode: 'add' | 'edit' = 'add';

  let title = '';
  let category = '';
  let content = '';
  let isLoading = false;

  $: {
    if (mode === 'edit' && $currentNote) {
      title = $currentNote.title;
      category = $currentNote.category;
      content = $currentNote.content;
    }
  }

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      alert('Preencha título e conteúdo.');
      return;
    }
    isLoading = true;
    try {
      if (mode === 'add') {
        await notes.add({ title, category: category || 'Geral', content });
      } else {
        const id = $currentNoteId;
        if (id) {
          await notes.edit(id, { title, category: category || 'Geral', content });
        }
      }
      goBack();
    } catch (err) {
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      isLoading = false;
    }
  }

  function goBack() {
    currentRoute.set('home');
    currentNoteId.set(null);
  }

  function handleCancel() {
    if (title || content) {
      if (confirm('Descartar alterações?')) {
        goBack();
      }
    } else {
      goBack();
    }
  }
</script>

<div class="form-page">
  <header class="form-header">
    <button class="back-btn" on:click={handleCancel} aria-label="Cancelar">
      ←
    </button>
    <h1 class="form-title">{mode === 'add' ? 'Nova Anotação' : 'Editar Anotação'}</h1>
    <div style="flex:1;"></div>
  </header>

  <div class="form-body">
    <Input
      label="Título"
      id="note-title"
      bind:value={title}
      placeholder="Título da anotação"
      required
    />
    <Input
      label="Categoria"
      id="note-category"
      bind:value={category}
      placeholder="Ex: Trabalho, Pessoal..."
    />
    <Input
      label="Conteúdo"
      id="note-content"
      bind:value={content}
      placeholder="Escreva sua anotação..."
      multiline
      rows={6}
      required
    />

    <div class="form-actions">
      <Button variant="secondary" on:click={handleCancel} disabled={isLoading}>Cancelar</Button>
      <Button variant="primary" on:click={handleSave} disabled={isLoading}>
        {isLoading ? 'Salvando...' : 'Salvar'}
      </Button>
    </div>
  </div>
</div>

<style>
  .form-page {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-md);
  }
  .form-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }
  .back-btn {
    font-size: 1.5rem;
    min-height: 44px;
    min-width: 44px;
    background: transparent;
    border: none;
    color: var(--color-text);
    cursor: pointer;
  }
  .form-title {
    font-size: var(--font-size-heading);
    margin: 0;
  }
  .form-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    padding-top: var(--spacing-md);
  }

  @media (max-width: 360px) {
    .form-page {
      padding: var(--spacing-sm);
    }
    .form-actions {
      flex-direction: column;
    }
    /*.form-actions Button {
      width: 100%;
    }*/
  }
</style>