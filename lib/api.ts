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

export function getPosts() {
  return api<PostSummary[]>("/posts");
}

export function getPost(id: string) {
  return api<PostDetail>(`/post/${id}`);
}

export function getRelatedPosts() {
  return api<RelatedPost[]>("/posts/related");
}

export function createRelatedPost(
  formData: FormData,
  onProgress?: (percent: number) => void,
) {
  if (!onProgress) {
    return api<RelatedPost>("/post/related", {
      method: "POST",
      body: formData,
    });
  }

  return new Promise<RelatedPost>((resolve, reject) => {
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
}
