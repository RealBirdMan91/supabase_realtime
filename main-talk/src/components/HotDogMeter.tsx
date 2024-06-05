"use client";
import { Sentiment } from "@/app/page";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

type THotDogMeter = {
  sentiments: Sentiment[];
};

function HotDogMeter({ sentiments }: THotDogMeter) {
  const supabase = createClient();
  const [sentimentsData, setSentimentsData] = useState(sentiments);

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

    return () => supabase.removeChannel(sentimentChannel);
  }, []);

  const totalSentiments = sentiments.length || 0;
  const goodSentiments =
    sentiments.filter((sentiment) => sentiment.value === "good").length || 0;
  console.log("goodSentiments", goodSentiments);
  const badSentiments =
    sentiments.filter((sentiment) => sentiment.value === "bad").length || 0;
  console.log("badSentiments", badSentiments);

  let sentimentValue = 50;

  if (totalSentiments > 0) {
    // Calculate the deviation from the balanced start value
    const goodSentimentRatio = (goodSentiments / totalSentiments) * 50; // good sentiments contribute positively
    const badSentimentRatio = (badSentiments / totalSentiments) * 50; // bad sentiments contribute negatively

    // Adjust the sentiment value based on the good and bad sentiment ratios
    sentimentValue = 50 + goodSentimentRatio - badSentimentRatio;
  }
  console.log("sentimentValue", sentimentValue);

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
          min={0}
          max={100}
          value={sentimentValue}
          high={55}
          low={45}
          className="w-full"
        />
        <p>
          <span role="img" aria-label="Yum face">
            😋
          </span>
        </p>
      </div>
    </div>
  );
}

export default HotDogMeter;
