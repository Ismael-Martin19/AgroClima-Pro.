'use client'

import { useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/AuthModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  LogOut,
  User,
  Crown,
  Wheat,
  TrendingUp,
  MapPin,
  Calendar,
  Leaf,
  Sun,
  CloudRain
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const { user, profile, loading, signOut } = useAuth()
  const [weatherData, setWeatherData] = useState<any>(null)

  // Dados simulados para demonstração
  const mockWeatherData = {
    location: "Fazenda São João - Ribeirão Preto, SP",
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      pressure: 1013,
      visibility: 10,
      condition: "Parcialmente nublado",
      icon: "partly-cloudy"
    },
    forecast: [
      { day: "Hoje", high: 32, low: 18, condition: "Sol", icon: "sunny", rain: 0 },
      { day: "Amanhã", high: 29, low: 16, condition: "Nublado", icon: "cloudy", rain: 20 },
      { day: "Quinta", high: 26, low: 14, condition: "Chuva", icon: "rainy", rain: 80 },
      { day: "Sexta", high: 31, low: 19, condition: "Sol", icon: "sunny", rain: 5 },
      { day: "Sábado", high: 33, low: 21, condition: "Sol", icon: "sunny", rain: 0 }
    ]
  }

  const mockFarmData = [
    {
      id: 1,
      name: "Talhão Norte",
      crop: "Soja",
      area: 45.5,
      plantingDate: "2024-10-15",
      status: "Crescimento",
      health: 92
    },
    {
      id: 2,
      name: "Talhão Sul",
      crop: "Milho",
      area: 38.2,
      plantingDate: "2024-09-20",
      status: "Floração",
      health: 88
    },
    {
      id: 3,
      name: "Talhão Leste",
      crop: "Algodão",
      area: 52.1,
      plantingDate: "2024-11-01",
      status: "Plantio",
      health: 95
    }
  ]

  useEffect(() => {
    // Simular carregamento de dados meteorológicos
    setTimeout(() => {
      setWeatherData(mockWeatherData)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthModal />
  }

  const isPremium = profile?.subscription_type === 'premium'

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop&crop=center")'
      }}
    >
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-blue-900/30 to-green-800/40"></div>
      
      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Wheat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                AgroClima Pro
              </h1>
              <p className="text-white/80">
                Bem-vindo, {profile?.full_name || user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge 
              variant={isPremium ? "default" : "secondary"}
              className={`${
                isPremium 
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white" 
                  : "bg-white/20 text-white backdrop-blur-sm"
              } px-3 py-1`}
            >
              {isPremium ? (
                <>
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </>
              ) : (
                'Gratuito'
              )}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Condições Atuais */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <CardTitle className="text-white">Condições Atuais</CardTitle>
            </div>
            <CardDescription className="text-white/80">
              {weatherData?.location || "Carregando localização..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {weatherData ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <Thermometer className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                  <p className="text-2xl font-bold">{weatherData.current.temperature}°C</p>
                  <p className="text-sm text-white/80">Temperatura</p>
                </div>
                <div className="text-center">
                  <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
                  <p className="text-sm text-white/80">Umidade</p>
                </div>
                <div className="text-center">
                  <Wind className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-2xl font-bold">{weatherData.current.windSpeed}</p>
                  <p className="text-sm text-white/80">km/h</p>
                </div>
                <div className="text-center">
                  <Gauge className="w-8 h-8 mx-auto mb-2 text-purple-300" />
                  <p className="text-2xl font-bold">{weatherData.current.pressure}</p>
                  <p className="text-sm text-white/80">hPa</p>
                </div>
                <div className="text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-green-300" />
                  <p className="text-2xl font-bold">{weatherData.current.visibility}</p>
                  <p className="text-sm text-white/80">km</p>
                </div>
                <div className="text-center">
                  <Cloud className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-lg font-bold">{weatherData.current.condition}</p>
                  <p className="text-sm text-white/80">Condição</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white/80">Carregando dados meteorológicos...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Previsão do Tempo */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Previsão dos Próximos Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weatherData ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day: any, index: number) => (
                  <div key={index} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="font-semibold mb-2">{day.day}</p>
                    <div className="mb-2">
                      {day.icon === 'sunny' && <Sun className="w-8 h-8 mx-auto text-yellow-300" />}
                      {day.icon === 'cloudy' && <Cloud className="w-8 h-8 mx-auto text-gray-300" />}
                      {day.icon === 'rainy' && <CloudRain className="w-8 h-8 mx-auto text-blue-300" />}
                      {day.icon === 'partly-cloudy' && <Cloud className="w-8 h-8 mx-auto text-gray-300" />}
                    </div>
                    <p className="text-sm">{day.condition}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{day.high}°</span>
                      <span className="text-white/60">{day.low}°</span>
                    </div>
                    <p className="text-xs text-blue-300 mt-1">{day.rain}% chuva</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-white/80">Carregando previsão...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seção Premium */}
        {isPremium ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Monitoramento de Talhões */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wheat className="w-5 h-5" />
                  Monitoramento de Talhões
                </CardTitle>
                <CardDescription className="text-white/80">
                  Status das suas culturas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFarmData.map((farm) => (
                    <div key={farm.id} className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{farm.name}</h4>
                          <p className="text-sm text-white/80">{farm.crop} • {farm.area} ha</p>
                        </div>
                        <Badge 
                          variant="secondary"
                          className="bg-green-500/20 text-green-300 border-green-500/30"
                        >
                          {farm.health}% saudável
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-white/80">
                        <span>Plantio: {new Date(farm.plantingDate).toLocaleDateString('pt-BR')}</span>
                        <span>Status: {farm.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Análise por IA */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Análise por IA
                </CardTitle>
                <CardDescription className="text-white/80">
                  Insights inteligentes para sua fazenda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-500/30">
                    <div className="flex items-start gap-3">
                      <Droplets className="w-5 h-5 text-blue-300 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-300">Irrigação Recomendada</h4>
                        <p className="text-sm text-white/80 mt-1">
                          Com base na previsão de chuva, recomendamos irrigação no Talhão Norte nos próximos 2 dias.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/20 rounded-lg backdrop-blur-sm border border-green-500/30">
                    <div className="flex items-start gap-3">
                      <Leaf className="w-5 h-5 text-green-300 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-300">Condições Ideais</h4>
                        <p className="text-sm text-white/80 mt-1">
                          As condições estão perfeitas para o crescimento da soja. Mantenha o monitoramento atual.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-500/30">
                    <div className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-yellow-300 mt-1" />
                      <div>
                        <h4 className="font-semibold text-yellow-300">Alerta de Temperatura</h4>
                        <p className="text-sm text-white/80 mt-1">
                          Temperaturas altas previstas para sexta-feira. Considere irrigação adicional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Seção para usuários gratuitos */
          <Card className="mb-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border-yellow-500/30 text-white">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-300" />
                Desbloqueie Recursos Premium
              </CardTitle>
              <CardDescription className="text-white/80">
                Acesse monitoramento avançado, análise por IA e muito mais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Wheat className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <h4 className="font-semibold mb-1">Monitoramento de Talhões</h4>
                  <p className="text-sm text-white/80">Acompanhe suas culturas em tempo real</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-300" />
                  <h4 className="font-semibold mb-1">Análise por IA</h4>
                  <p className="text-sm text-white/80">Insights inteligentes para sua fazenda</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Cloud className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <h4 className="font-semibold mb-1">Previsões Avançadas</h4>
                  <p className="text-sm text-white/80">Previsões de 15 dias e alertas personalizados</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3 shadow-lg"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade para Premium
                </Button>
                <p className="text-sm text-white/60 mt-2">
                  7 dias grátis • Cancele a qualquer momento
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-white/60 text-sm">
          <p>© 2024 AgroClima Pro. Agricultura inteligente para o futuro.</p>
        </div>
      </div>
    </div>
  )
}