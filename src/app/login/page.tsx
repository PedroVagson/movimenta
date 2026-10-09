import { cookies } from "next/headers";
import { login, useAnotherEmail } from "./actions";
import styles from "./login.module.css";

type LoginPageProps = {
  searchParams: Promise<{
    erro?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();

  const emailSalvo =
    cookieStore.get("movimenta_last_email")?.value ?? "";

  const mensagem =
    params.erro === "credenciais"
      ? "E-mail ou senha inválidos."
      : params.erro === "preencha"
      ? "Preencha os campos para continuar."
      : params.erro === "semacesso"
      ? "Seu usuário não possui acesso ao Movimenta."
      : null;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.logoArea}>
          <svg
            className={styles.logo}
            viewBox="0 0 38 38"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 4 4.5 11.5 19 19l14.5-7.5L19 4Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 18 19 25.5 33.5 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 25 19 32.5 33.5 25"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className={styles.brand}>movimenta</h1>
        </div>

        <p className={styles.subtitle}>
          AGROBILL · SOLICITAÇÕES INTERNAS
        </p>

        <h2 className={styles.title}>
          Bem-vindo de volta
        </h2>

        {emailSalvo ? (
          <p className={styles.savedEmail}>
            {emailSalvo}
          </p>
        ) : (
          <p className={styles.helper}>
            Entre com seu e-mail e senha para continuar.
          </p>
        )}

        {mensagem && (
          <div className={styles.error}>
            {mensagem}
          </div>
        )}

        <form action={login} className={styles.form}>
          {!emailSalvo && (
            <div className={styles.field}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seuemail@empresa.com.br"
                className={styles.input}
              />
            </div>
          )}

          {emailSalvo && (
            <input
              type="hidden"
              name="email"
              value={emailSalvo}
            />
          )}

          <div className={styles.field}>
            <label
              htmlFor="password"
              className={styles.label}
            >
              🔒 Senha
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Digite sua senha"
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
          >
            Entrar →
          </button>
        </form>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.linkButton}
          >
            Esqueci minha senha
          </button>

          <button
            type="button"
            className={styles.linkButton}
          >
            Primeiro acesso
          </button>

          {emailSalvo && (
            <form action={useAnotherEmail}>
              <button
                type="submit"
                className={styles.linkButton}
              >
                Usar outro e-mail
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}