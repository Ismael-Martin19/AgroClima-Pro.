'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, UserProfile, isSupabaseConfigured } from '@/lib/supabase'
import { AuthService } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isConfigured: boolean
  signIn: (email: string, password: string) => Promise<{ data: any, error: any }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ data: any, error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)

  // Verificar configuração do Supabase
  useEffect(() => {
    const configured = isSupabaseConfigured()
    setIsConfigured(configured)
    
    if (!configured) {
      setLoading(false)
      console.warn('⚠️ Supabase não configurado. Funcionalidades de autenticação desabilitadas.')
    }
  }, [])

  // Carregar perfil do usuário
  const loadUserProfile = async (userId: string) => {
    if (!isSupabaseConfigured()) return

    try {
      const { data, error } = await AuthService.getUserProfile(userId)
      if (error) {
        console.error('Erro ao carregar perfil:', error)
        return
      }
      setProfile(data)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    }
  }

  // Atualizar perfil
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !isSupabaseConfigured()) return

    try {
      const { data, error } = await AuthService.updateUserProfile(user.id, updates)
      if (error) {
        console.error('Erro ao atualizar perfil:', error)
        return
      }
      setProfile(data)
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
  }

  // Recarregar perfil
  const refreshProfile = async () => {
    if (!user || !isSupabaseConfigured()) return
    await loadUserProfile(user.id)
  }

  // Login
  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase não configurado') }
    }

    try {
      const result = await AuthService.signIn(email, password)
      if (result.data?.user) {
        setUser(result.data.user)
        await loadUserProfile(result.data.user.id)
      }
      return result
    } catch (error) {
      return { data: null, error }
    }
  }

  // Registro
  const signUp = async (email: string, password: string, fullName?: string) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase não configurado') }
    }

    try {
      const result = await AuthService.signUp(email, password, fullName)
      if (result.data?.user) {
        setUser(result.data.user)
        await loadUserProfile(result.data.user.id)
      }
      return result
    } catch (error) {
      return { data: null, error }
    }
  }

  // Logout
  const signOut = async () => {
    if (!isSupabaseConfigured()) return

    try {
      await AuthService.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  // Verificar estado de autenticação
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    // Verificar usuário atual
    const checkUser = async () => {
      try {
        const { user: currentUser } = await AuthService.getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          await loadUserProfile(currentUser.id)
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [isConfigured])

  const value = {
    user,
    profile,
    loading,
    isConfigured,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}