"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { XIcon } from "@/components/icons/x";

type TopicsFilterProps = {
  topics: string[];
};

function TopicsFilter({ topics }: TopicsFilterProps) {
  const [selected, setSelected] = React.useState<string[]>(["All"]);

  function toggle(topic: string) {
    if (topic === "All") {
      setSelected(["All"]);
      return;
    }
    setSelected((current) => {
      const withoutAll = current.filter((t) => t !== "All");
      const isSelected = withoutAll.includes(topic);
      const next = isSelected
        ? withoutAll.filter((t) => t !== topic)
        : [...withoutAll, topic];
      return next.length === 0 ? ["All"] : next;
    });
  }

  return (
    <div className="flex flex-nowrap lg:flex-wrap gap-2 items-center overflow-x-auto no-scrollbar">
      <span className="text-text-icons-inverse font-bold text-lg mr-4 shrink-0">
        Topics
      </span>
      {["All", ...topics].map((topic) => {
        const isSelected = selected.includes(topic);
        return (
          <button
            key={topic}
            type="button"
            onClick={() => toggle(topic)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 min-h-11.25 text-base font-medium base-transition",
              isSelected
                ? "border-border-brand bg-background-brand text-text-icons-primary"
                : "border-border-disabled text-text-icons-disabled hover:border-text-icons-inverse hover:text-text-icons-inverse",
            )}
          >
            {topic}
            {isSelected && <XIcon className="size-4.5" />}
          </button>
        );
      })}
    </div>
  );
}

export { TopicsFilter };
