const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type PostSource = "lite-tech" | "related";

export type PostSummary = {
  id: string;
  title: string;
  topic: string | null;
  readTime: number | null;
  imageUrl: string;
  blurDataUrl: string | null;
  source: PostSource;
};

export type PostDetail = PostSummary & {
  subtitle: string | null;
  author: string | null;
  body: string;
};

export type RelatedPost = {
  id: string;
  title: string;
  topic: string;
  readTime: number;
  imageUrl: string;
  blurDataUrl: string | null;
  createdAt: string;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, init);
  if (!res.ok) {
    throw new Error(`API ${path} responded ${res.status}`);
  }
  return res.json();
}

export type PostsPage = {
  posts: PostSummary[];
  hasMore: boolean;
};

export function getPosts(params?: {
  offset?: number;
  limit?: number;
}): Promise<PostsPage> {
  const query = new URLSearchParams();
  if (params?.offset !== undefined) query.set("offset", String(params.offset));
  if (params?.limit !== undefined) query.set("limit", String(params.limit));
  const qs = query.toString();

  return api<{ data: PostSummary[]; meta: { hasMore: boolean } }>(
    `/posts${qs ? `?${qs}` : ""}`,
    { next: { revalidate: 60 } },
  ).then((res) => ({ posts: res.data, hasMore: res.meta.hasMore }));
}

export function getPost(id: string) {
  return api<PostDetail>(`/post/${id}`, {
    next: { revalidate: 60, tags: ["related-posts"] },
  });
}

export function getRelatedPosts() {
  return api<RelatedPost[]>("/posts/related", {
    // revalidate is a long fallback ceiling — real freshness comes from
    // revalidateTag("related-posts") firing right after a new upload.
    next: { revalidate: 60 * 60 * 24 * 7, tags: ["related-posts"] },
  });
}

function revalidateRelatedPosts() {
  return fetch("/api/revalidate-related", { method: "POST" });
}

export async function createRelatedPost(
  formData: FormData,
  onProgress?: (percent: number) => void,
) {
  if (!onProgress) {
    const post = await api<RelatedPost>("/post/related", {
      method: "POST",
      body: formData,
    });
    await revalidateRelatedPosts();
    return post;
  }

  const post = await new Promise<RelatedPost>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/post/related`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.send(formData);
  });
  await revalidateRelatedPosts();
  return post;
}
