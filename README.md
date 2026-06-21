# Studio Mary Saboya — Site Oficial

Site institucional para o Studio Mary Saboya (salão de beleza), feito como presente. Este documento é o passo a passo **completo**, do zero até o site no ar com domínio próprio — escrito para quem nunca fez isso antes.

---

## O que já está pronto

- `index.html` — a página toda (uma página só, com seções: Início, Sobre, Serviços, Trabalhos, Localização, Agendamento)
- `css/style.css` — todo o visual (cores, tipografia, layout, responsividade)
- `js/script.js` — menu mobile, header que muda ao rolar, animações de entrada
- `assets/logo.svg`, `assets/logo-dark.svg`, `assets/favicon.svg` — a logo nova, em formato vetorial (não perde qualidade em nenhum tamanho)

**Não precisa instalar nada para rodar.** É um site estático puro (HTML/CSS/JS) — sem build, sem Node, sem dependências. Para testar agora mesmo, basta abrir o arquivo `index.html` duas vezes clicando nele no seu computador.

### O que falta ajustar antes de divulgar (importante)

Eu não consegui acessar o Instagram (`@studiomarysaboya`) nem a página do Tua Agenda diretamente — o Instagram bloqueia acesso automático e o link do Tua Agenda não abriu para leitura. Por isso, os textos abaixo foram escritos com conteúdo realista de salão, mas **precisam ser confirmados ou trocados pela Mary**:

1. **Preços e serviços** (seção "Serviços") — coloquei valores de referência de mercado. Troque pelos preços reais dela. Estão marcados com `a partir de` e há um aviso no rodapé da seção.
2. **Texto "Sobre"** — escrevi um texto genérico e calorosos sobre o studio. Vale a pena reescrever com a história real dela (quantos anos de profissão, especialidades, etc).
3. **Fotos** — propositalmente deixei a seção "Trabalhos" e a foto do "Sobre" como blocos decorativos (sem foto), em vez de usar fotos de bancos de imagem genéricos. A ideia é exatamente a que você mencionou: depois que a Mary te passar fotos originais dela e do studio, é só substituir — expliquei como logo abaixo, em "Como trocar as fotos".
4. **Telefone/WhatsApp**: já configurado com `(81) 99885-7442`.
5. **Endereço**: já configurado com `R. Nova Descoberta, 302 - Nova Descoberta, Recife - PE, 52090-003`, incluindo o mapa do Google embutido.
6. **Link de agendamento**: já aponta para `https://client.tuaagenda.com/c/StudioMarySaboya`.

### Como trocar as fotos

No arquivo `index.html`, procure os comentários `<!-- Placeholder ... -->`. São dois lugares:

- Seção "Sobre" (`id="sobre"`): troque o `<svg class="ring">` por `<img src="images/mary-retrato.jpg" alt="Mary Saboya no studio">`
- Seção "Trabalhos" (`id="trabalhos"`): dentro de cada `<div class="gallery-tile">`, adicione `<img src="images/foto1.jpg" alt="descrição da foto">` antes do `<span class="tag">`

Salve as fotos da Mary dentro da pasta `images/` (já existe, vazia) com nomes simples sem espaço ou acento (ex: `corte-1.jpg`).

---

## Passo a passo: do zero até o site no ar

### Pré-requisitos

