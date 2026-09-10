# Clínica Auravita

Demonstração comercial de clínica médica e estética fictícia, construída em React, TypeScript, Next.js App Router (Vinext) e Tailwind CSS. Todos os textos, nomes, retratos e dados são fictícios. Não há vínculo com a clínica usada como referência visual.

## Executar

Requer Node.js >=22.13.

```sh
npm run install:ci
npm run dev
npm run build
```

## Organização

- `app/`: página inicial, páginas institucionais e oito páginas de especialidades, metadados e estilos compartilhados.
- `components/auravita/site.tsx`: seções reutilizáveis, navegação, carrossel e fluxos demonstrativos.
- `components/ui/`: componentes acessíveis do starter, incluindo Dialog, Sheet e Select.
- `lib/auravita-data.ts`: conteúdo fictício centralizado.
- `public/images/`: imagens originais geradas para o projeto, convertidas em WebP, com retratos derivados da imagem de equipe.
- `public/fonts/`: Manrope, servida localmente; licença OFL incluída.

## Experiência

A página inicial preserva a ordem da referência: cabeçalho, hero com mosaico, carrossel de especialidades, avaliações, chamada final, blocos de contato e rodapé. Institucional, equipe, formulário, mapa fictício e FAQ ficam nas páginas correspondentes. No celular, o mosaico vira um carrossel controlável por toque e botões; o menu ocupa a tela inteira.

WhatsApp e agendamento são simulações locais. Nenhuma mensagem é enviada a números reais. Os formulários validam os campos e mostram uma confirmação demonstrativa. Não há backend, persistência de informações, rastreamento próprio ou credenciais. O host pode processar dados técnicos para operação. A página de privacidade descreve esse comportamento. A indexação está desativada por se tratar de uma demonstração fictícia.

## Referência e refinamento

Referência visual: https://dentista24horas.net.br/tratamentos-odontologicos/

Foram percorridas as 26 páginas ligadas à navegação principal, incluindo institucionais, tratamentos, cursos, contato e recrutamento. Observação de desktop e mobile antes da implementação. Nenhum código-fonte, imagem, logotipo, texto comercial ou depoimento da referência foi incorporado.

Direção observada: fundo próximo de #080a0b, painéis #0d0f10, Manrope com títulos leves, hero com cerca de 505px no desktop, contêiner amplo, mosaico assimétrico, cards escurecidos, contornos laterais nos botões, detalhes dourados, carrosséis e rodapé em colunas. A Auravita usa dourado #d7b85b e identidade geométrica própria.

Após a primeira comparação no navegador, foram refinados o alinhamento da navegação, as quebras de títulos, o recorte das imagens, a proporção mobile do hero, o bloco final e os retratos. Animações respeitam `prefers-reduced-motion`.

Verificação: 13 rotas em 390px e 1440px, um H1 por página, títulos próprios, ausência de overflow horizontal; página principal em 320/390/768/1024/1440/1920px. Testados menu móvel, carrossel, formulário com dados fictícios, seleção, validação obrigatória, confirmação, FAQ, WhatsApp demonstrativo e fechamento dos modais por Escape. Imagens abaixo da dobra carregam sob demanda.
