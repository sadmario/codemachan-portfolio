// ============================================================
// Supabase TypeScript Types - Auto-generated from schema
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string | null
          name: string
          title: string
          bio: string | null
          bio_short: string | null
          avatar_url: string | null
          email: string | null
          phone: string | null
          location: string | null
          website_url: string | null
          availability_status: 'available' | 'busy' | 'unavailable'
          years_experience: number
          student_year: string | null
          institution: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name?: string
          title?: string
          bio?: string | null
          bio_short?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          website_url?: string | null
          availability_status?: 'available' | 'busy' | 'unavailable'
          years_experience?: number
          student_year?: string | null
          institution?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          title?: string
          bio?: string | null
          bio_short?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          website_url?: string | null
          availability_status?: 'available' | 'busy' | 'unavailable'
          years_experience?: number
          student_year?: string | null
          institution?: string | null
          is_admin?: boolean
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string
          sort_order?: number
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          color?: string
          sort_order?: number
        }
      }
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          short_description: string
          description: string | null
          problem: string | null
          solution: string | null
          results: string | null
          category_id: string | null
          status: 'in_progress' | 'completed' | 'archived' | 'planned'
          github_url: string | null
          live_url: string | null
          tech_stack: string[]
          key_features: string[]
          architecture: string | null
          featured: boolean
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          short_description: string
          description?: string | null
          problem?: string | null
          solution?: string | null
          results?: string | null
          category_id?: string | null
          status?: 'in_progress' | 'completed' | 'archived' | 'planned'
          github_url?: string | null
          live_url?: string | null
          tech_stack?: string[]
          key_features?: string[]
          architecture?: string | null
          featured?: boolean
          published?: boolean
          sort_order?: number
        }
        Update: {
          slug?: string
          title?: string
          short_description?: string
          description?: string | null
          problem?: string | null
          solution?: string | null
          results?: string | null
          category_id?: string | null
          status?: 'in_progress' | 'completed' | 'archived' | 'planned'
          github_url?: string | null
          live_url?: string | null
          tech_stack?: string[]
          key_features?: string[]
          architecture?: string | null
          featured?: boolean
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          url: string
          alt: string | null
          caption: string | null
          is_thumbnail: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          url: string
          alt?: string | null
          caption?: string | null
          is_thumbnail?: boolean
          sort_order?: number
        }
        Update: {
          url?: string
          alt?: string | null
          caption?: string | null
          is_thumbnail?: boolean
          sort_order?: number
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: 'frontend' | 'backend' | 'tools' | 'design' | 'other'
          proficiency: number
          icon: string | null
          color: string
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'frontend' | 'backend' | 'tools' | 'design' | 'other'
          proficiency?: number
          icon?: string | null
          color?: string
          published?: boolean
          sort_order?: number
        }
        Update: {
          name?: string
          category?: 'frontend' | 'backend' | 'tools' | 'design' | 'other'
          proficiency?: number
          icon?: string | null
          color?: string
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          technologies: string[]
          deliverables: string[]
          icon: string | null
          color: string
          price_from: number | null
          price_label: string | null
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          short_description?: string | null
          technologies?: string[]
          deliverables?: string[]
          icon?: string | null
          color?: string
          price_from?: number | null
          price_label?: string | null
          published?: boolean
          sort_order?: number
        }
        Update: {
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          technologies?: string[]
          deliverables?: string[]
          icon?: string | null
          color?: string
          price_from?: number | null
          price_label?: string | null
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          organization: string | null
          avatar_url: string | null
          content: string
          rating: number
          project_id: string | null
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role?: string | null
          organization?: string | null
          avatar_url?: string | null
          content: string
          rating?: number
          project_id?: string | null
          published?: boolean
          sort_order?: number
        }
        Update: {
          name?: string
          role?: string | null
          organization?: string | null
          avatar_url?: string | null
          content?: string
          rating?: number
          project_id?: string | null
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          project_type: 'website' | 'web_app' | 'backend_api' | 'portfolio' | 'student_project' | 'saas' | 'other'
          budget_range: string | null
          timeline: string | null
          message: string
          preferred_contact: 'email' | 'phone' | 'whatsapp'
          status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived'
          admin_notes: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          project_type: 'website' | 'web_app' | 'backend_api' | 'portfolio' | 'student_project' | 'saas' | 'other'
          budget_range?: string | null
          timeline?: string | null
          message: string
          preferred_contact?: 'email' | 'phone' | 'whatsapp'
          status?: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived'
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          status?: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived'
          admin_notes?: string | null
          updated_at?: string
        }
      }
      social_links: {
        Row: {
          id: string
          platform: string
          url: string
          icon: string | null
          label: string | null
          published: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          platform: string
          url: string
          icon?: string | null
          label?: string | null
          published?: boolean
          sort_order?: number
        }
        Update: {
          platform?: string
          url?: string
          icon?: string | null
          label?: string | null
          published?: boolean
          sort_order?: number
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string | null
          value_json: Json | null
          description: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: string | null
          value_json?: Json | null
          description?: string | null
        }
        Update: {
          key?: string
          value?: string | null
          value_json?: Json | null
          description?: string | null
          updated_at?: string
        }
      }
      user_stores: {
        Row: {
          id: string
          user_email: string
          store_name: string
          settings: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_email: string
          store_name: string
          settings?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_email?: string
          store_name?: string
          settings?: Json | null
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          store_id: string | null
          sender_name: string
          sender_email: string
          service: string | null
          timeline: string | null
          message: string
          target_email: string
          status: string
          email_sent: boolean
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          store_id?: string | null
          sender_name: string
          sender_email: string
          service?: string | null
          timeline?: string | null
          message: string
          target_email?: string
          status?: string
          email_sent?: boolean
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          store_id?: string | null
          sender_name?: string
          sender_email?: string
          service?: string | null
          timeline?: string | null
          message?: string
          target_email?: string
          status?: string
          email_sent?: boolean
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectImage = Database['public']['Tables']['project_images']['Row']
export type Skill = Database['public']['Tables']['skills']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type SocialLink = Database['public']['Tables']['social_links']['Row']
export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
export type UserStore = Database['public']['Tables']['user_stores']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']

// Extended types with relations
export type ProjectWithCategory = Project & {
  category: Category | null
  images: ProjectImage[]
}

export type InquiryInsert = Database['public']['Tables']['inquiries']['Insert']

