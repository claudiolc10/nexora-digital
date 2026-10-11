# Nexora Digital | Site institucional

Site institucional de uma **empresa fictícia** de desenvolvimento de sites, design de interfaces e marketing digital. Projeto de portfólio feito com HTML, CSS e JavaScript puros, sem frameworks.

> A Nexora Digital não existe. Textos, serviços e informações institucionais são inventados para este projeto, e não há clientes, depoimentos, estatísticas, endereço ou contatos reais.

## Demonstração

**Site publicado:** https://claudiolc10.github.io/nexora-digital/

## Funcionalidades

- Cabeçalho fixo com logotipo tipográfico, menu de navegação e botão de chamada para ação.
- Menu mobile com abertura e fechamento por botão, por clique em um link e pela tecla Esc.
- Hero com mensagem de valor, dois botões (contato e serviços), composição geométrica em SVG e vídeo decorativo de fundo, discreto e com botão de pausa.
- Seção de serviços com três cards: desenvolvimento de sites, design de interfaces e marketing digital.
- Seção sobre a empresa, com proposta de valor e quatro princípios de trabalho.
- Formulário de contato com validação e mensagens de erro e de sucesso.
- Rodapé com informações fictícias e ano atualizado por JavaScript.
- Animações leves: entrada do hero, elementos que aparecem ao rolar a página e detalhes nos botões e no formulário.
- Layout responsivo para celulares, tablets e desktops.

## Tecnologias

- **HTML5** semântico
- **CSS3** (variáveis CSS, Grid, Flexbox, `clamp()`, media queries, animações)
- **JavaScript** puro (sem frameworks nem bibliotecas)

Não há etapa de build, dependências ou instalação.

## Estrutura do projeto

```
nexora-digital/
├── index.html   # toda a estrutura e o conteúdo da página
├── style.css    # todos os estilos
├── script.js    # menu mobile, ano do rodapé, formulário, animações e vídeo
├── hero.mp4     # vídeo decorativo de fundo do hero (opcional)
└── README.md    # este arquivo
```

HTML, CSS e JavaScript ficam em arquivos separados, sem CSS inline e sem JavaScript dentro dos atributos HTML. O `hero.mp4` é opcional: se o arquivo não existir, o site funciona normalmente, sem o vídeo.

## Como executar localmente

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador (duplo clique).

Opcionalmente, para servir por `http://localhost`:

- No VS Code, use a extensão **Live Server** (clique direito em `index.html` > *Open with Live Server*), ou
- No terminal, dentro da pasta do projeto, com Python instalado:

```bash
python -m http.server 8000
```

e acesse `http://localhost:8000`.

## Decisões técnicas

**HTML**
- Elementos semânticos (`header`, `nav`, `main`, `section`, `form`, `footer`) e um único `h1`.
- Link "Pular para o conteúdo" para navegação por teclado.
- Seções nomeadas com `aria-labelledby`, e dois `nav` com rótulos diferentes (principal e rodapé).

**CSS**
- Variáveis CSS para cores, espaçamentos e medidas, definidas em um só lugar.
- Abordagem *mobile-first*: o CSS base é para celular e `@media (min-width: ...)` amplia o layout (pontos em `40em` e `56em`).
- Grid para layouts de duas e três colunas, Flexbox para menu e alinhamentos.
- `clamp()` nos títulos, para o tamanho acompanhar a largura da tela sem várias media queries.
- A seção "Sobre" usa fundo claro redefinindo as variáveis de cor dentro dela, sem repetir regras.
- Ícones e a composição do hero são SVG inline, sem imagens externas.
- Efeitos de hover só em aparelhos com mouse (`@media (hover: hover)`).
- Animações leves, só de `opacity` e `transform`, ativadas apenas para quem não pediu menos movimento (`prefers-reduced-motion`). Sem JavaScript, todo o conteúdo continua visível.
- Fontes do sistema, para carregar rápido e sem depender de internet.

