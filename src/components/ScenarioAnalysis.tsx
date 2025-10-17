"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Droplets,
  Sun,
  CloudRain,
  DollarSign,
  Calendar,
  Zap
} from 'lucide-react'

interface ScenarioAnalysisProps {
  selectedTalhao: string
}

export default function ScenarioAnalysis({ selectedTalhao }: ScenarioAnalysisProps) {
  const [activeScenario, setActiveScenario] = useState('weather')

  const scenarios = {
    weather: {
      title: 'Cenários Climáticos',
      icon: CloudRain,
      scenarios: [
        {
          name: 'Estiagem Prolongada',
          probability: 35,
          impact: 'Alto',
          description: 'Período de 15 dias sem chuva significativa',
          recommendations: [
            'Implementar irrigação de emergência',
            'Aplicar mulching para conservar umidade',
            'Monitorar estresse hídrico das plantas'
          ],
          timeline: '7-14 dias'
        },
        {
          name: 'Chuvas Intensas',
          probability: 60,
          impact: 'Médio',
          description: 'Precipitação acima de 80mm em 24h',
          recommendations: [
            'Verificar sistema de drenagem',
            'Adiar aplicações programadas',
            'Monitorar doenças fúngicas'
          ],
          timeline: '3-5 dias'
        },
        {
          name: 'Geada Tardia',
          probability: 20,
          impact: 'Crítico',
          description: 'Temperatura abaixo de 2°C após brotação',
          recommendations: [
            'Ativar sistema de proteção térmica',
            'Aplicar quebra-vento temporário',
            'Avaliar replantio em áreas afetadas'
          ],
          timeline: '48 horas'
        }
      ]
    },
    market: {
      title: 'Cenários de Mercado',
      icon: DollarSign,
      scenarios: [
        {
          name: 'Alta nos Preços da Soja',
          probability: 70,
          impact: 'Alto',
          description: 'Aumento de 15-20% nos próximos 3 meses',
          recommendations: [
            'Considerar venda antecipada parcial',
            'Investir em armazenagem',
            'Expandir área de soja na próxima safra'
          ],
          timeline: '90 dias'
        },
        {
          name: 'Queda no Milho',
          probability: 45,
          impact: 'Médio',
          description: 'Redução de 8-12% devido ao excesso de oferta',
          recommendations: [
            'Diversificar culturas',
            'Buscar contratos futuros',
            'Otimizar custos de produção'
          ],
          timeline: '60 dias'
        }
      ]
    },
    production: {
      title: 'Cenários de Produção',
      icon: TrendingUp,
      scenarios: [
        {
          name: 'Produtividade Acima da Média',
          probability: 55,
          impact: 'Alto',
          description: 'Rendimento 10-15% superior ao histórico',
          recommendations: [
            'Preparar logística de colheita',
            'Negociar armazenagem adicional',
            'Planejar comercialização estratégica'
          ],
          timeline: '30-45 dias'
        },
        {
          name: 'Ataque de Pragas',
          probability: 30,
          impact: 'Alto',
          description: 'Infestação de lagarta-da-soja acima do nível de controle',
          recommendations: [
            'Intensificar monitoramento',
            'Preparar aplicação de defensivos',
            'Implementar controle biológico'
          ],
          timeline: '7-10 dias'
        }
      ]
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Crítico': return 'text-red-600 bg-red-50'
      case 'Alto': return 'text-orange-600 bg-orange-50'
      case 'Médio': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-green-600 bg-green-50'
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600'
    if (probability >= 50) return 'text-orange-600'
    if (probability >= 30) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Análise de Cenários com IA - {selectedTalhao}
          </CardTitle>
          <p className="text-sm text-gray-600">
            Análises preditivas baseadas em dados históricos, condições atuais e tendências de mercado
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeScenario} onValueChange={setActiveScenario}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weather" className="flex items-center gap-2">
                <CloudRain className="h-4 w-4" />
                Clima
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Mercado
              </TabsTrigger>
              <TabsTrigger value="production" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Produção
              </TabsTrigger>
            </TabsList>

            {Object.entries(scenarios).map(([key, category]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="grid gap-4">
                  {category.scenarios.map((scenario, index) => (
                    <Card key={index} className="border border-gray-200 bg-gray-50/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <category.icon className="h-5 w-5 text-gray-600" />
                            <div>
                              <CardTitle className="text-lg">{scenario.name}</CardTitle>
                              <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getImpactColor(scenario.impact)}>
                              {scenario.impact}
                            </Badge>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Probabilidade</p>
                              <p className={`text-lg font-bold ${getProbabilityColor(scenario.probability)}`}>
                                {scenario.probability}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <Zap className="h-4 w-4 text-blue-500" />
                              Recomendações Estratégicas
                            </h4>
                            <ul className="space-y-2">
                              {scenario.recommendations.map((rec, recIndex) => (
                                <li key={recIndex} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Janela de ação: {scenario.timeline}</span>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Criar Plano de Ação
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Resumo de Riscos */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <AlertTriangle className="h-5 w-5" />
            Resumo de Riscos - Próximos 30 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">Alto</div>
              <div className="text-sm text-gray-600">Risco Climático</div>
              <div className="text-xs text-gray-500 mt-1">Estiagem + Geada</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">Médio</div>
              <div className="text-sm text-gray-600">Risco de Mercado</div>
              <div className="text-xs text-gray-500 mt-1">Volatilidade preços</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">Baixo</div>
              <div className="text-sm text-gray-600">Risco Operacional</div>
              <div className="text-xs text-gray-500 mt-1">Condições favoráveis</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}