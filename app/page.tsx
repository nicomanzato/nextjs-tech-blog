import { Card, type CardProps } from "@/components/ui/card";
import { CardBlock } from "@/components/card-block";
import { MostViewed } from "@/components/most-viewed";
import { NewsletterBanner } from "@/components/newsletter-banner";
import { TopicsFilter } from "@/components/topics-filter";
import { getPosts, type PostSummary } from "@/lib/api";
import { SiteFooter } from "@/components/site-footer";
import { HeaderPlaceholder } from "@/components/header-placeholder";
import { LoadMorePosts } from "@/components/load-more-posts";

const FIRST_PAGE_SIZE = 10;

const toCardProps = (post: PostSummary) => {
  return {
    image: post.imageUrl,
    imageAlt: post.title,
    blurDataUrl: post.blurDataUrl,
    badge: post.topic ?? "",
    title: post.title,
    meta: post.readTime ? `${post.readTime} mins` : "",
    href: `/post/${post.id}`,
  };
};

const Home = async () => {
  const { posts, hasMore } = await getPosts({ limit: FIRST_PAGE_SIZE });

  const [hero, ...rest] = posts;
  const gridPosts = rest.slice(0, 9);
  const mostViewedPosts = posts.slice(0, 4);

  const [group1, group2, group3] = [
    gridPosts.slice(0, 3),
    gridPosts.slice(3, 6),
    gridPosts.slice(6, 9),
  ];
  const topics = Array.from(
    new Set(posts.map((p) => p.topic).filter(Boolean)),
  ) as string[];

  return (
    <>
      <HeaderPlaceholder />
      <main className="flex flex-col gap-8 md:gap-16 pb-14 pt-4 main-page-content-padding">
        {hero && (
          <section className="flex flex-col gap-5 md:pt-7 animate-fade-from-bottom">
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

        <TopicsFilter
          topics={topics}
          className="animate-fade-from-bottom -mx-4 px-4 md:mx-0 md:px-0"
        />

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

            <LoadMorePosts
              initialOffset={FIRST_PAGE_SIZE}
              initialHasMore={hasMore}
            />
          </div>

          <MostViewed
            posts={mostViewedPosts}
            className="col-span-3 pt-2 hidden md:flex animate-fade-from-right"
          />
        </div>

        <SiteFooter />
      </main>
    </>
  );
};

export default Home;
