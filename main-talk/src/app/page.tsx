import HotDogMeter from "@/components/HotDogMeter";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type Sentiment = {
  id: number;
  value: "good" | "bad";
  created_at: string;
  user_id: string;
};

export default async function Home() {
  const supabase = createClient();
  const { count, data, error } = (await supabase
    .from("sentiment")
    .select("*" /* { count: "exact" } */)) as PostgrestSingleResponse<
    Sentiment[]
  >;

  if (error) {
    throw error;
  }

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-neutral-700 w-full max-w-[950px] rounded-md py-8 px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Hotdogs are best sandwitch</h1>
          <p className="text-lg text-neutral-600">
            how do you feel about that? ...
          </p>
        </div>
        <HotDogMeter sentiments={data} />
      </div>
    </main>
  );
}
