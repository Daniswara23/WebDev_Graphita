/*
  src/types/database.ts — TIPE TYPESCRIPT UNTUK SCHEMA SUPABASE
  Disesuaikan dengan supabase/schema.sql.
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

export interface StatRow {
  id: string;
  number_text: string;
  label: string;
  sort_order: number;
  created_at: string;
}

export interface HomeServiceRow {
  id: string;
  num: string;
  title: string;
  description: string;
  icon_key: string;
  sort_order: number;
  created_at: string;
}

export interface ServiceDetailRow {
  id: string;
  title: string;
  description: string;
  features: string[];
  sort_order: number;
  created_at: string;
}

export interface CaseStudyRow {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProductRow {
  id: string;
  name: string;
  description: string;
  label: string | null;
  tokopedia_url: string | null;
  shopee_url: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ArticleRow {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string;
  content: string | null;
  category: string;
  cover_image: string | null;
  file_url: string | null;
  external_url: string | null;
  is_published: boolean;
  published_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ResearchReportRow {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  category: string;
  file_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface StandardRow {
  id: string;
  title: string;
  description: string;
  details: string;
  sort_order: number;
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

export interface EcosystemPartnerRow {
  id: string;
  category: string;
  name: string;
  description: string;
  icon_svg: string;
  sort_order: number;
  created_at: string;
}

export interface EcosystemCaseStudyRow {
  id: string;
  title: string;
  client: string;
  sector: string;
  summary: string;
  impact: string;
  sort_order: number;
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

export interface CaseVideoRow {
  id: string;
  title: string;
  video_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface PhotoGalleryRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  event_date: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImageRow {
  id: string;
  gallery_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface AdminUserRow {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      stats: { Row: StatRow; Insert: WithDefaults<StatRow, "id" | "sort_order" | "created_at">; Update: Partial<StatRow>; Relationships: EmptyRelationships; };
      home_services: { Row: HomeServiceRow; Insert: WithDefaults<HomeServiceRow, "id" | "icon_key" | "sort_order" | "created_at">; Update: Partial<HomeServiceRow>; Relationships: EmptyRelationships; };
      service_details: { Row: ServiceDetailRow; Insert: WithDefaults<ServiceDetailRow, "id" | "features" | "sort_order" | "created_at">; Update: Partial<ServiceDetailRow>; Relationships: EmptyRelationships; };
      case_studies: { Row: CaseStudyRow; Insert: WithDefaults<CaseStudyRow, "id" | "image_url" | "sort_order" | "created_at">; Update: Partial<CaseStudyRow>; Relationships: EmptyRelationships; };
      products: { Row: ProductRow; Insert: WithDefaults<ProductRow, "id" | "label" | "tokopedia_url" | "shopee_url" | "image_url" | "is_active" | "sort_order" | "created_at">; Update: Partial<ProductRow>; Relationships: EmptyRelationships; };
      articles: { Row: ArticleRow; Insert: WithDefaults<ArticleRow, "id" | "slug" | "content" | "cover_image" | "file_url" | "external_url" | "is_published" | "published_at" | "sort_order" | "created_at" | "updated_at">; Update: Partial<ArticleRow>; Relationships: EmptyRelationships; };
      research_reports: { Row: ResearchReportRow; Insert: WithDefaults<ResearchReportRow, "id" | "subtitle" | "file_url" | "is_published" | "sort_order" | "created_at">; Update: Partial<ResearchReportRow>; Relationships: EmptyRelationships; };
      standards: { Row: StandardRow; Insert: WithDefaults<StandardRow, "id" | "sort_order" | "created_at">; Update: Partial<StandardRow>; Relationships: EmptyRelationships; };
      testimonials: { Row: TestimonialRow; Insert: WithDefaults<TestimonialRow, "id" | "author_title" | "company" | "is_featured" | "sort_order" | "created_at">; Update: Partial<TestimonialRow>; Relationships: EmptyRelationships; };
      ecosystem_partners: { Row: EcosystemPartnerRow; Insert: WithDefaults<EcosystemPartnerRow, "id" | "icon_svg" | "sort_order" | "created_at">; Update: Partial<EcosystemPartnerRow>; Relationships: EmptyRelationships; };
      ecosystem_case_studies: { Row: EcosystemCaseStudyRow; Insert: WithDefaults<EcosystemCaseStudyRow, "id" | "sort_order" | "created_at">; Update: Partial<EcosystemCaseStudyRow>; Relationships: EmptyRelationships; };
      contact_submissions: { Row: ContactSubmissionRow; Insert: WithDefaults<ContactSubmissionRow, "id" | "organization" | "phone" | "service_interest" | "status" | "created_at">; Update: Partial<ContactSubmissionRow>; Relationships: EmptyRelationships; };
      case_videos: { Row: CaseVideoRow; Insert: WithDefaults<CaseVideoRow, "id" | "sort_order" | "is_active" | "created_at">; Update: Partial<CaseVideoRow>; Relationships: EmptyRelationships; };
      photo_galleries: { Row: PhotoGalleryRow; Insert: WithDefaults<PhotoGalleryRow, "id" | "slug" | "description" | "location" | "event_date" | "is_published" | "sort_order" | "created_at" | "updated_at">; Update: Partial<PhotoGalleryRow>; Relationships: EmptyRelationships; };
      gallery_images: { Row: GalleryImageRow; Insert: WithDefaults<GalleryImageRow, "id" | "caption" | "sort_order" | "created_at">; Update: Partial<GalleryImageRow>; Relationships: EmptyRelationships; };
      admin_users: { Row: AdminUserRow; Insert: WithDefaults<AdminUserRow, "id" | "created_at">; Update: Partial<AdminUserRow>; Relationships: EmptyRelationships; };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
}