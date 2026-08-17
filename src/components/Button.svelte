<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let fullWidth = false;
  export let ariaLabel: string = '';
</script>

<button
  {type}
  {disabled}
  class="btn btn-{variant} {fullWidth ? 'full-width' : ''}"
  aria-label={ariaLabel || undefined}
  on:click
>
  <slot />
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    min-height: 44px;
    min-width: 44px;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    transition: background var(--transition), transform var(--transition);
    border: 1px solid transparent;
  }
  .btn:active:not(:disabled) {
    transform: scale(0.96);
  }
  .btn:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  .full-width {
    width: 100%;
  }

  /* Variantes */
  .btn-primary {
    background: var(--color-primary);
    color: var(--color-primary-contrast);
    border-color: var(--color-primary);
  }
  .btn-primary:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  .btn-secondary {
    background: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);
  }
  .btn-secondary:hover:not(:disabled) {
    background: var(--color-background);
  }

  .btn-danger {
    background: var(--color-danger);
    color: white;
    border-color: var(--color-danger);
  }
  .btn-danger:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  .btn-success {
    background: var(--color-success);
    color: white;
    border-color: var(--color-success);
  }
  .btn-success:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  /* Responsividade: ajuste padding em telas muito pequenas */
  @media (max-width: 360px) {
    .btn {
      padding: var(--spacing-xs) var(--spacing-md);
      font-size: var(--font-size-small);
    }
  }
</style>