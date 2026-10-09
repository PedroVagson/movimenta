import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PainelPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("nome, email, setor, cargo, role")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Movimenta</h1>
            <p className="text-xs text-[#6b7280]">
              AGROBILL · SOLICITAÇÕES INTERNAS
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-[#111827]">
              {profile?.nome ?? user.email}
            </p>
            <p className="text-xs text-[#6b7280]">
              {profile?.role ?? "usuário"}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-2xl font-bold text-[#111827]">
          Bem-vindo ao Movimenta
        </h2>

        <p className="mt-2 text-[#6b7280]">
          Seu acesso está funcionando corretamente.
        </p>
      </div>
    </main>
  );
}
