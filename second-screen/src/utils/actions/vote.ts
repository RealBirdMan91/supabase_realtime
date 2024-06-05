"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function createVote(vote: "good" | "bad") {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase.from("sentiment").insert({
    value: vote,
    user_id: userData.user.id,
  });

  if (error) {
    console.error("Error inserting vote", error);
  }
  return data;
}
