import { createClient } from '@supabase/supabase-js'

// Configuração segura do Supabase com fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Verificar se as variáveis estão configuradas
const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Flag para verificar se o Supabase está configurado
export const isConfigured = isSupabaseConfigured

// Tipos para o sistema de assinatura
export interface UserProfile {
  id: string
  email: string
  full_name: string
  subscription_status: 'free' | 'premium'
  subscription_end_date?: string
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  status: 'active' | 'canceled' | 'expired'
  plan: 'free' | 'premium'
  price: number
  start_date: string
  end_date: string
  payment_method?: string
  created_at: string
}