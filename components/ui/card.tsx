import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/icons/arrow-right";
import { FileTextIcon } from "@/components/icons/file-text";

type CardProps = {
  image: string;
  imageAlt: string;
  blurDataUrl?: string | null;
  badge: string;
  title: string;
  meta: string;
  href: string;
  size?: "large";
  orientation?: "landscape" | "portrait";
  theme?: "light" | "dark";
  className?: string;
};

const Card = ({
  image,
  imageAlt,
  blurDataUrl,
  badge,
  title,
  meta,
  href,
  orientation = "landscape",
  theme = "light",
  className,
  size,
}: CardProps) => {
  const isDark = theme === "dark";
  const isLarge = size === "large";

  return (
    <Link
      href={href}
      className={cn(
        "group relative block cursor-pointer overflow-hidden",
        orientation === "landscape" ? "h-64" : "min-h-64",
        className,
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover card-transition group-hover:scale-110"
        {...(blurDataUrl
          ? { placeholder: "blur" as const, blurDataURL: blurDataUrl }
          : {})}
      />
      <div
        className={cn(
          "absolute flex flex-col gap-2 text-text-icons-primary bottom-0 p-5",
          {
            "md:h-full md:justify-center md:left-0": isLarge,
          },
        )}
      >
        <div className="flex flex-col">
          {badge && (
            <div
              className={cn("bg-background-surface w-fit px-6 pt-6", {
                "bg-black": isDark,
              })}
            >
              <Badge>{badge}</Badge>
            </div>
          )}
          <div
            className={cn(
              "bg-background-surface p-6 pt-3 pb-4 gap-3 flex flex-col md:w-fit",
              { "bg-black text-text-icons-inverse": isDark },
              { "md:py-7.5": isLarge },
            )}
          >
            <h3
              className={cn("font-bold text-lg", {
                "md:text-[41px] md:leading-13 md:max-w-125": isLarge,
              })}
            >
              {title}
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span
                className={cn(
                  "font-semibold text-base inline-flex items-center gap-1 base-transition group-hover:underline underline-offset-6",
                )}
              >
                Read
                <ArrowRightIcon className="size-4 text-text-icons-interactive group-hover:text-text-icons-highlight base-transition" />
              </span>
              {meta && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-muted-foreground text-sm",
                  )}
                >
                  <FileTextIcon className="size-4" />
                  {meta}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { Card };
export type { CardProps };
