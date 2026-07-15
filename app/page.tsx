import { Card, type CardProps } from "@/components/ui/card";
import { CardBlock } from "@/components/card-block";
import { MostViewed } from "@/components/most-viewed";
import { NewsletterBanner } from "@/components/newsletter-banner";
import { TopicsFilter } from "@/components/topics-filter";
import { Button } from "@/components/ui/button";
import { getPosts, type PostSummary } from "@/lib/api";
import { SiteFooter } from "@/components/site-footer";

function toCardProps(post: PostSummary) {
  return {
    image: post.imageUrl,
    imageAlt: post.title,
    badge: post.topic ?? "",
    title: post.title,
    meta: post.readTime ? `${post.readTime} mins` : "",
    href: `/post/${post.id}`,
  };
}

export default async function Home() {
  const posts = await getPosts();

  const [hero, ...rest] = posts;
  const gridPosts = rest.slice(0, 9);
  const mostViewedPosts = rest.slice(9, 13).length
    ? rest.slice(9, 13)
    : gridPosts.slice(0, 4);
  const [group1, group2, group3] = [
    gridPosts.slice(0, 3),
    gridPosts.slice(3, 6),
    gridPosts.slice(6, 9),
  ];
  const topics = Array.from(
    new Set(posts.map((p) => p.topic).filter(Boolean)),
  ) as string[];

  return (
    <main className="flex flex-col gap-8 md:gap-16 pt-4 main-page-content-padding">
      {hero && (
        <section className="flex flex-col gap-5 md:pt-7">
          <span className="text-lg text-text-icons-inverse font-semibold hidden md:block">
            Today story
          </span>
          <Card
            {...toCardProps(hero)}
            theme="dark"
            size="large"
            orientation="landscape"
            className="h-87"
          />
        </section>
      )}

      <TopicsFilter topics={topics} />

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        <div className="col-span-9 flex-col gap-10 flex">
          {group1.length === 3 && (
            <CardBlock
              cards={
                group1.map(toCardProps) as [CardProps, CardProps, CardProps]
              }
              reverse
            />
          )}

          <NewsletterBanner />

          {group2.length === 3 && (
            <CardBlock
              cards={
                group2.map(toCardProps) as [CardProps, CardProps, CardProps]
              }
            />
          )}
          {group3.length === 3 && (
            <CardBlock
              cards={
                group3.map(toCardProps) as [CardProps, CardProps, CardProps]
              }
              reverse
            />
          )}

          <Button
            variant="primary"
            className="mb-16 md:mb-80 md:w-fit md:mx-auto"
          >
            Load more
          </Button>
        </div>

        <MostViewed
          posts={mostViewedPosts}
          className="col-span-3 pt-2 hidden md:flex"
        />
      </div>
    </main>
  );
}
