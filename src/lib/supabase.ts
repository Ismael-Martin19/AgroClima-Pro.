import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificação de configuração com fallback seguro
let supabaseClient = null

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    console.warn('⚠️ Supabase não configurado. Configure as variáveis de ambiente nas configurações do projeto.')
  }
} catch (error) {
  console.error('Erro ao inicializar Supabase:', error)
  supabaseClient = null
}

export const supabase = supabaseClient

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabase !== null && supabaseUrl && supabaseAnonKey
}

// Tipos para o banco de dados
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_type: 'free' | 'premium'
  subscription_status: 'active' | 'inactive' | 'cancelled'
  subscription_expires_at?: string
  created_at: string
  updated_at: string
}

export interface FarmData {
  id: string
  user_id: string
  farm_name: string
  location?: string
  crop_type?: string
  area_hectares?: number
  planting_date?: string
  harvest_date?: string
  weather_data?: any
  soil_data?: any
  notes?: string
  created_at: string
  updated_at: string
}

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
      }
      farm_data: {
        Row: FarmData
        Insert: Omit<FarmData, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<FarmData, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}