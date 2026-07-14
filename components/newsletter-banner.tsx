import { Button } from "@/components/ui/button"

function NewsletterBanner() {
  return (
    <div className="flex flex-col items-start gap-4 bg-active-purple px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <p>
        Sign up for our newsletter <span className="font-bold">and get daily updates</span>
      </p>
      <Button variant="primary" className="h-auto px-6 py-2">
        Subscribe
      </Button>
    </div>
  )
}

export { NewsletterBanner }
