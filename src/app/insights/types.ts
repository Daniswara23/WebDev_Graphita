export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  file_url: string | null;
  external_url: string | null;
};

export type ResearchReport = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  category: string;
  file_url: string | null;
};