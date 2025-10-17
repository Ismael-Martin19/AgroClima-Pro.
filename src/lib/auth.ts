import { supabase, isSupabaseConfigured, UserProfile, FarmData } from './supabase'

export class AuthService {
  // Verificar se o Supabase está configurado
  private static checkConfiguration() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase não configurado. Configure nas configurações do projeto.')
    }
  }

  // Registrar novo usuário
  static async signUp(email: string, password: string, fullName?: string) {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) throw error

      // Criar perfil do usuário
      if (data.user) {
        await this.createUserProfile(data.user.id, email, fullName)
      }

      return { data, error: null }
    } catch (error) {
      console.error('Erro no registro:', error)
      return { data: null, error }
    }
  }

  // Login do usuário
  static async signIn(email: string, password: string) {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro no login:', error)
      return { data: null, error }
    }
  }

  // Logout do usuário
  static async signOut() {
    try {
      this.checkConfiguration()

      const { error } = await supabase!.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Erro no logout:', error)
      return { error }
    }
  }

  // Obter usuário atual
  static async getCurrentUser() {
    try {
      this.checkConfiguration()

      const { data: { user }, error } = await supabase!.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      console.error('Erro ao obter usuário:', error)
      return { user: null, error }
    }
  }

  // Criar perfil do usuário
  static async createUserProfile(userId: string, email: string, fullName?: string) {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!
        .from('profiles')
        .insert({
          id: userId,
          email,
          full_name: fullName,
          subscription_type: 'free',
          subscription_status: 'active'
        })
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao criar perfil:', error)
      return { data: null, error }
    }
  }

  // Obter perfil do usuário
  static async getUserProfile(userId: string): Promise<{ data: UserProfile | null, error: any }> {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao obter perfil:', error)
      return { data: null, error }
    }
  }

  // Atualizar perfil do usuário
  static async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      return { data: null, error }
    }
  }

  // Resetar senha
  static async resetPassword(email: string) {
    try {
      this.checkConfiguration()

      const { error } = await supabase!.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Erro ao resetar senha:', error)
      return { error }
    }
  }
}

export class FarmDataService {
  // Verificar se o Supabase está configurado
  private static checkConfiguration() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase não configurado. Configure nas configurações do projeto.')
    }
  }

  // Criar dados da fazenda
  static async createFarmData(farmData: Omit<FarmData, 'id' | 'created_at' | 'updated_at'>) {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!
        .from('farm_data')
        .insert(farmData)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao criar dados da fazenda:', error)
      return { data: null, error }
    }
  }

  // Obter dados da fazenda do usuário
  static async getUserFarmData(userId: string): Promise<{ data: FarmData[] | null, error: any }> {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!
        .from('farm_data')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao obter dados da fazenda:', error)
      return { data: null, error }
    }
  }

  // Atualizar dados da fazenda
  static async updateFarmData(farmId: string, updates: Partial<FarmData>) {
    try {
      this.checkConfiguration()

      const { data, error } = await supabase!
        .from('farm_data')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', farmId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao atualizar dados da fazenda:', error)
      return { data: null, error }
    }
  }

  // Deletar dados da fazenda
  static async deleteFarmData(farmId: string) {
    try {
      this.checkConfiguration()

      const { error } = await supabase!
        .from('farm_data')
        .delete()
        .eq('id', farmId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Erro ao deletar dados da fazenda:', error)
      return { error }
    }
  }
}