# Teste Econverse

Página de e-commerce desenvolvida com React, TypeScript e Sass, sem biblioteca de componentes UI. A vitrine consulta o JSON fornecido no enunciado e abre um modal com os dados do produto selecionado.

## Requisitos

- Node.js 22.12 ou superior
- pnpm 10 ou superior (ou npm)

## Rodar localmente

```bash
git clone https://github.com/davipatrocinio09/teste-econverse.git
cd teste-econverse
pnpm install
pnpm dev
```

Abra o endereço exibido no terminal, normalmente `http://127.0.0.1:5173`.

Com npm, use `npm install` e `npm run dev`.

## Compilar e testar

```bash
pnpm test
pnpm build
pnpm preview
```

O build verifica os tipos e gera os arquivos de produção em `dist/`. O preview serve essa versão localmente em `http://127.0.0.1:4173`. Com npm, os comandos equivalentes são `npm test`, `npm run build` e `npm run preview`.

Para produção, execute `pnpm build` e `pnpm start` em uma hospedagem com Node.js. As variáveis `HOST` e `PORT` configuram o servidor; o padrão local é `127.0.0.1:4173`. Em uma hospedagem externa, defina `HOST=0.0.0.0` e a porta indicada pelo provedor.

## Funcionalidades

- Carregamento dos produtos com estados de espera, erro e nova tentativa.
- Busca por nome e navegação horizontal na vitrine.
- Modal com foto, nome, descrição, preço e seletor de quantidade.
- Fechamento por botão, tecla Escape ou clique fora do modal, com foco e rolagem restaurados.
- Carrinho demonstrativo com quantidade, total e remoção de itens.
- Layout adaptável a desktop e celular, HTML semântico e metadados de SEO.

Os preços são exibidos em reais conforme o número recebido no JSON. Não são gerados descontos ou preços anteriores que não existem na fonte. O JSON contém apenas celulares; as outras categorias exibem uma mensagem de lista vazia.

## Organização

```text
public/           Imagens, fontes e ícone
src/
  components/     Componentes da página e do modal
  hooks/          Carregamento dos produtos
  services/       Consulta e validação da resposta
  styles/         Estilos Sass e ajustes responsivos
  test/           Configuração dos testes
  types/          Tipos dos produtos e carrinho
  utils/          Formatação de moeda
```

## Dados e referências

- [Layout no Figma](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1), aba **Antigo**, correspondente à vitrine rosa do enunciado.
- [Referência da vitrine](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png).
- [JSON dos produtos](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json).

Durante o desenvolvimento, o Vite encaminha `/api/products` para a URL original para evitar restrições de CORS. Na versão de produção, `server.mjs` serve o build e encaminha a mesma rota para a Econverse, com tempo limite de 12 segundos e cache de um minuto. A consulta continua dependendo da disponibilidade do servidor original. A hospedagem precisa executar o servidor Node; apenas publicar a pasta `dist/` em um serviço estático não fornece essa rota.

As fotos dos produtos vêm do JSON. As imagens de banner e parceiros são provisórias do Unsplash e devem ser substituídas pelas exportações do Figma para concluir a fidelidade visual. Os ícones foram desenhados em SVG. A fonte Poppins é distribuída sob a licença SIL Open Font License, incluída em `public/fonts/OFL.txt`.

O carrinho funciona em memória e é reiniciado ao recarregar a página. Login, favoritos, links institucionais e newsletter representam a interface do layout; não há checkout, autenticação ou envio de cadastro para um servidor.

## Testes

Os testes verificam a validação do JSON, as falhas de rede, os dados exibidos no modal, a quantidade enviada ao carrinho e o fechamento da janela.
