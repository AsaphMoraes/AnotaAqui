<script lang="ts">
  import type { Note } from '../types';

  export let note: Note;
  export let onClick: () => void = () => {};
  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Trabalho': '#E3F2FD',
      'Pessoal': '#F3E5F5',
      'Estudos': '#E8F5E9',
    };
    return colors[category] || '#F5F5F5';
  }

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }
</script>

<div class="card" role="button" tabindex="0" on:click={onClick} on:keydown={(e) => e.key === 'Enter' && onClick()}>
  <div class="card-header">
    <h3 class="card-title">{note.title}</h3>
    <span class="card-category" style="background-color: {getCategoryColor(note.category)};">
      {note.category}
    </span>
  </div>
  <p class="card-preview">{note.content.slice(0, 80)}...</p>
  <time class="card-date">{formatDate(note.updatedAt)}</time>
</div>

<style>
  .card {
    background: var(--color-surface);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    box-shadow: var(--shadow-card);
    transition: transform var(--transition), box-shadow var(--transition);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    border: 1px solid var(--color-border);
  }
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-shadow);
  }
  .card:active {
    transform: scale(0.98);
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
  .card-title {
    font-size: var(--font-size-body);
    font-weight: 600;
    margin: 0;
    flex: 1;
  }
  .card-category {
    font-size: var(--font-size-small);
    padding: 2px var(--spacing-sm);
    border-radius: 12px;
    font-weight: 500;
    color: var(--color-text);
  }
  .card-preview {
    font-size: var(--font-size-body);
    color: var(--color-text-secondary);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-date {
    font-size: var(--font-size-small);
    color: var(--color-text-secondary);
    align-self: flex-end;
  }

  @media (max-width: 360px) {
    .card {
      padding: var(--spacing-sm);
    }
    .card-title {
      font-size: var(--font-size-small);
    }
  }
</style>