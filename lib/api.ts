const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export type PostSource = 'lite-tech' | 'related';

export type PostSummary = {
  id: string;
  title: string;
  topic: string | null;
  readTime: number | null;
  imageUrl: string;
  source: PostSource;
};

export type PostDetail = PostSummary & {
  subtitle: string | null;
  author: string | null;
};

export type RelatedPost = {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, init);
  if (!res.ok) {
    throw new Error(`API ${path} responded ${res.status}`);
  }
  return res.json();
}

export function getPosts() {
  return api<PostSummary[]>('/posts');
}

export function getPost(id: string) {
  return api<PostDetail>(`/post/${id}`);
}

export function getRelatedPosts() {
  return api<RelatedPost[]>('/posts/related');
}

export function createRelatedPost(formData: FormData) {
  return api<RelatedPost>('/post/related', { method: 'POST', body: formData });
}
