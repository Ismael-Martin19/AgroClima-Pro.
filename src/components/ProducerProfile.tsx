"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { 
  User, 
  Mail, 
  Calendar, 
  Crown, 
  Settings,
  MapPin,
  Wheat,
  BarChart3
} from 'lucide-react'

export default function ProducerProfile() {
  const { user, hasPremiuAccess } = useAuth()

  const profileData = {
    name: user?.email?.split('@')[0] || 'Produtor',
    email: user?.email || '',
    farm: 'Fazenda São José',
    location: 'Rio Grande do Sul, Brasil',
    totalArea: '135 hectares',
    cultures: ['Soja', 'Milho', 'Arroz'],
    memberSince: '2024',
    totalHarvests: 8
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Perfil do Produtor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold capitalize">{profileData.name}</h3>
                  <div className="flex items-center gap-2">
                    {hasPremiuAccess ? (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="outline">Gratuito</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profileData.farm} - {profileData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Membro desde {profileData.memberSince}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Informações da Propriedade</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Área Total</span>
                  </div>
                  <p className="text-lg font-bold text-green-800">{profileData.totalArea}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wheat className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Safras</span>
                  </div>
                  <p className="text-lg font-bold text-blue-800">{profileData.totalHarvests}</p>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Culturas Principais</h5>
                <div className="flex gap-2">
                  {profileData.cultures.map((culture, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                      {culture}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas de Uso */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Estatísticas de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">247</p>
              <p className="text-sm text-blue-700">Consultas Climáticas</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {hasPremiuAccess ? '89' : '0'}
              </p>
              <p className="text-sm text-green-700">Alertas Recebidos</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {hasPremiuAccess ? '34' : '0'}
              </p>
              <p className="text-sm text-yellow-700">Recomendações Aplicadas</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {hasPremiuAccess ? '12' : '0'}
              </p>
              <p className="text-sm text-purple-700">Análises de Cenário</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações por Email</h4>
                <p className="text-sm text-gray-600">Receber alertas importantes por email</p>
              </div>
              <Button variant="outline" size="sm">
                {hasPremiuAccess ? 'Ativo' : 'Premium'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Alertas Push</h4>
                <p className="text-sm text-gray-600">Notificações em tempo real no dispositivo</p>
              </div>
              <Button variant="outline" size="sm">
                {hasPremiuAccess ? 'Ativo' : 'Premium'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Relatórios Semanais</h4>
                <p className="text-sm text-gray-600">Resumo semanal das condições</p>
              </div>
              <Button variant="outline" size="sm">
                {hasPremiuAccess ? 'Ativo' : 'Premium'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}