"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/AuthModal'
import SubscriptionModal from '@/components/SubscriptionModal'
import PremiumGate from '@/components/PremiumGate'
import ScenarioAnalysis from '@/components/ScenarioAnalysis'
import ProducerProfile from '@/components/ProducerProfile'
import InteractiveMap from '@/components/InteractiveMap'
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Leaf,
  Wheat,
  DollarSign,
  Calendar,
  Bell,
  Settings,
  BarChart3,
  Satellite,
  Zap,
  Brain,
  User,
  Clock,
  Crown,
  LogOut
} from 'lucide-react'

function AgroClimaProContent() {
  const [selectedTalhao, setSelectedTalhao] = useState('Talhão A')
  const [activeTab, setActiveTab] = useState('weather') // Inicia na aba clima (gratuita)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  const { user, loading, signOut, hasPremiuAccess } = useAuth()

  // Dados simulados para demonstração
  const weatherData = {
    current: {
      temp: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Parcialmente nublado',
      icon: Cloud,
      time: '14:30'
    },
    forecast: [
      { 
        day: 'Hoje', 
        temp: '28°/18°', 
        condition: 'Nublado', 
        rain: 20, 
        icon: Cloud,
        hourlyTemp: [
          { time: '06:00', temp: 18 },
          { time: '09:00', temp: 22 },
          { time: '12:00', temp: 26 },
          { time: '15:00', temp: 28 },
          { time: '18:00', temp: 25 },
          { time: '21:00', temp: 22 }
        ],
        rainTime: '16:00'
      },
      { 
        day: 'Amanhã', 
        temp: '30°/20°', 
        condition: 'Sol', 
        rain: 0, 
        icon: Sun,
        hourlyTemp: [
          { time: '06:00', temp: 20 },
          { time: '09:00', temp: 24 },
          { time: '12:00', temp: 28 },
          { time: '15:00', temp: 30 },
          { time: '18:00', temp: 27 },
          { time: '21:00', temp: 24 }
        ],
        rainTime: null
      },
      { 
        day: 'Ter', 
        temp: '26°/16°', 
        condition: 'Chuva', 
        rain: 80, 
        icon: CloudRain,
        hourlyTemp: [
          { time: '06:00', temp: 16 },
          { time: '09:00', temp: 19 },
          { time: '12:00', temp: 23 },
          { time: '15:00', temp: 26 },
          { time: '18:00', temp: 24 },
          { time: '21:00', temp: 20 }
        ],
        rainTime: '10:30'
      },
      { 
        day: 'Qua', 
        temp: '24°/14°', 
        condition: 'Chuva', 
        rain: 90, 
        icon: CloudRain,
        hourlyTemp: [
          { time: '06:00', temp: 14 },
          { time: '09:00', temp: 17 },
          { time: '12:00', temp: 21 },
          { time: '15:00', temp: 24 },
          { time: '18:00', temp: 22 },
          { time: '21:00', temp: 18 }
        ],
        rainTime: '08:15'
      },
      { 
        day: 'Qui', 
        temp: '27°/17°', 
        condition: 'Sol', 
        rain: 10, 
        icon: Sun,
        hourlyTemp: [
          { time: '06:00', temp: 17 },
          { time: '09:00', temp: 21 },
          { time: '12:00', temp: 25 },
          { time: '15:00', temp: 27 },
          { time: '18:00', temp: 25 },
          { time: '21:00', temp: 22 }
        ],
        rainTime: null
      },
      { 
        day: 'Sex', 
        temp: '29°/19°', 
        condition: 'Sol', 
        rain: 5, 
        icon: Sun,
        hourlyTemp: [
          { time: '06:00', temp: 19 },
          { time: '09:00', temp: 23 },
          { time: '12:00', temp: 27 },
          { time: '15:00', temp: 29 },
          { time: '18:00', temp: 26 },
          { time: '21:00', temp: 23 }
        ],
        rainTime: null
      },
      { 
        day: 'Sáb', 
        temp: '31°/21°', 
        condition: 'Sol', 
        rain: 0, 
        icon: Sun,
        hourlyTemp: [
          { time: '06:00', temp: 21 },
          { time: '09:00', temp: 25 },
          { time: '12:00', temp: 29 },
          { time: '15:00', temp: 31 },
          { time: '18:00', temp: 28 },
          { time: '21:00', temp: 25 }
        ],
        rainTime: null
      }
    ]
  }

  const alerts = [
    { type: 'warning', message: 'Risco de geada nas próximas 48h - Talhão C', priority: 'Alta' },
    { type: 'info', message: 'Janela ideal para aplicação de defensivos - Talhão A', priority: 'Média' },
    { type: 'danger', message: 'Previsão de granizo para quinta-feira', priority: 'Crítica' }
  ]

  const marketPrices = {
    soja: { price: 142.50, change: 2.3, trend: 'up' },
    milho: { price: 68.20, change: -1.2, trend: 'down' },
    arroz: { price: 89.40, change: 0.8, trend: 'up' }
  }

  const talhoes = [
    { name: 'Talhão A', culture: 'Soja', area: '45 ha', stage: 'Floração', health: 92 },
    { name: 'Talhão B', culture: 'Milho', area: '38 ha', stage: 'Enchimento', health: 88 },
    { name: 'Talhão C', culture: 'Arroz', area: '52 ha', stage: 'Maturação', health: 95 }
  ]

  const recommendations = [
    { action: 'Aplicar fungicida', talhao: 'Talhão A', window: 'Amanhã 06:00-10:00', reason: 'Condições ideais de vento e umidade' },
    { action: 'Irrigação preventiva', talhao: 'Talhão C', window: 'Hoje 18:00-22:00', reason: 'Estiagem prevista para próximos 5 dias' },
    { action: 'Colheita urgente', talhao: 'Talhão B', window: 'Próximos 2 dias', reason: 'Chuvas intensas previstas' }
  ]

  // Função para lidar com tentativa de acesso a recursos premium
  const handlePremiumFeatureAccess = (tabName: string) => {
    if (!hasPremiuAccess && tabName !== 'weather') {
      setShowSubscriptionModal(true)
      return false
    }
    return true
  }

  const handleTabChange = (value: string) => {
    if (handlePremiumFeatureAccess(value)) {
      setActiveTab(value)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Fundo de lavoura com overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop&crop=center')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-amber-900/50 to-blue-900/60" />
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Carregando AgroClima Pro...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthModal />
  }

  return (
    <div className="min-h-screen relative">
      {/* Fundo de lavoura com céu */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop&crop=center')`
        }}
      />
      
      {/* Overlay gradiente para melhor legibilidade */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-900/40 via-amber-900/30 to-blue-900/40" />
      
      {/* Conteúdo principal */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                  <Leaf className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">AgroClima Pro</h1>
                  <p className="text-sm text-green-100 drop-shadow">Inteligência para sua lavoura</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-white/90 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Fazenda São José - RS</span>
                </div>
                
                {/* Status da Assinatura */}
                <div className="flex items-center gap-2">
                  {hasPremiuAccess ? (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      Gratuito
                    </Badge>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center gap-2">
                  {!hasPremiuAccess && (
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg"
                      onClick={() => setShowSubscriptionModal(true)}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('profile')}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={signOut}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7 bg-white/10 backdrop-blur-md border border-white/20">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 relative text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
                {!hasPremiuAccess && <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />}
              </TabsTrigger>
              <TabsTrigger value="weather" className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <Cloud className="h-4 w-4" />
                <span className="hidden sm:inline">Clima</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-2 relative text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <Satellite className="h-4 w-4" />
                <span className="hidden sm:inline">Monitoramento</span>
                {!hasPremiuAccess && <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />}
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="flex items-center gap-2 relative text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Cenários</span>
                {!hasPremiuAccess && <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />}
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2 relative text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Mercado</span>
                {!hasPremiuAccess && <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />}
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2 relative text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Alertas</span>
                {!hasPremiuAccess && <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />}
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Principal - PREMIUM */}
            <TabsContent value="dashboard" className="space-y-6">
              <PremiumGate 
                feature="Dashboard Completo" 
                onUpgrade={() => setShowSubscriptionModal(true)}
              >
                {/* Alertas Críticos */}
                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold text-white drop-shadow-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Alertas Prioritários
                  </h2>
                  <div className="grid gap-3">
                    {alerts.map((alert, index) => (
                      <Alert key={index} className={`border-l-4 bg-white/10 backdrop-blur-md border border-white/20 ${
                        alert.type === 'danger' ? 'border-l-red-400' :
                        alert.type === 'warning' ? 'border-l-yellow-400' :
                        'border-l-blue-400'
                      }`}>
                        <AlertTriangle className="h-4 w-4 text-white" />
                        <AlertDescription className="flex justify-between items-center text-white">
                          <span>{alert.message}</span>
                          <Badge variant={alert.type === 'danger' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'default'}>
                            {alert.priority}
                          </Badge>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>

                {/* Resumo Climático */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 text-white backdrop-blur-md border border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Temperatura</p>
                          <p className="text-2xl font-bold">{weatherData.current.temp}°C</p>
                          <p className="text-xs text-blue-200 flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {weatherData.current.time}
                          </p>
                        </div>
                        <Thermometer className="h-8 w-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-cyan-500/80 to-cyan-600/80 text-white backdrop-blur-md border border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-cyan-100">Umidade</p>
                          <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
                        </div>
                        <Droplets className="h-8 w-8 text-cyan-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/80 to-green-600/80 text-white backdrop-blur-md border border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Vento</p>
                          <p className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</p>
                        </div>
                        <Wind className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-500/80 to-emerald-600/80 text-white backdrop-blur-md border border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100">Condição</p>
                          <p className="text-sm font-medium">{weatherData.current.condition}</p>
                        </div>
                        <weatherData.current.icon className="h-8 w-8 text-emerald-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recomendações Inteligentes */}
                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Leaf className="h-5 w-5 text-green-400" />
                      Recomendações Inteligentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-green-500/20 rounded-lg border border-green-400/30 backdrop-blur-sm">
                          <div className="bg-green-500 p-2 rounded-full">
                            <Wheat className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{rec.action}</h4>
                            <p className="text-sm text-green-100">{rec.talhao} • {rec.window}</p>
                            <p className="text-sm text-green-200 mt-1">{rec.reason}</p>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Aplicar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </PremiumGate>
            </TabsContent>

            {/* Aba Clima Detalhado - GRATUITO */}
            <TabsContent value="weather" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Condições Atuais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <weatherData.current.icon className="h-16 w-16 mx-auto text-blue-400 mb-2" />
                      <p className="text-3xl font-bold text-white">{weatherData.current.temp}°C</p>
                      <p className="text-gray-200">{weatherData.current.condition}</p>
                      <p className="text-sm text-gray-300 flex items-center justify-center gap-1 mt-2">
                        <Clock className="h-4 w-4" />
                        Atualizado às {weatherData.current.time}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Droplets className="h-5 w-5 mx-auto text-blue-400 mb-1" />
                        <p className="text-sm text-gray-300">Umidade</p>
                        <p className="font-semibold text-white">{weatherData.current.humidity}%</p>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Wind className="h-5 w-5 mx-auto text-green-400 mb-1" />
                        <p className="text-sm text-gray-300">Vento</p>
                        <p className="font-semibold text-white">{weatherData.current.windSpeed} km/h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Análise Agrometeorológica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Risco de Geada</span>
                          <span className="text-yellow-400">Médio</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Condições para Pulverização</span>
                          <span className="text-green-400">Ideal</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Estresse Hídrico</span>
                          <span className="text-red-400">Alto</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Previsão 7 dias */}
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="h-5 w-5" />
                    Previsão 7 Dias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                        <p className="text-sm font-medium text-gray-300">{day.day}</p>
                        <day.icon className="h-6 w-6 mx-auto my-2 text-gray-300" />
                        <p className="text-sm font-bold text-white">{day.temp}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Droplets className="h-3 w-3 text-blue-400" />
                          <span className="text-xs text-blue-400">{day.rain}%</span>
                        </div>
                        {day.rainTime && (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-blue-400" />
                            <span className="text-xs text-blue-400">{day.rainTime}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Previsão Horária Detalhada */}
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock className="h-5 w-5" />
                    Temperatura por Horário - Próximos 3 Dias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {weatherData.forecast.slice(0, 3).map((day, dayIndex) => (
                      <div key={dayIndex} className="space-y-3">
                        <div className="flex items-center gap-3 pb-2 border-b border-white/20">
                          <day.icon className="h-5 w-5 text-gray-300" />
                          <h3 className="font-semibold text-white">{day.day}</h3>
                          <span className="text-sm text-gray-300">{day.condition}</span>
                          {day.rainTime && (
                            <div className="flex items-center gap-1 text-sm text-blue-400">
                              <CloudRain className="h-4 w-4" />
                              <span>Chuva às {day.rainTime}</span>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                          {day.hourlyTemp.map((hour, hourIndex) => (
                            <div key={hourIndex} className="text-center p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                              <p className="text-xs text-gray-300 mb-1">{hour.time}</p>
                              <p className="font-semibold text-sm text-white">{hour.temp}°C</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Monitoramento - PREMIUM */}
            <TabsContent value="monitoring" className="space-y-6">
              <PremiumGate 
                feature="Monitoramento de Talhões" 
                onUpgrade={() => setShowSubscriptionModal(true)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <InteractiveMap 
                      selectedTalhao={selectedTalhao} 
                      onTalhaoSelect={setSelectedTalhao} 
                    />
                  </div>
                  
                  <div className="space-y-4">
                    {talhoes.filter(t => t.name === selectedTalhao).map((talhao, index) => (
                      <Card key={index} className="bg-green-500/20 border border-green-400/30 backdrop-blur-md">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-white">
                            <span>{talhao.name}</span>
                            <Badge className="bg-green-500/30 text-green-100 border-green-400/50">
                              {talhao.culture}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">Área:</span>
                              <span className="font-medium text-white">{talhao.area}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">Estágio:</span>
                              <span className="font-medium text-white">{talhao.stage}</span>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Saúde da Cultura:</span>
                                <span className="font-medium text-white">{talhao.health}%</span>
                              </div>
                              <Progress value={talhao.health} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </PremiumGate>
            </TabsContent>

            {/* Aba Análise de Cenários - PREMIUM */}
            <TabsContent value="scenarios" className="space-y-6">
              <PremiumGate 
                feature="Análise de Cenários com IA" 
                onUpgrade={() => setShowSubscriptionModal(true)}
              >
                <ScenarioAnalysis selectedTalhao={selectedTalhao} />
              </PremiumGate>
            </TabsContent>

            {/* Aba Mercado - PREMIUM */}
            <TabsContent value="market" className="space-y-6">
              <PremiumGate 
                feature="Análise de Mercado" 
                onUpgrade={() => setShowSubscriptionModal(true)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(marketPrices).map(([commodity, data]) => (
                    <Card key={commodity} className="bg-white/10 backdrop-blur-md border border-white/20">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-white">
                          <span className="capitalize">{commodity}</span>
                          {data.trend === 'up' ? (
                            <TrendingUp className="h-5 w-5 text-green-400" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-400" />
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-white">R$ {data.price}</p>
                          <p className={`text-sm flex items-center gap-1 ${
                            data.trend === 'up' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {data.trend === 'up' ? '+' : ''}{data.change}%
                            <span className="text-gray-400">hoje</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </PremiumGate>
            </TabsContent>

            {/* Aba Alertas - PREMIUM */}
            <TabsContent value="alerts" className="space-y-6">
              <PremiumGate 
                feature="Central de Alertas Avançados" 
                onUpgrade={() => setShowSubscriptionModal(true)}
              >
                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Bell className="h-5 w-5" />
                      Central de Alertas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alerts.map((alert, index) => (
                        <div key={index} className={`p-4 rounded-lg border-l-4 backdrop-blur-sm ${
                          alert.type === 'danger' ? 'border-l-red-400 bg-red-500/20' :
                          alert.type === 'warning' ? 'border-l-yellow-400 bg-yellow-500/20' :
                          'border-l-blue-400 bg-blue-500/20'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                                alert.type === 'danger' ? 'text-red-400' :
                                alert.type === 'warning' ? 'text-yellow-400' :
                                'text-blue-400'
                              }`} />
                              <div>
                                <p className="font-medium text-white">{alert.message}</p>
                                <p className="text-sm text-gray-300 mt-1">
                                  Recebido há 2 horas
                                </p>
                              </div>
                            </div>
                            <Badge variant={alert.type === 'danger' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'default'}>
                              {alert.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </PremiumGate>
            </TabsContent>

            {/* Aba Perfil do Produtor */}
            <TabsContent value="profile" className="space-y-6">
              <ProducerProfile />
            </TabsContent>
          </Tabs>
        </div>

        {/* Modal de Assinatura */}
        {showSubscriptionModal && (
          <SubscriptionModal />
        )}
      </div>
    </div>
  )
}

export default function AgroClimaPro() {
  return (
    <AuthProvider>
      <AgroClimaProContent />
    </AuthProvider>
  )
}