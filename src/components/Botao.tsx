import styles from "./Botao.module.css";

interface BotaoProps {
  opcao: string;
  marcar?: () => void;
}

export function Botao({ opcao, marcar }: BotaoProps) {
  return (
    <button className={styles.botao} onClick={marcar}>
      {opcao}
    </button>
  );
}
