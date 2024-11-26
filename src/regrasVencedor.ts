/**
 * Verifica se há um vencedor ou um empate no jogo.
 * @param tabuleiro - O estado atual do tabuleiro.
 * @returns String com o resultado do jogo.
 */

export type Grid = string[][];

export function verificarVencedor(tabuleiro: Grid): string | undefined {
  // Verificar linhas
  for (const linha of tabuleiro) {
    if (linha.every((coluna) => coluna === "X")) return "Vitória do X! 🏆";
    if (linha.every((coluna) => coluna === "O")) return "Vitória do O! 🏆";
  }

  // Verificar colunas
  for (let i = 0; i < 3; i++) {
    if (tabuleiro.every((linha) => linha[i] === "X")) return "Vitória do X! 🏆";
    if (tabuleiro.every((linha) => linha[i] === "O")) return "Vitória do O! 🏆";
  }

  // Verificar diagonais
  if (tabuleiro[1][1] !== "") {
    if (
      (tabuleiro[0][0] === tabuleiro[1][1] &&
        tabuleiro[1][1] === tabuleiro[2][2]) ||
      (tabuleiro[0][2] === tabuleiro[1][1] &&
        tabuleiro[1][1] === tabuleiro[2][0])
    ) {
      return `Vitória do ${tabuleiro[1][1]}! 🏆`;
    }
  }

  // Verificar empate (velha)
  if (tabuleiro.every((linha) => linha.every((coluna) => coluna !== ""))) {
    return "Velha!";
  }
}
