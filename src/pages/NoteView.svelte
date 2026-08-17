<script lang="ts">
  import { onMount } from 'svelte';
  import { currentRoute, routeParams } from '../stores/route';
  import { currentNote, currentNoteId, notes } from '../stores/notes';
  import { shareNote } from '../lib/api';
  import Button from '../components/Button.svelte';
  import Modal from '../components/Modal.svelte';

  let showShareModal = false;
  let shareFormat: 'pdf' | 'docx' = 'pdf';
  let isSharing = false;

  function goBack() {
    currentRoute.set('home');
    currentNoteId.set(null);
  }

  function goToEdit() {
    if ($currentNoteId) {
      currentRoute.set('note-edit');
    }
  }

  async function handleShare() {
    if (!$currentNote) return;
    isSharing = true;
    try {
      const blob = await shareNote($currentNote.id, shareFormat);
      // Simular download/compartilhamento - em um app real, usar a API Web Share ou download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `anotacao.${shareFormat === 'pdf' ? 'pdf' : 'docx'}`;
      a.click();
      URL.revokeObjectURL(url);
      showShareModal = false;
    } catch (err) {
      alert('Erro ao compartilhar.');
    } finally {
      isSharing = false;
    }
  }

  async function handleDelete() {
    if (!$currentNote) return;
    if (confirm('Tem certeza que deseja excluir esta anotação?')) {
      await notes.remove($currentNote.id);
      goBack();
    }
  }

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
</script>

<div class="view-page">
  <header class="view-header">
    <button class="back-btn" on:click={goBack} aria-label="Voltar">
      ←
    </button>
    <h1 class="view-title">Visualizar Anotação</h1>
    <div class="header-actions">
      <button class="icon-btn" on:click={goToEdit} aria-label="Editar anotação">
        ✏️
      </button>
      <button class="icon-btn" on:click={() => showShareModal = true} aria-label="Compartilhar">
        📤
      </button>
    </div>
  </header>

  {#if $currentNote}
    <div class="view-content">
      <h2 class="view-note-title">{$currentNote.title}</h2>
      <span class="view-category">{$currentNote.category}</span>
      <p class="view-content-text">{$currentNote.content}</p>
      <time class="view-date">Atualizado em {formatDate($currentNote.updatedAt)}</time>
    </div>
    <div class="view-actions">
      <Button variant="danger" on:click={handleDelete}>Excluir</Button>
    </div>
  {:else}
    <p class="empty-state">Anotação não encontrada.</p>
  {/if}

  <!-- Modal Compartilhar -->
  <Modal open={showShareModal} title="Compartilhar" onClose={() => showShareModal = false}>
    <div class="share-options">
      <div class="share-format">
        <p class="share-label">Formato:</p>
        <div class="radio-group">
          <label>
            <input type="radio" bind:group={shareFormat} value="pdf" />
            PDF
          </label>
          <label>
            <input type="radio" bind:group={shareFormat} value="docx" />
            DOCX
          </label>
        </div>
      </div>
      <div class="share-actions">
        <Button variant="secondary" on:click={() => showShareModal = false} disabled={isSharing}>
          Cancelar
        </Button>
        <Button variant="primary" on:click={handleShare} disabled={isSharing}>
          {isSharing ? 'Gerando...' : 'Compartilhar'}
        </Button>
      </div>
    </div>
  </Modal>
</div>

<style>
  .view-page {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-md);
  }
  .view-header {
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
  .view-title {
    font-size: var(--font-size-heading);
    margin: 0;
    flex: 1;
  }
  .header-actions {
    display: flex;
    gap: var(--spacing-sm);
  }
  .icon-btn {
    font-size: 1.5rem;
    min-height: 44px;
    min-width: 44px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-text);
  }
  .view-content {
    background: var(--color-surface);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-card);
    border: 1px solid var(--color-border);
    margin-bottom: var(--spacing-md);
  }
  .view-note-title {
    font-size: var(--font-size-title);
    margin: 0 0 var(--spacing-xs) 0;
  }
  .view-category {
    display: inline-block;
    background: #E3F2FD;
    padding: 2px var(--spacing-sm);
    border-radius: 12px;
    font-size: var(--font-size-small);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
  }
  .view-content-text {
    white-space: pre-wrap;
    margin-bottom: var(--spacing-md);
  }
  .view-date {
    font-size: var(--font-size-small);
    color: var(--color-text-secondary);
  }
  .view-actions {
    display: flex;
    justify-content: flex-end;
  }
  .empty-state {
    text-align: center;
    color: var(--color-text-secondary);
    padding: var(--spacing-xl) 0;
  }

  /* Modal compartilhar */
  .share-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  .share-format {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .share-label {
    font-weight: 500;
  }
  .radio-group {
    display: flex;
    gap: var(--spacing-md);
  }
  .radio-group label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    min-height: 44px;
    cursor: pointer;
  }
  .share-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    padding-top: var(--spacing-md);
  }

  @media (max-width: 360px) {
    .view-page {
      padding: var(--spacing-sm);
    }
    .view-content {
      padding: var(--spacing-sm);
    }
    .header-actions {
      gap: var(--spacing-xs);
    }
    .share-actions {
      flex-direction: column;
    }
    /*.share-actions Button {
      width: 100%;
    }*/
    .radio-group {
      flex-direction: column;
      gap: var(--spacing-xs);
    }
  }
</style>