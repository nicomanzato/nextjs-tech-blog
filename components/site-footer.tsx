import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SOCIALS = [
  { url: "/icons/linkedin.svg", alt: "LinkedIn" },
  { url: "/icons/facebook.svg", alt: "Facebook" },
  { url: "/icons/x.svg", alt: "X" },
];

type SiteFooterProps = {
  className?: string;
};

function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "bg-background-interactive p-16 md:pl-28 md:pr-48 md:pt-21 md:pb-17 flex flex-col text-text-icons-inverse md:h-66.75",
        className,
      )}
    >
      <div className="flex flex-col gap-12 md:flex-row items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="lite-tech"
            width={179}
            height={28}
            className="h-7 w-auto"
          />
        </Link>
        <div className="flex items-center gap-6">
          {SOCIALS.map(({ url, alt }) => (
            <Link href="/" key={url}>
              <Image src={url} alt={alt} width={24} height={24} />
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-auto text-sm text-text-icons-inverse pt-12 text-center md:text-left leading-8">
        © Copyright Lite-Tech. All Rights Reserved
      </p>
    </footer>
  );
}

export { SiteFooter };
