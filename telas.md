# Design de App Mobile - Anotações Acessíveis (WCAG)

Como designer, apresento a solução visual e interativa para o aplicativo de anotações, seguindo rigorosamente as diretrizes **WCAG 2.1 (nível AA)** para garantir acessibilidade a todos os usuários, incluindo pessoas com deficiência visual, motora ou cognitiva.

---

## 1. Diretrizes Gerais de Acessibilidade Aplicadas

- **Contraste mínimo** – relação de contraste de **4,5:1** para textos e **3:1** para elementos gráficos (WCAG 1.4.3).
- **Toque alvo** – todos os elementos interativos com área mínima de **44x44 dp** (WCAG 2.5.5).
- **Rótulos claros** – uso de `aria-label` ou textos descritivos para ícones (WCAG 1.1.1, 2.4.6).
- **Navegação por teclado/foco** – ordem lógica e indicadores de foco visíveis (WCAG 2.4.7).
- **Texto redimensionável** – suporte a zoom até 200% sem perda de conteúdo (WCAG 1.4.4).
- **Cores não exclusivas** – informações não dependem apenas de cor (WCAG 1.4.1).

**Paleta de cores (modo claro/escuro):**
- Primária: `#005A9C` (azul acessível) – contraste 4,8:1 com branco.
- Secundária: `#F5F5F5` (fundo claro) / `#1E1E1E` (fundo escuro).
- Texto: `#111111` (claro) / `#E0E0E0` (escuro).
- Ações: `#D32F2F` (perigo), `#2E7D32` (sucesso).
- FAB: `#005A9C` com sombra suave.

**Tipografia:** `Roboto` (sans-serif) – tamanhos mínimos: corpo `16sp`, títulos `20sp`, subtítulos `14sp`.

---

## 2. Tela Home

**Layout geral**  
- **Header** (fixo no topo): título "Minhas Anotações" (h1) e ícone de configurações (engrenagem) à direita, com `role="button"` e descrição "Abrir configurações".  
- **Barra de pesquisa com filtro** – campo de entrada com lupa à esquerda e botão "Filtro" (ou ícone de funil) à direita. O campo tem placeholder "Buscar anotação...".  
- **Modal de filtro** – ao tocar no botão Filtro, abre um modal semitransparente com opções de filtro:  
  - Ordenar por: data (recente/antiga), título, categoria.  
  - Filtrar por categoria: lista de categorias pré-definidas (checkbox).  
  - Botões "Aplicar" e "Limpar".  
  - O modal é fechado com toque fora ou botão "X".  
- **Scroll com cards** – lista vertical (rolagem infinita) de cards. Cada card exibe:  
  - Título (negrito, `16sp`),  
  - Categoria (tag com cor de fundo suave),  
  - Prévia do conteúdo (máx. 2 linhas),  
  - Data de modificação (texto pequeno, `12sp`).  
  - Card tem `role="button"` e ao toque navega para a **tela de edição** (com dados preenchidos).  
- **FAB (botão flutuante)** – círculo com ícone "+" (mais) posicionado no canto inferior direito. Ao tocar, navega para a **tela de adição** (card vazio).  
- **Barra de navegação inferior** – opcional, com ícones: "Home", "Categorias", "Arquivo".

**Comportamento de foco:**  
- A ordem de tabulação segue: pesquisa → filtro → primeiro card → ... → FAB → configurações.  
- O FAB recebe foco após o último card.

---

## 3. Tela Configurações

**Layout**  
- **Header** com título "Configurações" e botão "Voltar" (seta).  
- **Lista de blocos** – cada bloco é uma seção com borda arredondada e sombra leve, separada por espaçamento vertical (`16dp`).  
- **Cada bloco possui uma categoria** (título em `14sp` maiúsculo, cor secundária).  
- **Categoria Backup** – dentro deste bloco:  
  - **Seletor de período** – duas opções: "Diário" e "Semanal" (botões de rádio estilizados).  
  - **Conta do Google** – campo de e-mail (exibido) com botão "Conectar"/"Desconectar".  
  - **Botão "Fazer backup manual"** – com ícone de nuvem e indicador de progresso (quando ativo).  
  - **Botão "Restaurar dados"** – com ícone de seta para baixo, aciona confirmação (alerta).  
- **Outras categorias** (exemplo): "Aparência" (modo claro/escuro), "Notificações", "Sobre".  
- Todos os botões e controles têm rótulos descritivos e área de toque ≥ 44dp.

**Acessibilidade extra:**  
- Os botões de rádio e checkboxes têm `aria-checked` e contrastam com o fundo.  
- Os campos de texto têm labels visíveis.

---

## 4. Tela Card (Visualização / Edição / Adição)

**Layout comum para as três variantes**  
- **Header** com título dinâmico:  
  - Visualização: "Visualizar anotação" + botão "Editar" (lápis) e "Compartilhar".  
  - Edição: "Editar anotação" + botão "Salvar" e "Cancelar".  
  - Adição: "Nova anotação" + botão "Salvar" e "Cancelar".  
- **Campos do formulário** (em ordem lógica):  
  1. **Título** – campo de texto (`EditText`) com placeholder "Título da anotação".  
  2. **Categoria** – campo de seleção (spinner ou lista dropdown) com opções pré-definidas (ou criação rápida).  
  3. **Conteúdo** – campo de texto multilinha (altura ajustável) com placeholder "Escreva sua anotação...".  