**JavaScript**
- Cinco blocos independentes: menu mobile, ano do rodapé, formulário, animação de entrada ao rolar (`IntersectionObserver`) e vídeo de fundo do hero.
- Funções pequenas e com um único propósito (`obterErro`, `mostrarErro`, `limparErro`, `validarCampo`).
- Um único ouvinte de evento no formulário atende todos os campos (delegação de eventos).
- Texto inserido com `textContent`, e não `innerHTML`.

**Vídeo de fundo**
- É puramente decorativo (`aria-hidden`), sem áudio e com baixa opacidade.
- O arquivo só é carregado se a pessoa não pediu menos movimento nem economia de dados.
- Pausa sozinho quando o hero sai da tela, e há um botão para pausar e retomar.
- Se o arquivo falhar ou o navegador bloquear a reprodução automática, o hero continua normal.

## Formulário de contato

**O que faz**
- Valida os quatro campos, todos obrigatórios: nome (mínimo 2 caracteres), e-mail (formato válido), assunto (mínimo 3) e mensagem (mínimo 10).
- Mostra o erro logo abaixo do campo, marca o campo com `aria-invalid` e leva o foco ao primeiro campo com erro.
- Valida ao sair do campo e corrige em tempo real enquanto a pessoa digita.
- Não recarrega a página.
- Com tudo válido, mostra uma mensagem de sucesso e limpa os campos.

**O que não faz**
- **Não envia nada.** Não há back-end, e a mensagem de sucesso diz que os dados foram apenas validados no navegador, sem envio nem armazenamento.
- A validação de e-mail usa um padrão simples (`algo@algo.algo`) e não confirma que o endereço existe.
- Num site real, o servidor precisaria validar os dados novamente, porque a validação do navegador pode ser contornada.

## Acessibilidade

- Navegação completa por teclado, com foco visível em todos os elementos interativos.
- `aria-expanded` e `aria-controls` no botão do menu.
- Cada campo tem `label` associado e erro ligado por `aria-describedby`.
- Mensagens de status em região `role="status"`.
- Contraste de cores verificado e botões e campos com área de toque confortável.
- Respeito à preferência `prefers-reduced-motion`: com "reduzir movimento" ativado no sistema, o vídeo de fundo e as animações ficam desligados, e todo o conteúdo continua visível.
- Botão para pausar o vídeo de fundo.

## Testes realizados

- Testes manuais no Microsoft Edge, com larguras de 320 px a 1920 px e conferência de rolagem horizontal.
- Navegação por teclado do início ao fim da página.
- Validador de HTML do W3C: sem erros nem avisos.
- Lighthouse (Accessibility, Best Practices e SEO): sem pendências apontadas.
- Teste no celular, com o site publicado.

## Limitações conhecidas

- Sem JavaScript, o menu mobile não abre, o formulário não valida e o vídeo de fundo não carrega (os links de âncora continuam funcionando).
- O formulário não envia dados (veja acima).
- Com "reduzir movimento" ou economia de dados ativados, o vídeo de fundo não é carregado.
- O único arquivo de mídia é o vídeo decorativo do hero. Fora isso, o visual usa só CSS e SVG.

## Créditos

- Vídeo do hero: **[olia danilevich]** via **[Pexels]**, licença gratuita.

## Referência visual

O site [basicagency.com](https://www.basicagency.com/) foi usado apenas como inspiração de direção (estética minimalista, tipografia grande, espaço em branco). Nenhum código, texto, imagem ou layout foi copiado: a identidade visual, os textos e o código são originais.

## Como publicar (site estático)

O projeto pode ser publicado em qualquer hospedagem estática. No **GitHub Pages**:

1. Envie os arquivos para a **raiz** de um repositório público.
2. Em **Settings > Pages**, escolha *Deploy from a branch*, branch `main` e pasta `/ (root)`.
3. Aguarde um ou dois minutos e acesse o endereço mostrado na página.

## Autor

Luquinhas | [@claudiolc10](https://github.com/claudiolc10)
