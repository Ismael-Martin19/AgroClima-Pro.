'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, User, Wheat, Leaf, Sun } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthModal() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signIn, signUp, isConfigured } = useAuth()

  // Estados do formulário de login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Estados do formulário de registro
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (!isConfigured) {
      setError('Sistema não configurado. Configure o Supabase nas configurações do projeto.')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await signIn(loginData.email, loginData.password)
      
      if (error) {
        setError('Email ou senha incorretos. Tente novamente.')
        return
      }

      if (data?.user) {
        setSuccess('Login realizado com sucesso!')
        // O redirecionamento será feito automaticamente pelo contexto
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (!isConfigured) {
      setError('Sistema não configurado. Configure o Supabase nas configurações do projeto.')
      setIsLoading(false)
      return
    }

    // Validações
    if (registerData.password !== registerData.confirmPassword) {
      setError('As senhas não coincidem.')
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await signUp(
        registerData.email,
        registerData.password,
        registerData.fullName
      )
      
      if (error) {
        if (error.message?.includes('already registered')) {
          setError('Este email já está cadastrado. Tente fazer login.')
        } else {
          setError('Erro ao criar conta. Verifique os dados e tente novamente.')
        }
        return
      }

      if (data?.user) {
        setSuccess('Conta criada com sucesso! Bem-vindo!')
        // Limpar formulário
        setRegisterData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: ''
        })
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Mostrar aviso se não configurado
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 animate-bounce">
              <Wheat className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="absolute top-20 right-20 animate-pulse">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div className="absolute bottom-20 left-20 animate-bounce delay-300">
              <Sun className="w-10 h-10 text-yellow-500" />
            </div>
            <div className="absolute bottom-10 right-10 animate-pulse delay-500">
              <Wheat className="w-7 h-7 text-green-700" />
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Wheat className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              AgroClima Pro
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sistema não configurado
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Alert className="border-orange-200 bg-orange-50">
              <AlertDescription className="text-orange-700">
                ⚠️ Para usar o sistema de autenticação, configure o Supabase nas configurações do projeto.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Fundo animado para agricultura */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 animate-bounce">
            <Wheat className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="absolute top-20 right-20 animate-pulse">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div className="absolute bottom-20 left-20 animate-bounce delay-300">
            <Sun className="w-10 h-10 text-yellow-500" />
          </div>
          <div className="absolute bottom-10 right-10 animate-pulse delay-500">
            <Wheat className="w-7 h-7 text-green-700" />
          </div>
        </div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Wheat className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            AgroClima Pro
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sua plataforma completa para agricultura inteligente
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register" className="bg-gradient-to-r from-green-500 to-yellow-500 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-yellow-600">
                Criar Conta
              </TabsTrigger>
            </TabsList>

            {/* Mensagens de erro e sucesso */}
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Tab de Login */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Tab de Registro */}
            <TabsContent value="register">
              <div className="mb-4 p-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg text-white text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wheat className="w-5 h-5" />
                  <span className="font-semibold">Oferta Especial!</span>
                </div>
                <p className="text-sm">7 dias grátis de acesso premium para novos usuários</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Seu nome completo"
                      className="pl-10"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      <Wheat className="mr-2 h-4 w-4" />
                      Criar Conta
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Ao criar uma conta, você concorda com nossos</p>
            <p>
              <span className="text-green-600 hover:underline cursor-pointer">Termos de Uso</span>
              {' e '}
              <span className="text-green-600 hover:underline cursor-pointer">Política de Privacidade</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}