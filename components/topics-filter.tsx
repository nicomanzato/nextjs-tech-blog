"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type TopicsFilterProps = {
  topics: string[]
}

function TopicsFilter({ topics }: TopicsFilterProps) {
  const [selected, setSelected] = React.useState<string[]>(["All"])

  function toggle(topic: string) {
    if (topic === "All") {
      setSelected(["All"])
      return
    }
    setSelected((current) => {
      const withoutAll = current.filter((t) => t !== "All")
      const isSelected = withoutAll.includes(topic)
      const next = isSelected
        ? withoutAll.filter((t) => t !== topic)
        : [...withoutAll, topic]
      return next.length === 0 ? ["All"] : next
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {["All", ...topics].map((topic) => {
        const isSelected = selected.includes(topic)
        return (
          <button
            key={topic}
            type="button"
            onClick={() => toggle(topic)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              isSelected
                ? "border-lime bg-lime text-ink"
                : "border-white/30 text-white hover:border-white"
            )}
          >
            {topic}
            {isSelected && <X className="size-3.5" />}
          </button>
        )
      })}
    </div>
  )
}

export { TopicsFilter }
