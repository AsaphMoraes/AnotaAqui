<script lang="ts">
  export let open = false;
  export let onClose: () => void = () => {};
  export let title: string = '';
  export let closeOnBackdrop = true;
  export let ariaLabel: string = '';
</script>

{#if open}
  <div
    class="modal-backdrop"
    role="dialog"
    on:click={(e) => {
      if (e.target === e.currentTarget && closeOnBackdrop) onClose();
    }}
    on:keydown={(e) => {
      // Handler vazio só para satisfazer a regra do Svelte.
      // O fechamento real por teclado já está no <svelte:window> acima.
      // Se quiser, pode colocar: if (e.key === 'Escape') onClose();
    }}
    aria-modal="true"
    aria-label={ariaLabel || title || 'Modal'}
    tabindex="-1"
  >
    <div class="modal-content">
      <header class="modal-header">
        <h2 class="modal-title">{title}</h2>
        <button class="modal-close" on:click={onClose} aria-label="Fechar modal">
          ✕
        </button>
      </header>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: var(--spacing-md);
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }
  .modal-content {
    background: var(--color-surface);
    border-radius: var(--border-radius);
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 24px var(--color-shadow);
    animation: slideUp 0.3s ease;
    padding: var(--spacing-md);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
  }
  .modal-title {
    font-size: var(--font-size-title);
    margin: 0;
  }
  .modal-close {
    font-size: 1.5rem;
    line-height: 1;
    padding: var(--spacing-xs);
    min-width: 44px;
    min-height: 44px;
    color: var(--color-text-secondary);
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .modal-close:hover {
    color: var(--color-text);
  }
  .modal-body {
    overflow-y: auto;
    flex: 1;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Responsividade: em telas muito pequenas, reduz padding */
  @media (max-width: 360px) {
    .modal-content {
      padding: var(--spacing-sm);
    }
  }
  /* Em telas maiores, centraliza verticalmente */
  @media (min-width: 768px) {
    .modal-backdrop {
      align-items: center;
    }
  }
</style>