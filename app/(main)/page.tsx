"use client";

import * as React from "react";
import { ViewTransition } from "@/lib/view-transition";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import Dither from "@/components/Dither";

const projects = [
  {
    title: "discord-rs-example",
    repoUrl: "https://github.com/haencyl/discord-rs-example",
    description: "Example Discord Bot written in Rust",
  },
  {
    title: "discord.js-v14-example",
    repoUrl: "https://github.com/haencyl/discord.js-v14-example",
    description: "Example Discord Bot written in JS",
  },
  {
    title: "haencyl.dev",
    url: "haencyl.dev",
    repoUrl: "https://github.com/haencyl/haencyl.dev",
    description: "This website",
  },
];

const links = [
  { label: "github", href: "https://github.com/haencyl" },
  { label: "steam", href: "https://steamcommunity.com/id/haencyl" },
  { label: "discord", href: "https://discord.com/users/708822603569299484" },
  { label: "email", href: "mailto:me@haencyl.dev" },
];

export default function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const [barStyle, setBarStyle] = React.useState<{
    top: number;
    height: number;
  }>({ top: 0, height: 0 });

  React.useEffect(() => {
    if (hoveredIndex === null || !listRef.current) return;
    const item = itemRefs.current[hoveredIndex];
    if (!item) return;
    const listRect = listRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setBarStyle({
      top: itemRect.top - listRect.top,
      height: itemRect.height,
    });
  }, [hoveredIndex]);

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
          waveColor={[0.3, 0.2, 0.6]}
          enableMouseInteraction={false}
          colorNum={9.1}
          waveAmplitude={0.31}
          waveFrequency={2.5}
          waveSpeed={0.02}
        />
      </div>

      <div className="fixed inset-0 bg-halftone -z-10" aria-hidden="true" />
      <div
        className="fixed inset-0 bg-background/80 -z-10"
        aria-hidden="true"
      />
      <div className="h-dvh flex flex-col text-foreground px-6 pt-16 pb-6 overflow-hidden">
        <main className="max-w-2xl w-full mx-auto flex flex-col min-h-0 flex-1">
          <header className="space-y-6 shrink-0 pb-14">
            <div className="flex items-center gap-4 group">
              <Avatar className="size-16 rounded-none grayscale [&]:rounded-none [&_*]:rounded-none after:rounded-none after:border-0">
                <AvatarImage
                  src="https://github.com/haencyl.png"
                  alt="haencyl"
                />
                <AvatarFallback>haencyl</AvatarFallback>
              </Avatar>
              <h1 className="text-4xl font-semibold tracking-tight h-[1.2em] overflow-hidden relative">
                <span className="inline-block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                  haencyl
                </span>
                <span className="inline-block -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out absolute left-0">
                  greg
                </span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Hobby developer and gaming enthusiast since thinking was invented.
            </p>
            <nav className="flex flex-wrap gap-x-5 gap-y-1 text-base">
              {links.map((link) => (
                <ViewTransition key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex items-center gap-1 hover:underline underline-offset-4 transition-all duration-200 hover:text-primary/80"
                  >
                    {link.label} <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </a>
                </ViewTransition>
              ))}
            </nav>
          </header>

          <section className="flex flex-col min-h-0 flex-1">
            <h2 className="text-lg font-medium text-foreground/80 shrink-0 pb-6">
              projects
            </h2>
            <div
              className="overflow-y-auto scroll-smooth min-h-0 flex-1 pr-2"
              style={{ scrollSnapType: "y mandatory" }}
            >
              <div className="relative">
                <ul ref={listRef} className="flex flex-col gap-4 pb-2">
                  {projects.map((project, i) => (
                    <li
                      key={project.title}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      className="group"
                      style={{
                        viewTransitionName: `project-${i}`,
                        scrollSnapAlign: "start",
                      }}
                    >
                      <div
                        className="relative p-4 rounded-lg border border-border/60 hover:border-border transition-all duration-200 backdrop-blur-xl bg-black/50"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            {project.url || project.repoUrl ? (
                              <a
                                href={
                                  project.url
                                    ? project.url.startsWith("http")
                                      ? project.url
                                      : `https://${project.url}`
                                    : project.repoUrl!
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium hover:underline underline-offset-4 block text-base text-foreground/90 group-hover:text-foreground transition-colors"
                              >
                                {project.title}
                              </a>
                            ) : (
                              <span className="font-medium block text-base text-foreground/90">
                                {project.title}
                              </span>
                            )}
                            <p className="text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                              {project.description}
                            </p>
                          </div>
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground/60 hover:text-primary transition-colors shrink-0 mt-1.5 flex items-center gap-1.5"
                            >
                              <GithubLogoIcon
                                className="size-4"
                                weight="bold"
                              />
                              source
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div
                  className="absolute top-0 left-0 w-0.5 bg-primary rounded-full transition-all duration-400 ease-out pointer-events-none"
                  style={{
                    top: `${barStyle.top}px`,
                    height: `${barStyle.height}px`,
                    opacity: hoveredIndex !== null ? 1 : 0,
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
