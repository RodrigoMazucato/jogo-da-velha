import { Botao } from "./components/Botao";
import { useState } from "react";
import { verificarVencedor, Grid } from "./regrasVencedor";
import styles from "./App.module.css";

export default function App() {
  const [ehRodadaX, setEhRodadaX] = useState(true);
  const [tabuleiro, setTabuleiro] = useState<Grid>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function atualizarValor(linha: number, coluna: number) {
    if (tabuleiro[linha][coluna] !== "") return;

    setTabuleiro((matriz) => {
      let novoTabuleiro = structuredClone(matriz);
      // Altenativa 1: matriz.map((linha) => [...linha]);
      // Alternativa 2: JSON.parse(JSON.stringify(matriz))
      novoTabuleiro[linha][coluna] = ehRodadaX ? "X" : "O";
      return novoTabuleiro;
    });
    setEhRodadaX(!ehRodadaX);
  }

  return (
    <div className={styles.container}>
      <h1>Jogo da Velha</h1>
      <p className={styles.rodada}>{ehRodadaX ? "Vez do X" : "Vez do O"}</p>
      <div className={styles.tabuleiro}>
        {tabuleiro.map((linha, linhaIndex) =>
          linha.map((coluna, colunaIndex) => (
            <Botao
              key={colunaIndex}
              opcao={coluna}
              marcar={() => atualizarValor(linhaIndex, colunaIndex)}
            />
          ))
        )}
      </div>
      <p>{verificarVencedor(tabuleiro)}</p>
    </div>
  );
}
