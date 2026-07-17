import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UploadPostDialog } from "@/components/upload-post-dialog";
import { ArrowRightIcon } from "./icons/arrow-right";

const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between h-20 py-6 text-text-icons-inverse main-page-content-padding fixed w-full max-w-360 top-0 bg-black/80 z-10">
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
        <Button variant="transparent" className="group gap-1 px-0">
          <span className="text-base md:text-lg">New post</span>
          <ArrowRightIcon className="size-6 text-text-icons-brand group-active:text-text-icons-highlight group-hover:text-text-icons-highlight" />
        </Button>
      </UploadPostDialog>
    </header>
  );
};

export { SiteHeader };
