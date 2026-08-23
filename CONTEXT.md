# Contexto

## Stack
-   Node.js
-   Typescript
-   React
-   Prisma
-   PostgreSQL
-   Vite

## Telas
### Login/Cadastro
#### Frontend
- Formulário de Login com email e senha, ou pelo google.
- Formulário de Cadastro com email e senha, ou pelo google.

#### Diagramas
- Login
```mermaid
    flowchart TB
    A([Início: Usuário tenta login]) --> B{Qual método?}
    
    B -->|Email e senha| C[Usuário insere email e senha]
    C --> D[Envia credenciais para API]
    D --> E{API verifica se email existe no banco?}
    E -->|Não| F[Retorna erro: 'Email não existe']
    F --> G([Fim - Falha])
    E -->|Sim| H{API verifica se senha está correta?}
    H -->|Não| I[Retorna erro: 'Senha errada']
    I --> G
    H -->|Sim| J[Gera JWT]
    
    B -->|Google| K[Usuário faz login com Google]
    K --> L[Obtém token do Google Auth]
    L --> M[Envia token para API]
    M --> N{API verifica token com Google?}
    N -->|Inválido| O[Retorna erro: 'Token inválido' ou falha na autenticação]
    O --> G
    N -->|Válido| J
    
    J --> P[Define cookie com JWT válido por 24 horas]
    P --> Q[Redireciona para página Home]
    Q --> R([Fim - Sucesso])
```

- Cadastro
```mermaid
    flowchart TB
    A([Início: Cadastro]) --> B{Qual método de cadastro?}

    %% ===== FLUXO EMAIL E SENHA =====
    B -->|Email e Senha| C[Usuário insere Nome, Email e Senha]
    C --> D[Envia dados para API]
    D --> E{API verifica se email<br>já está cadastrado?}
    E -->|Sim| F([Retorna erro: 'Email já existe'])
    E -->|Não| G[API gera código de acesso aleatório]
    G --> H[Envia código de acesso para o email do usuário]
    H --> I[Usuário insere o código recebido]
    
    I --> J{API verifica código?}
    J -->|Correto| K[Cria conta no banco de dados]
    K --> L[Gera JWT]
    L --> M[Define cookie JWT com validade de 24 horas]
    M --> N([Redireciona para Home - Sucesso])
    
    J -->|Incorreto| O[Incrementa contador de tentativas]
    O --> P{Tentativas >= 5?}
    P -->|Sim| Q([Erro: Número máximo de tentativas<br>excedido. Reinicie o cadastro.])
    P -->|Não| R[Exibe mensagem: 'Código incorreto.<br>Tentativa X de 5']
    R --> I

    %% ===== FLUXO GOOGLE =====
    B -->|Google| S[Usuário faz cadastro com Google]
    S --> T[Obtém token do Google Auth]
    T --> U[Envia token para API]
    U --> V{API verifica token com Google?}
    V -->|Inválido| W([Erro: Falha na autenticação com Google])
    V -->|Válido| X[Verifica se conta já existe<br>se não, cria via Google]
    X --> L
```

### Home
#### Frontend
- Barra de pesquisa com filtros[Titulo ou Conteúdo, Data ou Categoria]
- Seção de Anotações deve ser um Scroll.
- Card Anotações deve possuir Título, Categoria, Conteúdo e Data de Modificação.
- Botão flutuante para criar nova anotação localizado no inferior direito da página.
- Menu lateral na esquerda com opcoes [Home, Configurações, Lixeira]

#### Diagramas
- Home
```mermaid
    flowchart TB
    A([Início: Usuário acessa a página Home]) --> B[Frontend lê o JWT armazenado nos cookies do navegador]
    B --> C[Frontend envia o JWT para a API<br>no cabeçalho da requisição]
    C --> D{API verifica a validade<br>e autenticidade do JWT?}
    
    D -->|Inválido ou Expirado| E[API retorna erro 401 - Não autorizado]
    E --> F([Redireciona o usuário<br>para a tela de Login])
    
    D -->|Válido| G[API decodifica o JWT<br>e extrai o ID do usuário]
    G --> H[API consulta o banco de dados<br>buscando anotações onde user_id = ID]
    H --> I[API ordena as anotações pela data de criação <strong>mais recentes primeiro</strong>]
    I --> J[API limita os resultados<br>a no máximo 50 anotações]
    J --> K[API retorna a lista das<br>50 anotações mais recentes para o Frontend]
    K --> L[Frontend recebe os dados]
    L --> M[Frontend armazena as anotações<br>no cache local]
    M --> N([Home carregada com sucesso<br>e dados disponíveis em cache])
```
- Barra de Pesquisa
```mermaid
flowchart TB
    A([Usuário está na Home<br>com anotações carregadas em cache]) --> B[Seleciona um filtro na barra de pesquisa<br>ex: Título, Conteúdo, Data, etc.]
    B --> C[Digita o termo de busca no campo]
    C --> D[Frontend aplica o filtro<br>sobre os dados em cache]
    D --> E{Existe alguma anotação<br>que corresponda ao filtro e termo?}

    E -->|Sim| F[Exibe a lista de anotações<br>que atendem ao critério]
    F --> G([Usuário visualiza anotações filtradas])

    E -->|Não| H[Exibe mensagem:<br>'Nenhuma anotação encontrada']
    H --> I([Usuário pode tentar outro termo/filtro])

    I -.->|Limpar busca ou alterar filtro| J[Restaura lista completa<br>ou aplica novo filtro]
    J --> D
```

