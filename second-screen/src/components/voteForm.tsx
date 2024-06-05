"use client";

import { createVote } from "@/utils/actions/vote";

function VoteForm() {
  return (
    <div className="flex  gap-4">
      <button
        className="p-2 border border-neutral-200 rounded-lg hover:bg-green-500"
        onClick={() => createVote("good")}
      >
        <span role="img" aria-label="Yum face">
          😋
        </span>
      </button>
      <button
        className="p-2 border border-neutral-200 rounded-lg hover:bg-red-500"
        onClick={() => createVote("bad")}
      >
        <span role="img" aria-label="Angry face">
          😡
        </span>
      </button>
    </div>
  );
}

export default VoteForm;
