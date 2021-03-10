const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const csv = require("json-2-csv");
const fs = require("fs");

const artilheirosCampeonatoBasileiro = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://globoesporte.globo.com/futebol/brasileirao-serie-a/"
  );

  const html = await page.content();

  const $ = cheerio.load(html);

  const jogadores = $(".ranking-item-wrapper");
  let artilheirosCampeonato = [];

  await jogadores.each(function () {
    const nomeJogador = $(this).find(".jogador-nome").text();
    const posicaoJogador = $(this).find(".jogador-posicao").text();
    const timeJogador = $(this).find(".jogador-escudo > img").attr("alt");
    const golsogador = $(this).find(".jogador-gols").text();

    artilheirosCampeonato.push({
      Jogador: nomeJogador,
      Time: timeJogador,
      Posicao: posicaoJogador,
      Gols: golsogador,
    });
  });

  await browser.close();

console.log(artilheirosCampeonato);
}

artilheirosCampeonatoBasileiro();