- Seção de Anotações
```mermaid
flowchart TB
    A([Início: Seção de Anotações é carregada]) --> B[Obtém as anotações do cache local<br><strong>já carregadas pela Home</strong>]
    B --> C[Recebe o objeto de filtro<br>enviado pela barra de pesquisa]
    C --> D{Existe um objeto de filtro<br>válido e com termo não vazio?}
    
    D -->|Não| E[Exibe todas as anotações<br>disponíveis no cache]
    D -->|Sim| F[Aplica o filtro sobre as anotações<br>em cache <strong>filtra por título, conteúdo, data, etc.</strong>]
    F --> G[Exibe apenas as anotações<br>que correspondem ao filtro]
    
    E --> H[Lista de anotações exibida na tela]
    G --> H
    
    H --> I[Usuário clica em uma anotação específica]
    I --> J[Frontend captura o ID da anotação clicada]
    J --> K["Redireciona o usuário para a página de edição<br>da anotação (ex: /editar-anotacao/:id)"]
    K --> L([Fluxo continua na tela de edição])
```

- Botão Flutuante
```mermaid
flowchart TB
    A([Usuário visualiza botão flutuante]) --> B[Clique no botão flutuante]
    B --> C[Redireciona para a página de Adicionar Anotação]
    C --> D([Tela de Adicionar Anotação carregada])
```

### Adicionar Anotação
#### Frontend
- Formulário com campos de Titulo, Categoria, Counteúdo.
- Campo Categoria deve listar 5 categorias com mais anotações e um input para pesquisar ou adicionar outra se nao existir.
- Botão Salvar.
- Botão Cancelar.

#### Diagramas

- Campo Categoria
```mermaid
flowchart TB
    A([Usuário clica no campo Categoria]) --> B[Abre um modal com:<br>1. Campo de texto para busca<br>2. Lista de 6 itens]

    B --> C[O primeiro item é sempre:<br>'Adicionar categoria']
    C --> D[Os outros 5 itens são dinâmicos<br>e serão preenchidos conforme regras abaixo]

    D --> E[Usuário digita algo no campo de busca]
    E --> F[Frontend captura o texto em tempo real]

    F --> G{Texto digitado<br>não está vazio?}

    G -->|Não| H[Busca as categorias existentes<br>no sistema]
    H --> I[Ordena as categorias<br>pela quantidade de anotações<br>decrescente]
    I --> J[Seleciona as 5 primeiras<br>categorias mais populares]
    J --> K[Exibe os 5 itens com essas categorias]

    G -->|Sim| L[Busca as categorias existentes<br>que correspondem ao texto digitado]
    L --> M[Ordena as categorias encontradas<br>pela relevância ou quantidade]
    M --> N[Seleciona até 5 categorias<br>para preencher os itens]
    N --> O[Exibe os 5 itens com essas categorias<br>Se houver menos de 5, mostra apenas<br>as encontradas]

    K --> P[Usuário pode interagir com a lista]
    O --> P

    P --> Q{Qual ação o usuário realiza?}

    Q -->|Clicar em uma categoria| R[Seleciona a categoria escolhida<br>preenche o campo Categoria<br>e fecha o modal]
    R --> S([Modal fechado. Campo atualizado])

    Q -->|Clicar em 'Adicionar categoria'| T{Verifica se o campo de texto<br>da busca está vazio?}
    T -->|Sim| U[Exibe mensagem:<br>'Digite um nome para a nova categoria']
    U --> V[Usuário deve digitar algo e tentar novamente]
    V --> E

    T -->|Não| W[Frontend registra no cache e envia requisição para API<br>criando a nova categoria com o<br>texto digitado]
    W --> X[Após sucesso, a nova categoria<br>é adicionada à lista e selecionada<br>automaticamente]
    X --> S
```

