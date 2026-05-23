/*
  src/types/database.ts — TIPE TYPESCRIPT UNTUK SCHEMA SUPABASE
  Disesuaikan dengan supabase/schema.sql + 001_portal_admin.sql.
*/

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type WithDefaults<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type EmptyRelationships = [];

export interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  category: string;
  cover_image: string | null;
  file_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResearchReportRow {
  id: string;
  title: string;
  subtitle: string | null;
  year: number;
  category: string;
  file_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface ContactSubmissionRow {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  phone: string | null;
  service_interest: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface TestimonialRow {
  id: string;
  quote: string;
  author_name: string;
  author_title: string | null;
  company: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ClientRow {
  id: string;
  name: string;
  initials: string | null;
  logo_url: string | null;
  is_featured: boolean;
  sort_order: number;
}

export interface SiteStatRow {
  id: string;
  key: string;
  value: string;
  label: string;
  sort_order: number;
}

export interface KnowledgeHubFileRow {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string | null;
  file_size_kb: number | null;
  category: string | null;
  tags: string[] | null;
  download_count: number;
  is_free: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface SdgMetricRow {
  id: string;
  sdg_number: number;
  sdg_name: string;
  sdg_icon: string | null;
  metric_label: string;
  metric_value: string;
  metric_unit: string | null;
  description: string | null;
  year: number;
  updated_at: string;
}

export interface PanganAsliProductRow {
  id: string;
  name: string;
  description: string | null;
  origin_region: string | null;
  category: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface AdminUserRow {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: string;
  label: string | null;
  tokopedia_url: string | null;
  shopee_url: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      articles: { Row: ArticleRow; Insert: WithDefaults<ArticleRow, "id" | "is_published" | "published_at" | "content" | "cover_image" | "created_at" | "updated_at">; Update: Partial<ArticleRow>; Relationships: EmptyRelationships; };
      research_reports: { Row: ResearchReportRow; Insert: WithDefaults<ResearchReportRow, "id" | "subtitle" | "category" | "file_url" | "is_published" | "created_at">; Update: Partial<ResearchReportRow>; Relationships: EmptyRelationships; };
      contact_submissions: { Row: ContactSubmissionRow; Insert: WithDefaults<ContactSubmissionRow, "id" | "organization" | "phone" | "service_interest" | "status" | "created_at">; Update: Partial<ContactSubmissionRow>; Relationships: EmptyRelationships; };
      testimonials: { Row: TestimonialRow; Insert: WithDefaults<TestimonialRow, "id" | "author_title" | "company" | "is_featured" | "sort_order" | "created_at">; Update: Partial<TestimonialRow>; Relationships: EmptyRelationships; };
      clients: { Row: ClientRow; Insert: WithDefaults<ClientRow, "id" | "initials" | "logo_url" | "is_featured" | "sort_order">; Update: Partial<ClientRow>; Relationships: EmptyRelationships; };
      site_stats: { Row: SiteStatRow; Insert: WithDefaults<SiteStatRow, "id" | "sort_order">; Update: Partial<SiteStatRow>; Relationships: EmptyRelationships; };
      knowledge_hub_files: { Row: KnowledgeHubFileRow; Insert: WithDefaults<KnowledgeHubFileRow, "id" | "description" | "file_type" | "file_size_kb" | "category" | "tags" | "download_count" | "is_free" | "is_published" | "published_at" | "created_at">; Update: Partial<KnowledgeHubFileRow>; Relationships: EmptyRelationships; };
      sdg_metrics: { Row: SdgMetricRow; Insert: WithDefaults<SdgMetricRow, "id" | "sdg_icon" | "metric_unit" | "description" | "year" | "updated_at">; Update: Partial<SdgMetricRow>; Relationships: EmptyRelationships; };
      pangan_asli_products: { Row: PanganAsliProductRow; Insert: WithDefaults<PanganAsliProductRow, "id" | "description" | "origin_region" | "category" | "image_url" | "is_featured" | "is_active" | "created_at">; Update: Partial<PanganAsliProductRow>; Relationships: EmptyRelationships; };
      admin_users: { Row: AdminUserRow; Insert: WithDefaults<AdminUserRow, "id" | "created_at">; Update: Partial<AdminUserRow>; Relationships: EmptyRelationships; };
      products: { Row: ProductRow; Insert: WithDefaults<ProductRow, "id" | "label" | "tokopedia_url" | "shopee_url" | "image_url" | "is_active" | "sort_order" | "created_at">; Update: Partial<ProductRow>; Relationships: EmptyRelationships; };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
}