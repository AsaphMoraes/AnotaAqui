<script lang="ts">
  import { onMount } from 'svelte';
  import { settings, connectAccount, disconnectAccount, doBackup, doRestore } from '../stores/settings';
  import { currentRoute } from '../stores/route';
  import Button from '../components/Button.svelte';
  //import ToggleSwitch from '../components/ToggleSwitch.svelte';

  let localSettings = { ...$settings };

  $: {
    // Sincroniza com a store quando mudar
    if (localSettings) {
      settings.set(localSettings);
    }
  }

  function goBack() {
    currentRoute.set('home');
  }

  async function handleConnect() {
    await connectAccount();
    localSettings = { ...$settings };
  }

  async function handleDisconnect() {
    await disconnectAccount();
    localSettings = { ...$settings };
  }

  async function handleBackup() {
    await doBackup();
    alert('Backup realizado com sucesso!');
  }

  async function handleRestore() {
    if (confirm('Deseja restaurar os dados? Isso sobrescreverá as anotações atuais.')) {
      await doRestore();
      alert('Dados restaurados!');
      // Recarregar lista?
    }
  }
</script>

<div class="settings">
  <header class="settings-header">
    <button class="back-btn" on:click={goBack} aria-label="Voltar">
      ←
    </button>
    <h1 class="settings-title">Configurações</h1>
  </header>

  <div class="settings-list">
    <!-- Backup -->
    <section class="settings-block">
      <h2 class="block-title">Backup</h2>
      <div class="block-content">
        <div class="setting-item">
          <h3 class="setting-label">Período de backup</h3>
          <div class="radio-group">
            <label>
              <input type="radio" bind:group={localSettings.backupPeriod} value="daily" />
              Diário
            </label>
            <label>
              <input type="radio" bind:group={localSettings.backupPeriod} value="weekly" />
              Semanal
            </label>
          </div>
        </div>

        <div class="setting-item">
          <span class="setting-label">Conta Google</span>
          <div class="account-info">
            {#if localSettings.googleAccount}
              <span>{localSettings.googleAccount}</span>
              <Button variant="danger" on:click={handleDisconnect}>Desconectar</Button>
            {:else}
              <span class="text-muted">Nenhuma conta conectada</span>
              <Button variant="primary" on:click={handleConnect}>Conectar</Button>
            {/if}
          </div>
        </div>

        <div class="setting-item actions">
          <Button variant="secondary" on:click={handleBackup}>Fazer backup manual</Button>
          <Button variant="secondary" on:click={handleRestore}>Restaurar dados</Button>
        </div>
      </div>
    </section>

    <!-- Aparência -->
    <section class="settings-block">
      <h2 class="block-title">Aparência</h2>
      <div class="block-content">
        <div class="setting-item">
          <h3 class="setting-label">Tema</h3>
          <div class="radio-group">
            <label>
              <input type="radio" bind:group={localSettings.theme} value="light" />
              Claro
            </label>
            <label>
              <input type="radio" bind:group={localSettings.theme} value="dark" />
              Escuro
            </label>
            <label>
              <input type="radio" bind:group={localSettings.theme} value="system" />
              Sistema
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Sobre -->
    <section class="settings-block">
      <h2 class="block-title">Sobre</h2>
      <div class="block-content">
        <p>Versão 1.0.0</p>
        <p>App de anotações acessível</p>
      </div>
    </section>
  </div>
</div>

<style>
  .settings {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-md);
  }
  .settings-header {
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
  .settings-title {
    font-size: var(--font-size-heading);
    margin: 0;
  }
  .settings-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  .settings-block {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    background: var(--color-surface);
  }
  .block-title {
    font-size: var(--font-size-title);
    font-weight: 600;
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .block-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  .setting-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .setting-label {
    font-weight: 500;
  }
  .account-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }
  .text-muted {
    color: var(--color-text-secondary);
  }
  .radio-group {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }
  .radio-group label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    min-height: 44px;
    cursor: pointer;
  }
  .actions {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  @media (max-width: 360px) {
    .settings {
      padding: var(--spacing-sm);
    }
    .settings-block {
      padding: var(--spacing-sm);
    }
    .radio-group {
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    .account-info {
      flex-direction: column;
      align-items: stretch;
    }
    .actions {
      flex-direction: column;
    }
    /* .actions Button {
      width: 100%;
    } */
  }
</style>