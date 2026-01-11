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
      api_usage: {
        Row: {
          api_type: string
          cost: number
          created_at: string | null
          id: string
          image_hash: string | null
          workspace_id: string
          conversation_id: string | null
        }
        Insert: {
          api_type: string
          cost: number
          created_at?: string | null
          id?: string
          image_hash?: string | null
          workspace_id: string
          conversation_id?: string | null
        }
        Update: {
          api_type?: string
          cost?: number
          created_at?: string | null
          id?: string
          image_hash?: string | null
          workspace_id?: string
          conversation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_usage_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          }
        ]
      }
      conversations: {
        Row: {
          bot_pause_until: string | null
          control_mode: string | null
          created_at: string | null
          customer_id: string
          customer_name: string | null
          customer_profile_pic_url: string | null
          fb_page_id: string
          id: string
          is_test: boolean | null
          last_manual_reply_at: string | null
          last_manual_reply_by: string | null
          last_message_at: string | null
          state: string | null
          workspace_id: string
          outcome: string | null
          needs_manual_response: boolean | null
          manual_flag_reason: string | null
          manual_flagged_at: string | null
        }
        Insert: {
          bot_pause_until?: string | null
          control_mode?: string | null
          created_at?: string | null
          customer_id: string
          customer_name?: string | null
          customer_profile_pic_url?: string | null
          fb_page_id: string
          id?: string
          is_test?: boolean | null
          last_manual_reply_at?: string | null
          last_manual_reply_by?: string | null
          last_message_at?: string | null
          state?: string | null
          workspace_id: string
          outcome?: string | null
          needs_manual_response?: boolean | null
          manual_flag_reason?: string | null
          manual_flagged_at?: string | null
        }
        Update: {
          bot_pause_until?: string | null
          control_mode?: string | null
          created_at?: string | null
          customer_id?: string
          customer_name?: string | null
          customer_profile_pic_url?: string | null
          fb_page_id?: string
          id?: string
          is_test?: boolean | null
          last_manual_reply_at?: string | null
          last_manual_reply_by?: string | null
          last_message_at?: string | null
          state?: string | null
          workspace_id?: string
          outcome?: string | null
          needs_manual_response?: boolean | null
          manual_flag_reason?: string | null
          manual_flagged_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_fb_page_id_fkey"
            columns: ["fb_page_id"]
            isOneToOne: false
            referencedRelation: "facebook_pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      facebook_pages: {
        Row: {
          access_token: string
          bot_enabled: boolean | null
          created_at: string | null
          id: string
          name: string
          page_id: string
          status: string | null
          workspace_id: string
        }
        Insert: {
          access_token: string
          bot_enabled?: boolean | null
          created_at?: string | null
          id?: string
          name: string
          page_id: string
          status?: string | null
          workspace_id: string
        }
        Update: {
          access_token?: string
          bot_enabled?: boolean | null
          created_at?: string | null
          id?: string
          name?: string
          page_id?: string
          status?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facebook_pages_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      image_recognition_cache: {
        Row: {
          created_at: string | null
          id: string
          image_hash: string
          recognition_result: Json
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_hash: string
          recognition_result: Json
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_hash?: string
          recognition_result?: Json
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "image_recognition_cache_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          conversation_id: string
          created_at: string | null
          id: string
          message_text: string | null
          message_type: string | null
          sender: string
          sender_type: string | null
        }
        Insert: {
          attachments?: Json | null
          conversation_id: string
          created_at?: string | null
          id?: string
          message_text?: string | null
          message_type?: string | null
          sender: string
          sender_type?: string | null
        }
        Update: {
          attachments?: Json | null
          conversation_id?: string
          created_at?: string | null
          id?: string
          message_text?: string | null
          message_type?: string | null
          sender?: string
          sender_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          order_id: string
          price: number
          product_id: string | null
          product_image: string | null
          product_name: string
          quantity: number
          size: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          order_id: string
          price: number
          product_id?: string | null
          product_image?: string | null
          product_name: string
          quantity: number
          size?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          order_id?: string
          price?: number
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          quantity?: number
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          collection_style: string | null
          conversation_id: string
          created_at: string | null
          customer_address: string | null
          customer_name: string | null
          customer_phone: string | null
          fb_page_id: string
          id: string
          notes: string | null
          payment_digits: string | null
          product_color: string | null
          product_id: string | null
          product_image: string | null
          product_name: string
          product_size: string | null
          quantity: number
          status: string
          total_price: number
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          collection_style?: string | null
          conversation_id: string
          created_at?: string | null
          customer_address?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          fb_page_id: string
          id?: string
          notes?: string | null
          payment_digits?: string | null
          product_color?: string | null
          product_id?: string | null
          product_image?: string | null
          product_name: string
          product_size?: string | null
          quantity: number
          status?: string
          total_price: number
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          collection_style?: string | null
          conversation_id?: string
          created_at?: string | null
          customer_address?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          fb_page_id?: string
          id?: string
          notes?: string | null
          payment_digits?: string | null
          product_color?: string | null
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          product_size?: string | null
          quantity?: number
          status?: string
          total_price?: number
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_fb_page_id_fkey"
            columns: ["fb_page_id"]
            isOneToOne: false
            referencedRelation: "facebook_pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_history: {
        Row: {
          id: string
          workspace_id: string
          amount: number
          payment_method: string
          transaction_id: string | null
          payment_proof_url: string | null
          plan_activated: string
          duration_days: number
          notes: string | null
          activated_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          workspace_id: string
          amount: number
          payment_method?: string
          transaction_id?: string | null
          payment_proof_url?: string | null
          plan_activated: string
          duration_days?: number
          notes?: string | null
          activated_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          workspace_id?: string
          amount?: number
          payment_method?: string
          transaction_id?: string | null
          payment_proof_url?: string | null
          plan_activated?: string
          duration_days?: number
          notes?: string | null
          activated_by?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      pre_registrations: {
        Row: {
          business_name: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone: string
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          colors: string[] | null
          created_at: string | null
          description: string | null
          id: string
          image_urls: string[] | null
          name: string
          price: number
          requires_size_selection: boolean | null
          search_keywords: string | null
          size_stock: Json | null
          sizes: string[] | null
          stock_quantity: number | null
          updated_at: string | null
          variant_stock: Json | null
          variations: Json | null
          workspace_id: string
        }
        Insert: {
          colors?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          name: string
          price: number
          requires_size_selection?: boolean | null
          search_keywords?: string | null
          size_stock?: Json | null
          sizes?: string[] | null
          stock_quantity?: number | null
          updated_at?: string | null
          variant_stock?: Json | null
          variations?: Json | null
          workspace_id: string
        }
        Update: {
          colors?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          name?: string
          price?: number
          requires_size_selection?: boolean | null
          search_keywords?: string | null
          size_stock?: Json | null
          sizes?: string[] | null
          stock_quantity?: number | null
          updated_at?: string | null
          variant_stock?: Json | null
          variations?: Json | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          business_name: string | null
          created_at: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
        }
        Relationships: []
      }
      workspace_members: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      workspace_settings: {
        Row: {
          ai_context: string | null
          ai_greeting: string | null
          ai_personality: string | null
          created_at: string | null
          id: string
          out_of_stock_message: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          ai_context?: string | null
          ai_greeting?: string | null
          ai_personality?: string | null
          created_at?: string | null
          id?: string
          out_of_stock_message?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          ai_context?: string | null
          ai_greeting?: string | null
          ai_personality?: string | null
          created_at?: string | null
          id?: string
          out_of_stock_message?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_settings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      workspaces: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string
          subscription_status: string | null
          subscription_plan: string | null
          trial_ends_at: string | null
          subscription_expires_at: string | null
          admin_paused: boolean | null
          admin_paused_at: string | null
          admin_paused_reason: string | null
          last_payment_date: string | null
          last_payment_amount: number | null
          last_payment_method: string | null
          total_paid: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id: string
          subscription_status?: string | null
          subscription_plan?: string | null
          trial_ends_at?: string | null
          subscription_expires_at?: string | null
          admin_paused?: boolean | null
          admin_paused_at?: string | null
          admin_paused_reason?: string | null
          last_payment_date?: string | null
          last_payment_amount?: number | null
          last_payment_method?: string | null
          total_paid?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string
          subscription_status?: string | null
          subscription_plan?: string | null
          trial_ends_at?: string | null
          subscription_expires_at?: string | null
          admin_paused?: boolean | null
          admin_paused_at?: string | null
          admin_paused_reason?: string | null
          last_payment_date?: string | null
          last_payment_amount?: number | null
          last_payment_method?: string | null
          total_paid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workspaces_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
