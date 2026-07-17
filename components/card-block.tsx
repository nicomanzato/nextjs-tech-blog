import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardBlockProps = {
  cards: [CardProps, CardProps, CardProps];
  reverse?: boolean;
  className?: string;
};

const CardBlock = ({ cards, reverse = false, className }: CardBlockProps) => {
  const [first, second, third] = cards;

  const stacked = (
    <div className="md:h-197.5 flex flex-col gap-8 md:gap-0 justify-between col-span-1 md:col-span-9">
      <Card
        {...first}
        orientation="landscape"
        className="h-95 animate-fade-from-bottom"
      />
      <Card
        {...second}
        orientation="landscape"
        className="h-95 animate-fade-from-top"
      />
    </div>
  );
  const tall = (
    <Card
      {...third}
      orientation="portrait"
      className="h-95 md:h-197.5 col-span-1 md:col-span-11 animate-fade-from-right"
    />
  );

  return (
    <div className={cn("grid gap-8 grid-cols-1 md:grid-cols-20", className)}>
      {reverse ? (
        <>
          {tall}
          {stacked}
        </>
      ) : (
        <>
          {stacked}
          {tall}
        </>
      )}
    </div>
  );
};

export { CardBlock };