- Botão Salvar
```mermaid
flowchart TB
    A([Usuário preenche os campos<br>Título, Conteúdo e Categoria]) --> B[Usuário clica no botão Salvar]
    B --> C[Frontend verifica se os campos<br>Título, Conteúdo e Categoria<br>estão preenchidos]

    C -->|Não| D[Exibe mensagem de erro:<br>'Preencha todos os campos obrigatórios']
    D --> A

    C -->|Sim| E[Frontend salva a anotação<br>no cache local]
    E --> F["Frontend envia os dados<br>para a API (POST/PUT)"]
    F --> G{API retorna sucesso?}

    G -->|Não| H[Exibe mensagem de erro<br>retornada pela API]
    H --> A

    G -->|Sim| I["Atualiza o cache com a resposta da API<br>(ID, data, etc.)"]
    I --> J[Redireciona o usuário<br>para a página Home]
    J --> K([Fim - Sucesso])
```

- Botão Cancelar
```mermaid
flowchart TB
    A([Usuário clica no botão Cancelar]) --> B[Redireciona para a página Home]
    B --> C([Home carregada])
```

### Editar Anotação
#### Frontend
- Formulário com Titulo, Categoria e Conteúdo somente visualização se modo visualização.
- Botão Editar.
- Formulário Titulo, Categoria e Conteúdo em modo edição se modo editar.
- Botão Salvar.
- Botão Cancelar.

#### Diagramas
- Editar Anotação
```mermaid
    flowchart TB
    A([Início: Usuário acessa a página de Editar Anotação]) --> B["Frontend obtém o ID da anotação<br>a partir da URL (ex: /editar/:id)"]
    B --> C[Frontend acessa o cache local<br>onde as anotações estão armazenadas]
    C --> D{Busca a anotação com o ID fornecido<br>no cache local}
    
    D -->|Não encontrada| E[Exibe mensagem de erro:<br>'Anotação não encontrada']
    E --> F[Redireciona para a página Home]
    
    D -->|Encontrada| G[Extrai os dados da anotação:<br>Título, Categoria e Conteúdo]
    G --> H[Preenche os campos do formulário:<br>• Campo Título<br>• Campo Categoria<br>• Campo Conteúdo]
    H --> I([Formulário preenchido<br>e pronto para edição])
```

- Campo Título, Categoria e Conteúdo
```mermaid
    flowchart TB
    A([Usuário acessa a página de edição<br>ex: /editar-anotacao/:id?modo=view]) --> H("Verifica variável")
    
    H -->|view| I[Configura todos os campos<br>como somente leitura<br>disabled ou readonly]
    I --> J[Exibe o formulário preenchido<br>sem possibilidade de edição]
    J --> K[Exibe botão Editar<br>ou Cancelar]
    
    H -->|edit| M[Configura todos os campos<br>como editáveis]
    M --> N[Exibe o formulário preenchido<br>com campos habilitados para edição]
    N --> O[Exibe botão Salvar<br>ou Cancelar]
```

- Botão Editar
```mermaid
flowchart TB
    A([Página de Edição carregada<br>modo inicial = 'view']) --> F[Altera a variável de modo<br>de 'view' para 'edit']
    F --> H[Botões mudam para 'Salvar' e 'Cancelar']
    H --> I([Agora no modo 'edit'<br>aguardando ação do usuário])
```

- Botão Cancelar
```mermaid
flowchart TB
    A([Usuário clica no botão Cancelar]) --> B{Qual o valor da variável<br>que armazena o modo atual?}

    B -->|view| C[Redireciona o usuário<br>para a página Home]
    C --> D([Home carregada])

    B -->|edit| E[Altera a variável de modo<br>de 'edit' para 'view']
    E --> H([Página volta ao modo de visualização])
```
- Botão Salvar
```mermaid
flowchart TB
    A([Usuário clica no botão Salvar]) --> B[Frontend verifica se os campos<br>Título, Conteúdo e Categoria<br>estão preenchidos]

    B -->|Não| C[Exibe mensagem de erro:<br>'Preencha todos os campos obrigatórios']
    C --> D([Permanece no modo 'edit'])

    B -->|Sim| E["Frontend atualiza a anotação<br>no cache local com os novos dados<br>(mantendo o mesmo ID)"]
    E --> F["Frontend envia os dados atualizados<br>para a API (PUT/PATCH)"]
    F --> G{API retorna sucesso?}

    G -->|Não| H[Exibe mensagem de erro<br>retornada pela API]
    H --> D

    G -->|Sim| I["Atualiza o cache com a resposta da API<br>(garantindo dados consistentes)"]
    I --> K[Altera a variável de modo<br>de 'edit' para 'view']
    K --> L[Exibe os novos valores salvos<br>nos campos preenchidos]
    L --> M[Substitui os botões:<br>oculta 'Salvar' e exibe 'Editar' e 'Cancelar']
    M --> N([Página em modo 'view'<br>com dados atualizados])
```