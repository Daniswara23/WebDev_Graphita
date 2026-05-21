/*
  src/types/database.ts — TIPE TYPESCRIPT UNTUK SCHEMA SUPABASE
  Disesuaikan dengan sqlsupabase_GAS.txt.
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

export interface MitraProfileRow {
  id: string;
  full_name: string | null;
  organization: string;
  position: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  mitra_id: string | null;
  title: string;
  description: string | null;
  service_type: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export interface ProjectMilestoneRow {
  id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  completed_at: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProjectDocumentRow {
  id: string;
  project_id: string | null;
  title: string;
  file_url: string;
  file_type: string | null;
  file_size_kb: number | null;
  uploaded_by: string | null;
  is_visible: boolean;
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
      mitra_profiles: { Row: MitraProfileRow; Insert: WithDefaults<MitraProfileRow, "full_name" | "position" | "phone" | "avatar_url" | "is_active" | "created_at" | "updated_at">; Update: Partial<MitraProfileRow>; Relationships: EmptyRelationships; };
      projects: { Row: ProjectRow; Insert: WithDefaults<ProjectRow, "id" | "mitra_id" | "description" | "service_type" | "status" | "start_date" | "end_date" | "created_at">; Update: Partial<ProjectRow>; Relationships: EmptyRelationships; };
      project_milestones: { Row: ProjectMilestoneRow; Insert: WithDefaults<ProjectMilestoneRow, "id" | "project_id" | "description" | "status" | "due_date" | "completed_at" | "sort_order" | "created_at">; Update: Partial<ProjectMilestoneRow>; Relationships: EmptyRelationships; };
      project_documents: { Row: ProjectDocumentRow; Insert: WithDefaults<ProjectDocumentRow, "id" | "project_id" | "file_type" | "file_size_kb" | "uploaded_by" | "is_visible" | "created_at">; Update: Partial<ProjectDocumentRow>; Relationships: EmptyRelationships; };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
}
 