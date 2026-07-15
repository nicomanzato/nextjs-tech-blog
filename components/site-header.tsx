import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UploadPostDialog } from "@/components/upload-post-dialog";
import { ArrowRightIcon } from "./icons/arrow-right";

function SiteHeader() {
  return (
    <header className="flex items-center justify-between h-20 py-6 text-text-icons-inverse main-page-content-padding sticky top-0 bg-black/80 z-10">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="lite-tech"
          width={179}
          height={28}
          className="h-7 w-auto"
        />
      </Link>
      <UploadPostDialog>
        <Button className="h-auto gap-1 border-none bg-transparent p-0 text-base font-semibold  hover:bg-transparent hover:text-text-icons-inverse">
          <span className="text-text-icons-inverse">New post</span>
          <ArrowRightIcon className="size-6 text-text-icons-brand" />
        </Button>
      </UploadPostDialog>
    </header>
  );
}

export { SiteHeader };
