import { Card, type CardProps } from "@/components/ui/card"

type CardBlockProps = {
  cards: [CardProps, CardProps, CardProps]
  reverse?: boolean
}

function CardBlock({ cards, reverse = false }: CardBlockProps) {
  const [first, second, third] = cards

  const stacked = (
    <div className="flex flex-col gap-6">
      <Card {...first} orientation="landscape" />
      <Card {...second} orientation="landscape" />
    </div>
  )
  const tall = <Card {...third} orientation="portrait" className="h-full" />

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
  )
}

export { CardBlock }
