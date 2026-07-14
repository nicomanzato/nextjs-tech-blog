import Link from "next/link"
import { ArrowRight, Asterisk } from "lucide-react"

import { Button } from "@/components/ui/button"
import { UploadPostDialog } from "@/components/upload-post-dialog"

function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-6 text-white sm:px-10">
      <Link href="/" className="flex items-center gap-1 text-lg font-bold">
        <Asterisk className="size-5 text-lime" />
        lite-tech
      </Link>
      <UploadPostDialog>
        <Button
          variant="black"
          className="h-auto gap-1 border-none bg-transparent p-0 text-base font-semibold text-lime hover:bg-transparent hover:text-white"
        >
          New post <ArrowRight className="size-4" />
        </Button>
      </UploadPostDialog>
    </header>
  )
}

export { SiteHeader }
