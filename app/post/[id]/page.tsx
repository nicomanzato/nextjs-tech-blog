import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { MostViewed } from "@/components/most-viewed";
import { UploadPostDialog } from "@/components/upload-post-dialog";
import { ArrowRightIcon } from "@/components/icons/arrow-right";
import { FileTextIcon } from "@/components/icons/file-text";
import {
  getPost,
  getPosts,
  getRelatedPosts,
  type RelatedPost,
} from "@/lib/api";
import { renderArticleMarkdown } from "@/lib/parse-article";
import { SiteFooter } from "@/components/site-footer";

const SOCIALS = [
  { url: "/icons/linkedin-dark.svg", alt: "LinkedIn" },
  { url: "/icons/facebook-dark.svg", alt: "Facebook" },
  { url: "/icons/x-dark.svg", alt: "X" },
];

function toRelatedCardProps(post: RelatedPost) {
  return {
    image: post.imageUrl,
    imageAlt: post.title,
    blurDataUrl: post.blurDataUrl,
    badge: post.topic,
    title: post.title,
    meta: `${post.readTime} mins`,
    href: `/post/${post.id}`,
  };
}

const PostDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [post, { posts }, relatedPosts] = await Promise.all([
    getPost(id),
    getPosts(),
    getRelatedPosts(),
  ]);

  const otherPosts = posts.filter((p) => p.id !== id);
  const mostViewedPosts = otherPosts.slice(0, 4);

  return (
    <main className="flex flex-col gap-8 md:gap-16 pb-16 bg-white">
      <section className="relative h-fit pb-8 min-h-122 md:h-169.25 flex flex-col justify-end">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          {...(post.blurDataUrl
            ? { placeholder: "blur" as const, blurDataURL: post.blurDataUrl }
            : {})}
        />
        <div className="relative flex h-full flex-col justify-center gap-8 px-8 md:px-18">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-1 font-semibold text-text-icons-inverse hover:underline underline-offset-6"
          >
            <ArrowLeft className="size-4" /> Blog
          </Link>

          <div className="flex flex-col items-start">
            {post.author && (
              <div className="inline-flex items-center gap-2 bg-background-surface pt-4 w-fit px-7">
                <Image
                  src={post.imageUrl}
                  alt={post.author}
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-text-icons-primary">
                  By {post.author}
                </span>
              </div>
            )}
            <div className="flex max-w-lg flex-col text-text-icons-primary bg-background-surface gap-4 py-8 px-7">
              <h1 className="text-2xl font-bold md:text-4xl">{post.title}</h1>
              {post.readTime && (
                <span className="inline-flex items-center gap-1 text-sm text-text-icons-secondary">
                  <FileTextIcon className="size-4" /> {post.readTime} mins read
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-20 gap-x-8 gap-y-10 md:pt-6 main-page-content-padding">
        <div className="order-2 md:order-1 flex gap-4 flex-col px-0 pb-6 col-span-1 md:col-span-4 md:sticky md:top-28 md:self-start">
          <span className="font-bold text-lg">Share on</span>
          <div className="flex gap-8 pt-3">
            {SOCIALS.map(({ url, alt }) => (
              <Link href="/" key={url}>
                <Image src={url} alt={alt} width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
        <article className="order-1 md:order-2 col-span-1 md:col-span-11 flex flex-col gap-8 bg-background-surface text-text-icons-primary md:pl-9">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: renderArticleMarkdown(post.body),
            }}
          />
        </article>

        <MostViewed
          titleClassName="text-text-icons-primary"
          posts={mostViewedPosts}
          className="order-3 col-span-5 hidden md:flex"
        />
      </div>

      {relatedPosts.length > 0 && (
        <div className="flex flex-col gap-3 max-w-268 mx-auto w-full pb-12">
          <div className="flex items-center justify-between main-page-content-padding">
            <h2 className="text-2xl md:text-4xl font-bold text-text-icons-primary">
              Related posts
            </h2>
            <UploadPostDialog>
              <button className="group inline-flex items-center gap-1 font-semibold text-text-icons-primary">
                New post
                <ArrowRightIcon className="size-4 text-text-icons-interactive group-hover:text-text-icons-highlight" />
              </button>
            </UploadPostDialog>
          </div>
          <div className="flex flex-nowrap gap-6 overflow-x-auto no-scrollbar pl-5 md:pl-17.5 md:pr-14.5 md:grid md:grid-cols-3 md:overflow-visible">
            {relatedPosts.slice(0, 3).map((p) => (
              <Card
                key={p.id}
                {...toRelatedCardProps(p)}
                className="h-auto aspect-9/10 w-[62%] last:mr-5 shrink-0 md:w-auto"
              />
            ))}
          </div>
        </div>
      )}

      <div className="main-page-content-padding">
        <SiteFooter />
      </div>
    </main>
  );
};

export default PostDetail;
