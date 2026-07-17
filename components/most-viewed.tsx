import Image from "next/image";
import Link from "next/link";

import type { PostSummary } from "@/lib/api";
import { cn } from "@/lib/utils";

type MostViewedProps = {
  posts: PostSummary[];
  className?: string;
  titleClassName?: string;
};

const MostViewed = ({ posts, className, titleClassName }: MostViewedProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2
        className={cn(
          "text-lg font-bold text-text-icons-inverse pb-3",
          titleClassName,
        )}
      >
        Most viewed
      </h2>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border-b border-b-border-disabled-secondary pb-3 group"
          >
            <Link
              href={`/post/${post.id}`}
              className="flex gap-3 justify-between"
            >
              <span className="text-base text-text-icons-disabled font-semibold leading-5 group-hover:underline">
                {post.title}
              </span>
              <div className="overflow-hidden w-20 h-20 shrink-0 rounded">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={80}
                  height={80}
                  className="size-20 object-cover card-transition group-hover:scale-110"
                  {...(post.blurDataUrl
                    ? {
                        placeholder: "blur" as const,
                        blurDataURL: post.blurDataUrl,
                      }
                    : {})}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { MostViewed };
