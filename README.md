# constelacao-1-ano

Site de aniversário de namoro: uma página única, sem build, que roda direto no navegador.

## O que tem aqui

- **Hero** com contador ao vivo de dias/horas/minutos e contagem regressiva para a data comemorada.
- **Capítulos**: marcos da história com foto, data e frase, revelados por scroll.
- **Constelação "S ♥ A"**: 18 estrelas que se acendem conforme o scroll, formando a figura no céu.
- **A lua daquela noite**: fase lunar real da data inicial, calculada offline (ciclo sinódico) e desenhada em canvas.
- **Números do amor**: dias, horas e minutos calculados a partir da data de início.
- **Cinema**: abertura, créditos, cena extra (pós-créditos) e o "segure o coração" que revela a carta.
- **Painel pós-filme**: recado, galeria com scroll e certificado.

## Estrutura

```
index.html        estrutura e seções
style.css         estilos (tema noite romântica: rosa / violeta / dourado)
app.js            CONFIG no topo (datas, fotos, frases, figura da constelação)
img/              fotos usadas + trilha sonora
favicon.svg       ícone do site
manifest.webmanifest
```

## Personalizar

Tudo o que é conteúdo fica no bloco `CONFIG` do `app.js`:

```js
const CONFIG = {
    dataInicio: new Date("2025-10-23T00:00:00-03:00"),
    dataAniversario: new Date("2026-10-23T00:00:00-03:00"),
    musica: "img/musica.mp3",
    marcos: [ /* foto, data, frase, cor */ ],
    recado: "...",
    figura: { tracos: [ /* a figura da constelação */ ] },
    posCreditos: { titulo: "cena extra", texto: "...", imagem: "" },
    galeria: [ /* foto + legenda */ ]
};
```

## Rodar localmente

```bash
python3 -m http.server 8000 --bind 0.0.0.0 --directory .
```

## Publicação

GitHub Pages a partir da branch `main` (raiz do repositório).
O site usa apenas caminhos relativos, então funciona em subpasta.

## Privacidade

O site tem `noindex` para não ser indexado por buscadores. Ainda assim, o
repositório é público: qualquer pessoa com o endereço pode ver as fotos.
