"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import { authService } from '@/lib/auth'
import { 
  Crown, 
  CreditCard, 
  Calendar, 
  Check, 
  X, 
  Loader2,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react'

export default function SubscriptionModal() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, hasPremiuAccess, refreshUser } = useAuth()

  const handleSubscribe = async () => {
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const { error } = await authService.createSubscription(user.id)
      if (error) {
        setError('Erro ao processar assinatura. Tente novamente.')
      } else {
        await refreshUser()
        alert('Assinatura ativada com sucesso! 🎉')
      }
    } catch (err) {
      setError('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!user) return

    const confirmed = confirm('Tem certeza que deseja cancelar sua assinatura?')
    if (!confirmed) return

    setLoading(true)
    setError('')

    try {
      const { error } = await authService.cancelSubscription(user.id)
      if (error) {
        setError('Erro ao cancelar assinatura. Tente novamente.')
      } else {
        await refreshUser()
        alert('Assinatura cancelada com sucesso.')
      }
    } catch (err) {
      setError('Erro ao cancelar assinatura. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const features = {
    free: [
      'Previsão do tempo básica',
      'Condições climáticas atuais',
      'Previsão 7 dias',
      'Alertas básicos de clima'
    ],
    premium: [
      'Tudo do plano gratuito',
      'Monitoramento de talhões',
      'Análise de cenários IA',
      'Preços de mercado em tempo real',
      'Recomendações inteligentes',
      'Alertas personalizados',
      'Mapas interativos',
      'Análise NDVI',
      'Suporte prioritário',
      'Relatórios detalhados'
    ]
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-800 flex items-center justify-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            Upgrade para Premium
          </CardTitle>
          <p className="text-gray-600">
            Desbloqueie todo o potencial do AgroClima Pro
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Plano Gratuito */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Plano Gratuito</CardTitle>
                  <Badge variant="secondary">Atual</Badge>
                </div>
                <div className="text-3xl font-bold">R$ 0</div>
                <p className="text-gray-600">Para sempre</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.free.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="outline" className="w-full" disabled>
                    Plano Atual
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="border-2 border-green-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-500 text-white px-3 py-1 text-sm font-medium">
                <Sparkles className="h-4 w-4 inline mr-1" />
                Mais Popular
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-green-800">Plano Premium</CardTitle>
                  {hasPremiuAccess && (
                    <Badge className="bg-green-500">Ativo</Badge>
                  )}
                </div>
                <div className="text-3xl font-bold text-green-600">R$ 14,90</div>
                <p className="text-gray-600">Por mês</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.premium.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {hasPremiuAccess ? (
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full" disabled>
                        <Crown className="h-4 w-4 mr-2" />
                        Assinatura Ativa
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full" 
                        onClick={handleCancelSubscription}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Cancelando...
                          </>
                        ) : (
                          'Cancelar Assinatura'
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      onClick={handleSubscribe}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Assinar Agora
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <X className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Benefícios Premium */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Por que escolher o Premium?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-800">Proteção Total</h4>
                <p className="text-sm text-gray-600">Alertas avançados protegem sua lavoura</p>
              </div>
              <div className="text-center">
                <Sparkles className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-800">IA Avançada</h4>
                <p className="text-sm text-gray-600">Análises preditivas e recomendações</p>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-800">Planejamento</h4>
                <p className="text-sm text-gray-600">Otimize suas operações agrícolas</p>
              </div>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>✅ Cancele a qualquer momento</p>
            <p>✅ Suporte 24/7</p>
            <p>✅ Atualizações gratuitas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}