import Link from "next/link"
import { Asterisk } from "lucide-react"

const SOCIALS = ["in", "f", "X"]

function SiteFooter() {
  return (
    <footer className="bg-active-purple px-6 py-10 text-white sm:px-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 text-lg font-bold">
          <Asterisk className="size-5 text-lime" />
          lite-tech
        </Link>
        <div className="flex items-center gap-4">
          {SOCIALS.map((label) => (
            <span
              key={label}
              className="flex size-8 items-center justify-center rounded-full border border-white/40 text-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-8 text-sm text-white/70">
        © Copyright Lite-Tech. All Rights Reserved
      </p>
    </footer>
  )
}

export { SiteFooter }
