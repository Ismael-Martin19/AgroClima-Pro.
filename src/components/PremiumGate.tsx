"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { Lock, Crown, Zap } from 'lucide-react'

interface PremiumGateProps {
  children: React.ReactNode
  feature: string
  onUpgrade: () => void
}

export default function PremiumGate({ children, feature, onUpgrade }: PremiumGateProps) {
  const { hasPremiuAccess } = useAuth()

  if (hasPremiuAccess) {
    return <>{children}</>
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-100/50" />
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Crown className="h-5 w-5" />
          Recurso Premium
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="text-center space-y-4">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-yellow-200">
            <Lock className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              {feature}
            </h3>
            <p className="text-sm text-yellow-700 mb-4">
              Este recurso está disponível apenas para usuários Premium. 
              Upgrade agora e tenha acesso completo ao AgroClima Pro!
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                <Crown className="mr-2 h-4 w-4" />
                Fazer Upgrade - R$ 14,90/mês
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-yellow-700">
                <Zap className="h-3 w-3" />
                <span>Acesso instantâneo • Cancele quando quiser</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/60 p-2 rounded border border-yellow-200">
              <div className="font-medium text-yellow-800">✅ Incluído no Premium:</div>
              <div className="text-yellow-700">Monitoramento completo</div>
            </div>
            <div className="bg-white/60 p-2 rounded border border-yellow-200">
              <div className="font-medium text-yellow-800">🤖 IA Avançada:</div>
              <div className="text-yellow-700">Análises preditivas</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}