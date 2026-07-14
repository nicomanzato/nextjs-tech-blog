import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type CardProps = {
  image: string
  imageAlt: string
  badge: string
  title: string
  meta: string
  href: string
  orientation?: "landscape" | "portrait"
  theme?: "light" | "dark"
  className?: string
}

function Card({
  image,
  imageAlt,
  badge,
  title,
  meta,
  href,
  orientation = "landscape",
  theme = "light",
  className,
}: CardProps) {
  const isDark = theme === "dark"

  return (
    <Link
      href={href}
      className={cn(
        "group relative block cursor-pointer overflow-hidden",
        orientation === "landscape" ? "h-64" : "min-h-64",
        className
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div
        className={cn(
          "absolute inset-x-4 bottom-4 flex flex-col gap-2 p-4 shadow-md",
          isDark ? "bg-ink/85 text-white" : "bg-white text-ink"
        )}
      >
        <Badge>{badge}</Badge>
        <h3
          className={cn(
            "line-clamp-2 font-bold group-hover:underline",
            isDark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-semibold group-hover:underline",
              isDark ? "text-lime" : "text-active-purple"
            )}
          >
            Read <ArrowRight className="size-4" />
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1",
              isDark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            <FileText className="size-4" />
            {meta}
          </span>
        </div>
      </div>
    </Link>
  )
}

export { Card }
export type { CardProps }
