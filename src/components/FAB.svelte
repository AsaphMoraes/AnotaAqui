<script lang="ts">
  export let onClick: () => void = () => {};
</script>

<button class="fab" on:click={onClick} aria-label="Adicionar nova anotação">
  <span class="fab-icon">+</span>
</button>

<style>
  .fab {
    position: fixed;
    bottom: var(--spacing-lg);
    right: var(--spacing-lg);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-primary);
    color: var(--color-primary-contrast);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    transition: transform var(--transition), box-shadow var(--transition);
    z-index: 100;
    border: none;
    cursor: pointer;
  }
  .fab:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
  .fab:active {
    transform: scale(0.9);
  }
  .fab-icon {
    line-height: 1;
  }

  @media (max-width: 360px) {
    .fab {
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
      bottom: var(--spacing-md);
      right: var(--spacing-md);
    }
  }
</style>