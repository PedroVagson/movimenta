import { cookies } from "next/headers";
import { login, useAnotherEmail } from "./actions";

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
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#203653_0%,_#111923_45%,_#090d12_100%)] px-4 py-10">
      <section className="w-full max-w-[575px] rounded-[24px] border border-[#3a475a] bg-[#191f29] px-8 py-10 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:px-12 sm:py-12">
        
        <div className="mb-10 flex items-center gap-4">
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 4 4.5 11.5 19 19l14.5-7.5L19 4Z"
              stroke="#62A9FA"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 18 19 25.5 33.5 18"
              stroke="#62A9FA"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 25 19 32.5 33.5 25"
              stroke="#62A9FA"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="text-[34px] font-bold tracking-tight text-white">
            movimenta
          </h1>
        </div>

        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#9AB4DA]">
          AGROBILL · SOLICITAÇÕES INTERNAS
        </p>

        <h2 className="text-[34px] font-normal leading-tight text-white">
          Bem-vindo de volta
        </h2>

        {emailSalvo ? (
          <p className="mb-9 mt-4 text-lg text-[#A7C9FB]">
            {emailSalvo}
          </p>
        ) : (
          <p className="mb-8 mt-4 text-base text-[#A7C9FB]">
            Entre com seu e-mail e senha para continuar.
          </p>
        )}

        {mensagem && (
          <div className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {mensagem}
          </div>
        )}

        <form action={login} className="space-y-6">
          {emailSalvo ? (
            <input
              type="hidden"
              name="email"
              value={emailSalvo}
            />
          ) : (
            <div>
              <label
                htmlFor="email"
                className="mb-3 block font-semibold text-[#E5ECF7]"
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
                className="h-[58px] w-full rounded-lg border border-[#3A485B] bg-[#242B35] px-4 text-base text-white outline-none transition focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 placeholder:text-[#7F91AA]"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="mb-3 flex items-center gap-2 font-semibold text-[#E5ECF7]"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>

              Senha
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Digite sua senha"
              className="h-[58px] w-full rounded-lg border border-[#3A485B] bg-[#242B35] px-4 text-base text-white outline-none transition focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 placeholder:text-[#7F91AA]"
            />
          </div>

          <button
            type="submit"
            className="group flex h-[60px] w-full items-center justify-center gap-3 rounded-lg bg-[#3388EA] text-lg font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-[2px] hover:bg-[#4597F5] hover:shadow-xl active:translate-y-0 active:scale-[0.99]"
          >
            Entrar

            <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-[#72AEFF]">
          <button
            type="button"
            className="transition hover:text-white"
          >
            Esqueci minha senha
          </button>

          <button
            type="button"
            className="transition hover:text-white"
          >
            Primeiro acesso
          </button>

          {emailSalvo && (
            <form action={useAnotherEmail}>
              <button
                type="submit"
                className="transition hover:text-white"
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