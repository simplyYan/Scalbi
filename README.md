A Scalbi é uma biblioteca dedicada ao monitoramento e melhoria de performance do servidor. A Scalbi usa a tecnologia CTMFS (Connection tree for multiple files simultaneously), desenvolvida exclusivamente para a Scalbi.

## 📦 Como instalar
Para instalar a Scalbi, você pode usar 'go get', veja como fazer:
go get git

## 📖 Documentação
Para acessar a documentação, você pode usar a ScalbiWiki, clicando aqui ou acessando:

## 🎯 Características Principais

- **Receber valores:** Com a Scalbi você pode obter dados de formulários de forma mais fácil e rápida.

- **Flexível:** A Scalbi pode ser usada com qualquer framework, como Echo, Fiber, Neo, Gin, e a padrão do Go.

- **Rápida:** Mais rápida, leve e eficaz que outros métodos.

- **Renderização Declarativa:** A Scalbi tem uma renderização declarativa extremamente fácil e eficaz.

- **Mais segura:** O código fonte da sua página fica menos visível e vulnerável.

## ⚡ Como funciona a CTMFS
A CTMFS recebe todos arquivos do seu servidor (que devem ser indicados por você) e cria uma rede única que pode carregar seu site todo de forma mais rápida em apenas um diretório/slug.
Por exemplo, suponhamos que você tenha 3 arquivos, chamados de: "home.html, login.html, about.html" nesse caso, você poderia criar uma instância no Go com a Scalbi indicando esses arquivos e você poderia acessar eles por exemplo assim: "http://localhost:3030/#home", da mesma forma com "#login" e "#about".
Dessa forma, o seu website/servidor carrega mais rápido e de forma mais flexível e segura.
