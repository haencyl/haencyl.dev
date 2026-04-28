"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HouseSimpleIcon } from "@phosphor-icons/react";
import Dither from "@/components/Dither";

export default function NotFound() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Dither
          waveColor={[0.4, 0.0, 0.1]}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={6}
          waveAmplitude={0.35}
          waveFrequency={2.5}
          waveSpeed={0.02}
        />
      </div>
      <div
        className="fixed inset-0 bg-background/60 -z-10"
        aria-hidden="true"
      />
      <div className="min-h-screen flex flex-col">
        <header className="w-full max-w-5xl mx-auto px-4 py-6 flex items-center justify-between" />
        <main className="flex-1 flex items-center justify-center px-4">
          <section className="text-center space-y-6 backdrop-blur-xl bg-black/40 p-12 rounded-2xl border border-white/10">
            <h1 className="text-4xl font-bold tracking-tight">
              404 - Not Found
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
            <div className="flex justify-center gap-2">
              <Button
                asChild
                variant="outline"
                className="backdrop-blur-xl bg-black/40 border-white/20 hover:bg-white/10 hover:border-white/30"
              >
                <Link href="/">
                  <HouseSimpleIcon size={26} className="mr-2" />
                  Return Home
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