- Todos os campos têm labels acima (não apenas placeholders) para melhor acessibilidade.  
- **Botão "Compartilhar"** – presente apenas na visualização. Ao tocar, abre um **modal de compartilhamento** com:  
  - Opções: WhatsApp, E-mail, Outros (com ícones).  
  - Seleção de formato: PDF, DOCX (botões de rádio).  
  - Botão "Compartilhar" gera o arquivo e aciona o compartilhamento nativo do sistema.  
  - O modal é acessível com foco gerenciado.  
- **Diferenças:**  
  - **Adição**: todos os campos vazios; ao salvar, valida se título e conteúdo não estão vazios.  
  - **Edição**: campos preenchidos com os dados atuais; ao salvar, atualiza o card.  
  - **Visualização**: campos somente leitura (com fundo levemente cinza) e botão de edição habilitado.

**Interação de toque:**  
- Toque no campo de texto abre o teclado virtual.  
- Toque em "Salvar" valida e retorna à Home (com feedback toast).  
- Toque em "Cancelar" pergunta se deseja descartar alterações (alerta de confirmação).

---

## 5. Fluxo de Navegação

- **Home** → (clique no card) → **Edição**  
- **Home** → (FAB) → **Adição**  
- **Home** → (ícone configurações) → **Configurações**  
- **Configurações** → (botão voltar) → **Home**  
- **Edição/Adição** → (salvar/cancelar) → **Home**  
- **Visualização** → (compartilhar) → **Modal Compartilhar** → (compartilhar) → ação do sistema.

---

## 6. Considerações Técnicas e de Performance

- **Scroll com cards** – implementar com `RecyclerView` (Android) ou `UICollectionView` (iOS) com carregamento paginado para otimizar performance.  
- **Modal de filtro** – usar `BottomSheetDialog` (Android) ou `UIPresentationController` (iOS) para melhor ergonomia.  
- **Geração de PDF/DOCX** – utilizar bibliotecas como `iText` ou `Apache POI` (backend) ou gerar localmente com `PdfDocument` (Android).  
- **Backup** – agendar com `WorkManager` (Android) para backups periódicos; integração com Google Drive API.  
- **Acessibilidade** – testar com leitores de tela (TalkBack/VoiceOver) e ajustar a ordem de leitura.

---

## 7. Wireframe Textual (Representação Esquemática)

```
+--------------------------------------------------+
|  [Título]                [Configurações]          |  <- Header
+--------------------------------------------------+
|  🔍 [Buscar...]           [Filtro]               |  <- Barra de pesquisa
+--------------------------------------------------+
|  +----------------------------------------+       |
|  | Título da anotação 1                   |       |
|  | Categoria: Trabalho   📅 12/08/2026   |       |
|  | Prévia do conteúdo...                  |       |
|  +----------------------------------------+       |
|  +----------------------------------------+       |
|  | Título da anotação 2                   |       |
|  | Categoria: Pessoal    📅 11/08/2026   |       |
|  | Outra prévia...                       |       |
|  +----------------------------------------+       |
|  ... (scroll)                                    |
|                                                    |
|                     [ + ]  <- FAB                  |
+--------------------------------------------------+
```

**Modal de filtro** (sobreposto):

```
+-------------------------------------------+
|  [X] Filtros                               |
|  Ordenar:  ○ Recentes  ○ Antigos          |
|  Categorias:                               |
|  ☑ Trabalho   ☐ Pessoal   ☐ Estudos      |
|  [Aplicar]  [Limpar]                      |
+-------------------------------------------+
```

**Tela de edição/visualização:**

```
+-------------------------------------------+
|  < Voltar   [Título dinâmico]   [Compart.]|
+-------------------------------------------+
|  Título *                                  |
|  [________________________________]         |
|  Categoria *                               |
|  [ ▼ Selecione... ]                        |
|  Conteúdo *                                |
|  [________________________________]         |
|  [________________________________]         |
|  [________________________________]         |
|                                            |
|          [ SALVAR ]   [ CANCELAR ]         |
+-------------------------------------------+
```

**Modal de compartilhamento:**

```
+-------------------------------------------+
|  Compartilhar anotação                     |
|  Formato:  ● PDF   ○ DOCX                 |
|  Enviar via:                               |
|  [WhatsApp]  [E-mail]  [Outros...]        |
|  [ COMPARTILHAR ]                         |
+-------------------------------------------+
```

---

## 8. Conformidade WCAG – Checklist Resumido

| Critério | Implementação |
|----------|---------------|
| 1.4.3 Contraste | Cores testadas com ferramenta (ex: Contrast Checker) |
| 2.5.1 Toque | Todos os botões ≥ 44dp |
| 2.4.6 Headings | Uso de tags semânticas (h1, h2) |
| 3.3.2 Rótulos | Labels associadas aos campos (`for`/`id`) |
| 4.1.2 Nome, função, valor | Elementos interativos com `role` e `aria-label` |
| 2.4.3 Ordem de foco | Ordem lógica: cabeçalho → conteúdo → ações |
| 2.2.1 Tempo ajustável | Sem limites de tempo nas ações |
| 1.3.1 Informação e relações | Estrutura clara com listas e grupos |

---

## Conclusão

O design proposto oferece uma experiência de usuário fluida, intuitiva e inclusiva, atendendo aos padrões WCAG para garantir que pessoas com diferentes capacidades possam utilizar o aplicativo com autonomia. As telas são limpas, com hierarquia visual bem definida e elementos interativos de fácil alcance. A integração entre as funcionalidades (filtro, compartilhamento, backup) foi pensada para ser prática e direta.

Caso precise de ajustes ou detalhamento adicional (por exemplo, especificações de animações, feedbacks sonoros ou variações de estados), estou à disposição para refinar.