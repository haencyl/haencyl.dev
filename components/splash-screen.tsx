"use client";

import { useEffect, useState } from "react";

const TEXT = "haencyl.dev";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [stage, setStage] = useState<
    "entering" | "waiting" | "exiting" | "done"
  >("entering");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("waiting"), TEXT.length * 80 + 80);
    const t2 = setTimeout(
      () => setStage("exiting"),
      TEXT.length * 80 + 80 + 200,
    );
    const t3 = setTimeout(
      () => {
        setStage("done");
        onComplete();
      },
      TEXT.length * 80 + 300 + 200,
    );

    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  if (stage === "done") return null;

  return (
    <>
      <style>{`
        @keyframes letterRotate {
          0% { opacity: 0; transform: rotate(var(--rotate-dir, -90deg)) scale(0.3); }
          100% { opacity: 1; transform: rotate(0) scale(1); }
        }
        @keyframes splashExit {
          0% { opacity: 1; transform: scale(1); filter: blur(0); }
          100% { opacity: 0; transform: scale(1.04); filter: blur(6px); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        style={{
          animation:
            stage === "exiting"
              ? "splashExit 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards"
              : undefined,
        }}
      >
        <h1
          className="text-4xl md:text-7xl tracking-[0.2em]"
          style={{ display: "flex", alignItems: "center" }}
        >
          {TEXT.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                animation: `letterRotate 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${i * 80}ms`,
                ["--rotate-dir" as string]: `${Math.random() > 0.5 ? 90 : -90}deg`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </>
  );
}
