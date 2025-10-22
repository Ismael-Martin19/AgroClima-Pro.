import { supabase, isConfigured } from './supabase'

export interface AuthUser {
  id: string
  email: string
  subscription_status: 'free' | 'premium'
  subscription_end_date?: string
}

export const authService = {
  // Login com email e senha
  async signIn(email: string, password: string) {
    if (!isConfigured) {
      return { data: null, error: { message: 'Supabase não configurado' } }
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Registro de novo usuário
  async signUp(email: string, password: string, fullName: string) {
    if (!isConfigured) {
      return { data: null, error: { message: 'Supabase não configurado' } }
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (data.user && !error) {
      // Criar perfil do usuário
      await supabase.from('user_profiles').insert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        subscription_status: 'free',
      })
    }

    return { data, error }
  },

  // Logout
  async signOut() {
    if (!isConfigured) {
      return { error: null }
    }
    
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  async getCurrentUser() {
    if (!isConfigured) {
      return null
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      return {
        id: user.id,
        email: user.email!,
        subscription_status: profile?.subscription_status || 'free',
        subscription_end_date: profile?.subscription_end_date,
      } as AuthUser
    }

    return null
  },

  // Verificar se usuário tem acesso premium
  async hasPremiuAccess(userId: string) {
    if (!isConfigured) {
      return false
    }
    
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_status, subscription_end_date')
      .eq('id', userId)
      .single()

    if (!profile) return false

    if (profile.subscription_status === 'premium') {
      // Verificar se a assinatura ainda está válida
      if (profile.subscription_end_date) {
        const endDate = new Date(profile.subscription_end_date)
        const now = new Date()
        return endDate > now
      }
      return true
    }

    return false
  },

  // Atualizar status da assinatura
  async updateSubscriptionStatus(userId: string, status: 'free' | 'premium', endDate?: string) {
    if (!isConfigured) {
      return { data: null, error: { message: 'Supabase não configurado' } }
    }
    
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: status,
        subscription_end_date: endDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    return { data, error }
  },

  // Criar assinatura
  async createSubscription(userId: string, paymentMethod: string = 'credit_card') {
    if (!isConfigured) {
      return { data: null, error: { message: 'Supabase não configurado' } }
    }
    
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1) // 1 mês

    const { data, error } = await supabase.from('subscriptions').insert({
      user_id: userId,
      status: 'active',
      plan: 'premium',
      price: 14.90,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      payment_method: paymentMethod,
    })

    if (!error) {
      // Atualizar perfil do usuário
      await this.updateSubscriptionStatus(userId, 'premium', endDate.toISOString())
    }

    return { data, error }
  },

  // Cancelar assinatura
  async cancelSubscription(userId: string) {
    if (!isConfigured) {
      return { data: null, error: { message: 'Supabase não configurado' } }
    }
    
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('user_id', userId)
      .eq('status', 'active')

    if (!error) {
      await this.updateSubscriptionStatus(userId, 'free')
    }

    return { data, error }
  }
}