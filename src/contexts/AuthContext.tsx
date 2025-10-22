"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { authService, AuthUser } from '@/lib/auth'
import { supabase, isConfigured } from '@/lib/supabase'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signOut: () => Promise<void>
  hasPremiuAccess: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasPremiuAccess, setHasPremiuAccess] = useState(false)

  const refreshUser = async () => {
    try {
      if (!isConfigured) {
        setUser(null)
        setHasPremiuAccess(false)
        setLoading(false)
        return
      }

      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
      
      if (currentUser) {
        const hasAccess = await authService.hasPremiuAccess(currentUser.id)
        setHasPremiuAccess(hasAccess)
      } else {
        setHasPremiuAccess(false)
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
      setUser(null)
      setHasPremiuAccess(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Carregar usuário inicial
    refreshUser()

    if (!isConfigured) {
      return
    }

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await refreshUser()
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setHasPremiuAccess(false)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password)
    if (!result.error) {
      await refreshUser()
    }
    return result
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const result = await authService.signUp(email, password, fullName)
    if (!result.error) {
      await refreshUser()
    }
    return result
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
    setHasPremiuAccess(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        hasPremiuAccess,
        refreshUser,
      }}
    >
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