"use client";
import { Sentiment } from "@/app/page";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useMemo, useState } from "react";

type THotDogMeter = {
  sentiments: Sentiment[];
};

function HotDogMeter({ sentiments }: THotDogMeter) {
  const supabase = createClient();

  const [sentimentsData, setSentimentsData] = useState(sentiments);

  const minVal = 0;
  const maxVal = 100;
  const startValue = 50;

  const calculateSentimentValue = (goodCount: number, badCount: number) => {
    const total = goodCount + badCount;
    if (total <= 0) {
      return startValue;
    }
    const goodRatio = goodCount / total;
    return minVal + (maxVal - minVal) * goodRatio;
  };

  const sentimentValue = useMemo(() => {
    const goodSentiments = sentimentsData.filter(
      (s) => s.value === "good"
    ).length;
    const badSentiments = sentimentsData.filter(
      (s) => s.value === "bad"
    ).length;
    return calculateSentimentValue(goodSentiments, badSentiments);
  }, [sentimentsData]);

  useEffect(() => {
    const sentimentChannel = supabase
      .channel("sentiment-follow-up")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sentiment",
        },

        (payload) => {
          const subscribedSentiments = payload.new as Sentiment;
          setSentimentsData((prevSentiments) => [
            ...prevSentiments,
            subscribedSentiments,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sentimentChannel);
    };
  }, [supabase]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">How the audience is feeling</h2>
      <div className="flex items-center gap-4">
        <p>
          <span role="img" aria-label="Angry face">
            😡
          </span>
        </p>
        <label htmlFor="sentiment" className="hidden">
          Current sentiment
        </label>
        <meter
          id="sentiment"
          min={minVal}
          max={maxVal}
          value={sentimentValue}
          className="w-full"
        />
        <p>
          <span role="img" aria-label="Yum face">
            😋
          </span>
        </p>
      </div>
      <h2 className="font-semibold">
        Number of Total Votes {sentimentsData.length}
      </h2>
    </div>
  );
}

export default HotDogMeter;
