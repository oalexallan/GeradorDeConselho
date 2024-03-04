# Gerador de Conselho

## Sobre o Projeto

Este projeto começou como um desafio simples do Frontend Mentor, usando HTML, CSS e JavaScript. Com o tempo, evoluiu para incorporar várias APIs e tecnologias, sempre com o objetivo de melhorar a experiência do usuário e tornar o gerador de conselhos mais eficiente e fácil de usar.

## Desafios e Soluções

Inicialmente, o projeto utilizava a API do Advice Slip para gerar conselhos e a API de tradução da Microsoft Azure para traduzir os conselhos para português. No entanto, essas APIs apresentaram alguns desafios. A API do Advice Slip só gerava conselhos em inglês e demorava muito para responder, enquanto a API de tradução era muito cara para manter.

Para superar esses desafios, decidi parar de usar essas APIs e procurar outras soluções. Experimentei usar o Node.js, mas se tornou muito burocrático. Também usei o GitHub Actions e o Secrets no meu projeto, mas queria simplificar ainda mais.

Finalmente, encontrei a API do Pensador, que usei para criar meus conselhos. Depois, usei scripts.js para manipular e criar os conselhos em inglês e em português, deixando todos os conselhos dentro do script.js. Isso tornou o gerador de conselhos mais rápido e fácil de usar.

## Objetivo

O objetivo deste projeto era criar um gerador de conselhos que fosse leve e fácil de usar, com a capacidade de fornecer conselhos em duas línguas, português e inglês.

## Ferramentas Utilizadas

- HTML
- CSS
- JavaScript
- API do Pensador
- GitHub Actions
- GitHub Secrets

## Como Usar

Para usar o gerador de conselhos, basta acessar o site e clicar no botão "Gerar Conselho". O conselho será exibido na tela em inglês e português.

## Código

O código para este projeto está disponível no GitHub. Sinta-se à vontade para explorar e contribuir!

### Design Mobile
<img src= "./Design/Design-mobile.png">

### Design Desktop 
<img src="./Design/Design-desktop.png">


### Obrigado por usar o gerador de conselho!
