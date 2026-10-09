import { login } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    erro?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  const mensagem =
    params.erro === "credenciais"
      ? "E-mail ou senha inválidos."
      : params.erro === "preencha"
      ? "Preencha o e-mail e a senha."
      : null;

  return (
    <main className="min-h-screen bg-[#f4f6f8] flex items-center justify-center px-4">
      <div className="w-full max-w-[430px]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-2xl font-bold text-white shadow-sm">
            M
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">
            Movimenta
          </h1>

          <p className="mt-2 text-sm font-medium tracking-wide text-[#6b7280]">
            AGROBILL · SOLICITAÇÕES INTERNAS
          </p>
        </div>

        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-[#111827]">
              Acesse sua conta
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6b7280]">
              Use seu e-mail da empresa para continuar.
            </p>
          </div>

          {mensagem && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {mensagem}
            </div>
          )}

          <form action={login} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#374151]"
              >
                E-mail da empresa
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="seuemail@empresa.com.br"
                className="w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#374151]"
              >
                Senha
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Digite sua senha"
                className="w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#111827] px-4 py-3 font-semibold text-white transition hover:bg-[#1f2937]"
            >
              Continuar
            </button>
          </form>
        </section>

        <p className="mt-5 text-center text-xs text-[#9ca3af]">
          Acesso restrito a usuários autorizados.
        </p>
      </div>
    </main>
  );
}
