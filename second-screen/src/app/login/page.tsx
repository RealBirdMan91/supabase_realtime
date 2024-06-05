import { createClient } from "@/utils/supabase/server";
import { login } from "@/utils/actions/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/");
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <form className="flex flex-col bg-white w-full max-w-[450px] py-6 px-4 gap-6 rounded-md">
        <button
          formAction={login}
          className="bg-emerald-400 py-2 px-12 rounded-md text-center"
        >
          Log in to Github
        </button>
      </form>
    </main>
  );
}
