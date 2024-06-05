import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-neutral-700 w-full max-w-[950px] rounded-md py-8 px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">
            Welcome {data.user.user_metadata.preferred_username}
          </h1>
          <p className="text-lg text-neutral-600">
            How do you feel about that nonsense?
          </p>
        </div>
        <div className="flex  gap-4">
          <button className="p-2 border border-neutral-200 rounded-lg hover:bg-green-500">
            <span role="img" aria-label="Yum face">
              😋
            </span>
          </button>
          <button className="p-2 border border-neutral-200 rounded-lg hover:bg-red-500">
            <span role="img" aria-label="Angry face">
              😡
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
