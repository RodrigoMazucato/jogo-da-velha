import { Botao } from "./components/Botao";
import { useState } from "react";
import styles from "./App.module.css";

type Grid = string[][];

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

  function vencerPartida() {
    // Verificar linhas iguais
    for (let i = 0; i < 3; i++) {
      if (tabuleiro.every((linha) => linha[i] == "X"))
        return "Vitória do X! 🏆";
      if (tabuleiro.every((linha) => linha[i] == "O"))
        return "Vitória do O! 🏆";
    }

    // Verificar colunas iguais
    for (const linha of tabuleiro) {
      if (linha.every((coluna) => coluna == "X")) return "Vitória do X! 🏆";
      if (linha.every((coluna) => coluna == "O")) return "Vitória do O! 🏆";
    }

    // Verificar diagonais
    if (tabuleiro[1][1] !== "") {
      if (
        (tabuleiro[0][0] === tabuleiro[1][1] &&
          tabuleiro[1][1] === tabuleiro[2][2]) ||
        (tabuleiro[0][2] === tabuleiro[1][1] &&
          tabuleiro[1][1] === tabuleiro[2][0])
      ) {
        return `Vitória do ${tabuleiro[1][1]} 🏆!`;
      }
    }

    // Verificar velha

    if (tabuleiro.every((linha) => linha.every((coluna) => coluna != ""))) {
      return "Velha!";
    }
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
      <p>{vencerPartida()}</p>
    </div>
  );
}
