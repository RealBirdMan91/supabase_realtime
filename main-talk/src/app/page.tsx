import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-neutral-700 w-full max-w-[950px] rounded-md py-8 px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Hotdogs are best sandwitch</h1>
          <p className="text-lg text-neutral-600">
            how do you feel about that? ...
          </p>
        </div>
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
              value={50}
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
      </div>
    </main>
  );
}
