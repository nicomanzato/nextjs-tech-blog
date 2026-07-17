"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { CardBlock } from "@/components/card-block";
import { Button } from "@/components/ui/button";
import { getPosts, type PostSummary } from "@/lib/api";
import type { CardProps } from "@/components/ui/card";

const PAGE_SIZE = 9;

const toCardProps = (post: PostSummary): CardProps => ({
  image: post.imageUrl,
  imageAlt: post.title,
  blurDataUrl: post.blurDataUrl,
  badge: post.topic ?? "",
  title: post.title,
  meta: post.readTime ? `${post.readTime} mins` : "",
  href: `/post/${post.id}`,
});

type LoadMorePostsProps = {
  initialOffset: number;
  initialHasMore: boolean;
};

const LoadMorePosts = ({
  initialOffset,
  initialHasMore,
}: LoadMorePostsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "load-more"],
      queryFn: ({ pageParam }) =>
        getPosts({ offset: pageParam, limit: PAGE_SIZE }),
      initialPageParam: initialOffset,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasMore
          ? initialOffset + allPages.length * PAGE_SIZE
          : undefined,
      enabled: false,
    });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const groups: CardProps[][] = [];
  for (let i = 0; i + 3 <= posts.length; i += 3) {
    groups.push(posts.slice(i, i + 3).map(toCardProps));
  }

  const hasMore = data && data.pages.length > 0 ? hasNextPage : initialHasMore;

  return (
    <>
      {groups.map((cards, i) => (
        <CardBlock
          key={i}
          cards={cards as [CardProps, CardProps, CardProps]}
          reverse={i % 2 === 1}
        />
      ))}

      {hasMore && (
        <Button
          variant="primary"
          className="mb-4 mt-4 md:mt-0 md:mb-80 md:w-fit md:mx-auto"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </>
  );
};

export { LoadMorePosts };
