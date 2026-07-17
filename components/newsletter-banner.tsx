import { Button } from "@/components/ui/button";

const NewsletterBanner = () => {
  return (
    <div className="flex flex-col items-start gap-4 bg-background-interactive p-8 md:px-10 md:py-11 text-text-icons-inverse sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[27px] leading-[1.21]">
        Sign up for our newsletter{" "}
        <span className="font-bold">and get daily updates</span>
      </p>
      <Button variant="primary" className="px-10 w-full md:w-fit">
        Subscribe
      </Button>
    </div>
  );
};

export { NewsletterBanner };
