<!-- src/lib/components/ConfigBloco.svelte -->
<script lang="ts">
  export let titulo: string;
  export let children: any; // slot
</script>

<div class="bloco">
  <h3 class="bloco-titulo">{titulo}</h3>
  <div class="bloco-conteudo">
    <slot />
  </div>
</div>

<style>
  .bloco {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .bloco-titulo {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #888;
    margin: 0 0 0.75rem 0;
  }
  .bloco-conteudo {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>