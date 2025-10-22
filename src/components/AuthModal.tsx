"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, Mail, Lock, User, AlertCircle, Leaf, Wheat, Sun } from 'lucide-react'

export default function AuthModal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('login')

  const { signIn, signUp } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signUp(email, password, fullName)
      if (error) {
        setError(error.message)
      } else {
        setActiveTab('login')
        setError('')
        alert('Conta criada com sucesso! Faça login para continuar.')
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Fundo diferenciado baseado na aba ativa */}
      {activeTab === 'signup' ? (
        // Fundo especial para cadastro - agricultura
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&h=1080&fit=crop&crop=center')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/80 via-emerald-700/70 to-yellow-600/60" />
          
          {/* Elementos decorativos flutuantes */}
          <div className="absolute top-20 left-20 opacity-20">
            <Wheat className="h-16 w-16 text-yellow-300 animate-pulse" />
          </div>
          <div className="absolute top-40 right-32 opacity-20">
            <Leaf className="h-12 w-12 text-green-300 animate-bounce" />
          </div>
          <div className="absolute bottom-32 left-32 opacity-20">
            <Sun className="h-14 w-14 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute bottom-20 right-20 opacity-20">
            <Wheat className="h-10 w-10 text-green-300 animate-bounce" />
          </div>
        </>
      ) : (
        // Fundo padrão para login
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      )}

      <Card className={`w-full max-w-md relative z-10 ${
        activeTab === 'signup' 
          ? 'bg-white/95 backdrop-blur-md border-2 border-green-200/50 shadow-2xl' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              AgroClima Pro
            </CardTitle>
          </div>
          <p className="text-gray-600">
            {activeTab === 'signup' 
              ? 'Junte-se à revolução da agricultura inteligente' 
              : 'Entre ou crie sua conta para continuar'
            }
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup" className="relative">
                Criar Conta
                {activeTab === 'signup' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
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

            <TabsContent value="signup" className="space-y-4">
              {/* Banner especial para cadastro */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-200/50 mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Wheat className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Bem-vindo ao futuro da agricultura!</h3>
                    <p className="text-sm text-green-700">Tecnologia avançada para sua propriedade rural</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-green-800 font-medium">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-800 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-800 font-medium">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-green-600">Mínimo 6 caracteres</p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      <Wheat className="mr-2 h-4 w-4" />
                      Criar Minha Conta
                    </>
                  )}
                </Button>
              </form>

              {/* Benefícios do cadastro */}
              <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-green-50 rounded-lg border border-green-200/50">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  O que você ganha:
                </h4>
                <div className="space-y-1 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Previsão meteorológica detalhada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Alertas personalizados para sua região</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Análises agrometeorológicas avançadas</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className={`mt-6 p-4 rounded-lg ${
            activeTab === 'signup' 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50' 
              : 'bg-green-50'
          }`}>
            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Planos Disponíveis:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Gratuito:
                </span>
                <span className="text-green-600 font-medium">Apenas Clima</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Premium:
                </span>
                <span className="text-green-600 font-bold">R$ 14,90/mês - Acesso Total</span>
              </div>
              {activeTab === 'signup' && (
                <div className="mt-2 p-2 bg-yellow-100 rounded border border-yellow-200">
                  <p className="text-xs text-yellow-800 font-medium">
                    🎉 Primeiros 7 dias grátis para novos usuários!
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}