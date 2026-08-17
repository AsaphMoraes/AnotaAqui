<script lang="ts">
  export let label: string = '';
  export let value: string = '';
  export let placeholder: string = '';
  export let type: 'text' | 'email' | 'password' = 'text';
  export let required = false;
  export let multiline = false;
  export let rows = 4;
  export let disabled = false;
  export let id: string = '';
  export let ariaDescribedby: string = '';
</script>

<div class="input-group">
  {#if label}
    <label for={id} class="input-label">{label}{#if required} *{/if}</label>
  {/if}
  {#if multiline}
    <textarea
      {id}
      bind:value
      {placeholder}
      {rows}
      {disabled}
      class="input-field"
      aria-describedby={ariaDescribedby || undefined}
    ></textarea>
  {:else}
    <input
      {id}
      {type}
      bind:value
      {placeholder}
      {disabled}
      class="input-field"
      aria-describedby={ariaDescribedby || undefined}
    />
  {/if}
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
    width: 100%;
  }
  .input-label {
    font-size: var(--font-size-body);
    font-weight: 500;
    color: var(--color-text);
  }
  .input-field {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: var(--font-size-body);
    transition: border-color var(--transition), box-shadow var(--transition);
    min-height: 44px;
    width: 100%;
  }
  .input-field:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.3);
  }
  .input-field:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  textarea.input-field {
    resize: vertical;
    min-height: 100px;
  }

  @media (max-width: 360px) {
    .input-field {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: var(--font-size-small);
    }
  }
</style>