"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const EMAIL_COOKIE = "movimenta_last_email";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/login?erro=preencha");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    redirect("/login?erro=credenciais");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("ativo")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile?.ativo) {
    await supabase.auth.signOut();
    redirect("/login?erro=semacesso");
  }

  const cookieStore = await cookies();

  cookieStore.set(EMAIL_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/painel");
}

export async function useAnotherEmail() {
  const cookieStore = await cookies();
  cookieStore.delete(EMAIL_COOKIE);
  redirect("/login");
}