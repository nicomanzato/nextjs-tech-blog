const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type PostSource = "lite-tech" | "related";

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

export async function getPosts() {
  const results = await api<PostSummary[]>("/posts");

  if (process.env.MOCK_DATA === "true") {
    return results.map((post, index) => ({
      ...post,
      title: MOCK_POSTS[index].title,
    }));
  }
  return results;
}

// ponytail: hardcoded to mirror the Figma reference 1:1 for pixel comparison.
// Set MOCK_DATA=true in .env.local to use it instead of the live API. Images
// are stand-ins (no real assets exported from Figma) — swap /placeholder-card.svg
// for real exports when doing the final visual pass.
const MOCK_POSTS: PostSummary[] = [
  {
    id: "mock-hero",
    title: "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
    topic: "Diversity & Inclusion",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-1",
    title:
      "Binance's Top Crypto Crime Investigator Is Being Detained in Nigeria",
    topic: "Crypto",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-2",
    title: "A Global Police Operation Just Took Down the Notorious LockBit",
    topic: "Security",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-3",
    title:
      "The first rule of the extreme dishwasher loading facebook group is…",
    topic: "Tech companies",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-4",
    title:
      "Dictators Used Sandvine Tech to Censor the Internet. The US Finally Did Something About It",
    topic: "Global",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-5",
    title: "Here Come the AI Worms",
    topic: "Crypto",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-6",
    title: "How to avoid candidate ghosting & keep talent interested",
    topic: "Security",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-7",
    title: "A Mysterious Leak Exposed Chinese Hacking Secrets",
    topic: "Leaks",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-8",
    title: "Apple's iMessage Is Getting Future-Resistant Encryption",
    topic: "Tech companies",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-9",
    title:
      "How the Pentagon Learned to Use Targeted Ads to Find Its Targets—and Vladimir Putin",
    topic: "Security",
    readTime: 6,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-mv-1",
    title: "Your TV Sounds Awful. These Soundbars Can Fix That",
    topic: null,
    readTime: null,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-mv-2",
    title: "The Small Company at the Center of 'Gamergate 2.0'",
    topic: null,
    readTime: null,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-mv-3",
    title:
      "Craig Wright Is Not Bitcoin Creator Satoshi Nakamoto, Judge Declares",
    topic: null,
    readTime: null,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
  {
    id: "mock-mv-4",
    title:
      "Robert F. Kennedy Jr. Targets a Generation of Politically Disaffected, Extremely Online Men",
    topic: null,
    readTime: null,
    imageUrl: "/placeholder-card.svg",
    source: "lite-tech",
  },
];

export function getPost(id: string) {
  return api<PostDetail>(`/post/${id}`);
}

export function getRelatedPosts() {
  return api<RelatedPost[]>("/posts/related");
}

export function createRelatedPost(formData: FormData) {
  return api<RelatedPost>("/post/related", { method: "POST", body: formData });
}