- Uma conta no [GitHub](https://github.com) (gratuita)
- Uma conta no [Netlify](https://netlify.com) (gratuita — dá para entrar direto com a conta do GitHub)
- Git instalado no computador ([git-scm.com](https://git-scm.com/downloads)) — para verificar se já tem, abra o terminal e digite `git --version`

### Passo 1 — Criar o repositório no GitHub

1. Entre em [github.com/new](https://github.com/new)
2. Nome do repositório: `studio-mary-saboya`
3. Deixe como **Public** (necessário para o plano gratuito do GitHub Pages, e não tem problema nenhum o código ser público — é só HTML/CSS, sem senhas)
4. **Não** marque para criar README, .gitignore ou licença (já temos os arquivos)
5. Clique em **Create repository**

A próxima tela mostra comandos. Abra o terminal **na pasta do projeto** (`studio-mary-saboya`, a que contém o `index.html`) e rode:

```bash
git init
git add .
git commit -m "Primeira versão do site"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/studio-mary-saboya.git
git push -u origin main
```

(troque `SEU-USUARIO` pelo seu usuário do GitHub — o GitHub mostra o comando exato certinho na tela depois de criar o repositório, é só copiar de lá)

### Passo 2 — Publicar o site (Netlify)

Recomendo o **Netlify** em vez do GitHub Pages porque o processo de conectar um domínio próprio é mais simples e o HTTPS (cadeado de segurança) é automático.

1. Entre em [app.netlify.com](https://app.netlify.com) e faça login com sua conta do GitHub
2. Clique em **Add new site → Import an existing project**
3. Escolha **GitHub** e autorize o acesso
4. Selecione o repositório `studio-mary-saboya`
5. Configurações de build: deixe **tudo em branco** (não tem build — é HTML puro). Clique em **Deploy site**

Em menos de um minuto o Netlify te dá um link tipo `nome-aleatorio.netlify.app` — o site já está no ar nesse momento, só falta o domínio bonito.

> **Alternativa mais simples (sem GitHub):** no mesmo painel do Netlify existe uma área de "deploy manual" onde você arrasta a pasta do projeto direto do computador para o navegador. Funciona, mas você perde a praticidade de atualizar o site só dando `git push` depois. Para presentear a Mary com algo que ela (ou você) consiga manter fácil no futuro, vale mais a pena pelo GitHub.

### Passo 3 — Comprar o domínio

Para um negócio em Recife, duas boas opções:

- **`.com.br`** via [registro.br](https://registro.br) — é o registrador oficial brasileiro, mais barato (~R$ 40/ano) e passa mais confiança local. Sugestão: `studiomarysaboya.com.br`
- **`.com`** via [Namecheap](https://namecheap.com) ou [GoDaddy](https://godaddy.com) — mais internacional, ~US$ 10–15/ano. Sugestão: `studiomarysaboya.com`

Qualquer um funciona perfeitamente com o Netlify. Compre o nome que estiver disponível e fizer mais sentido pra Mary divulgar no Instagram.

### Passo 4 — Conectar o domínio ao site

1. No painel do Netlify, abra o site → **Domain settings → Add a domain**
2. Digite o domínio que você comprou (ex: `studiomarysaboya.com.br`) e confirme
3. O Netlify mostra os registros de DNS que você precisa cadastrar no painel do seu registrador (registro.br, Namecheap, etc). Geralmente são:
   - Um registro **A** apontando para o IP do Netlify (`75.2.60.5`)
   - Um registro **CNAME** para `www` apontando para o endereço `.netlify.app` do seu site
4. Entre no painel DNS do registrador onde comprou o domínio, adicione exatamente esses registros (cada registrador tem uma tela um pouco diferente, mas o conceito é o mesmo — o Netlify explica isso na própria tela com instruções específicas para o seu domínio)
5. Aguarde a propagação do DNS (pode levar de alguns minutos até 24h, geralmente é rápido)
6. O Netlify ativa o **HTTPS automaticamente** assim que o domínio for reconhecido (certificado SSL grátis via Let's Encrypt) — não precisa fazer nada além de esperar

### Passo 5 — Entregar o site para a Mary

Quando estiver tudo pronto, duas formas de entregar:

- **Mais simples:** te associa Mary, é só dar a ela o link do site (com domínio próprio) e o link do Instagram para ela conferir, sem precisar dar acesso a nada técnico.
- **Se ela quiser poder editar/manter no futuro:** adicione o e-mail dela como colaboradora no repositório do GitHub (`Settings → Collaborators`) e como membro do site no Netlify (`Site settings → Members`). Assim, se um dia ela quiser trocar uma foto ou um preço (ou contratar alguém para isso), o acesso já está com ela.

---

## Atualizando o site depois de publicado

Sempre que quiser mudar algo (preço, texto, foto):

1. Edite o arquivo localmente (`index.html`, `css/style.css`, etc.)
2. No terminal, dentro da pasta do projeto:
   ```bash
   git add .
   git commit -m "Atualiza preços dos serviços"
   git push
   ```
3. O Netlify detecta o `push` automaticamente e publica a nova versão em menos de um minuto — sem precisar repetir nenhum passo de configuração.

---

## Sobre o conceito visual

A paleta e o conceito ("hora dourada") nasceram de uma referência bem de Recife: o tom quente do pôr do sol sobre o Capibaribe combinado com o azul dos azulejos coloniais do Recife Antigo/Olinda — e ambos conversam com o universo do cabelo (luz dourada, reflexos, coloração). O elemento de assinatura do site é o cardápio de serviços desenhado como uma **comanda de salão** (aquele tíquete picotado que toda cliente reconhece), com preços em fonte mono — uma forma de trazer um detalhe bem específico do dia a dia de salão para dentro do design, em vez de um cardápio genérico.

Tipografia: **Fraunces** (serifada, com personalidade) para títulos + **Work Sans** para textos + **Space Mono** para preços/detalhes — carregadas via Google Fonts (não precisa instalar nada, carrega sozinho quando o site é aberto com internet).
