export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      charts: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          created_at?: string
          updated_at?: string
        }
      }
      nodes: {
        Row: {
          id: string
          chart_id: string
          type: string
          label: string
          parent_id: string | null
          completed: boolean
          position_x: number
          position_y: number
          deadline: string | null
          width: number | null
          height: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chart_id: string
          type: string
          label: string
          parent_id?: string | null
          completed?: boolean
          position_x: number
          position_y: number
          deadline?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          chart_id?: string
          type?: string
          label?: string
          parent_id?: string | null
          completed?: boolean
          position_x?: number
          position_y?: number
          deadline?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      todos: {
        Row: {
          id: string
          user_id: string
          node_id: string
          label: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          node_id: string
          label: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          node_id?: string
          label?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
