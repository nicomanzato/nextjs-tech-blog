import { Card, type CardProps } from "@/components/ui/card";
import { CardBlock } from "@/components/card-block";
import { MostViewed } from "@/components/most-viewed";
import { NewsletterBanner } from "@/components/newsletter-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopicsFilter } from "@/components/topics-filter";
import { Button } from "@/components/ui/button";
import { getPosts, type PostSummary } from "@/lib/api";

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

  // ponytail: no "featured" flag from the API yet, first post stands in for the hero
  const [hero, ...rest] = posts;
  const gridPosts = rest.slice(0, 9);
  const [group1, group2, group3] = [
    gridPosts.slice(0, 3),
    gridPosts.slice(3, 6),
    gridPosts.slice(6, 9),
  ];
  const topics = Array.from(
    new Set(posts.map((p) => p.topic).filter(Boolean)),
  ) as string[];

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 sm:px-10">
      {hero && (
        <section className="flex flex-col gap-3">
          <span className="text-sm text-white/70">Today story</span>
          <Card
            {...toCardProps(hero)}
            theme="dark"
            orientation="landscape"
            className="h-[420px]"
          />
        </section>
      )}

      <TopicsFilter topics={topics} />

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-[2fr_1fr]">
        {group1.length === 3 && (
          <CardBlock
            cards={group1.map(toCardProps) as [CardProps, CardProps, CardProps]}
            reverse
          />
        )}
        <MostViewed posts={gridPosts.slice(0, 4)} />

        <div className="lg:col-span-1">
          <NewsletterBanner />
        </div>

        {group2.length === 3 && (
          <div className="lg:col-start-1">
            <CardBlock
              cards={
                group2.map(toCardProps) as [CardProps, CardProps, CardProps]
              }
            />
          </div>
        )}
        {group3.length === 3 && (
          <div className="lg:col-start-1">
            <CardBlock
              cards={
                group3.map(toCardProps) as [CardProps, CardProps, CardProps]
              }
              reverse
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="primary">Load more</Button>
      </div>
    </main>
  );
}
