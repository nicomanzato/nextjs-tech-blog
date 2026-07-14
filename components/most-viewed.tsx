import Image from "next/image"
import Link from "next/link"

import type { PostSummary } from "@/lib/api"

type MostViewedProps = {
  posts: PostSummary[]
}

// ponytail: no view-count tracking yet, just shows the first N posts passed in
function MostViewed({ posts }: MostViewedProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-bold text-white">Most viewed</h2>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`} className="flex items-center gap-3">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded object-cover"
              />
              <span className="line-clamp-3 text-sm text-white">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { MostViewed }
