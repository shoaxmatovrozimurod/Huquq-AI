
import { supabase } from "@/lib/supabase";

export default async function TestConnection() {
  const { error } = await supabase.auth.getSession();

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-3xl font-bold">
        Supabase ulanish testi
      </h1>

      <p className="mt-6 text-xl">
        {error
          ? `Xatolik: ${error.message}`
          : "Supabase sozlamalari yuklandi. Sessiya tekshiruvi bajarildi."}
      </p>
    </main>
  );
}
