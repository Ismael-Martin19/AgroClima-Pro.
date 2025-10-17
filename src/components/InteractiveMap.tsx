"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Map, 
  Satellite, 
  Layers,
  MapPin,
  Leaf,
  Droplets,
  Thermometer
} from 'lucide-react'

interface InteractiveMapProps {
  selectedTalhao: string
  onTalhaoSelect: (talhao: string) => void
}

export default function InteractiveMap({ selectedTalhao, onTalhaoSelect }: InteractiveMapProps) {
  const talhoes = [
    { 
      name: 'Talhão A', 
      culture: 'Soja', 
      area: '45 ha', 
      health: 92, 
      position: { top: '20%', left: '15%' },
      color: 'bg-green-500'
    },
    { 
      name: 'Talhão B', 
      culture: 'Milho', 
      area: '38 ha', 
      health: 88, 
      position: { top: '40%', left: '45%' },
      color: 'bg-yellow-500'
    },
    { 
      name: 'Talhão C', 
      culture: 'Arroz', 
      area: '52 ha', 
      health: 95, 
      position: { top: '60%', left: '25%' },
      color: 'bg-blue-500'
    }
  ]

  const mapLayers = [
    { name: 'Satélite', icon: Satellite, active: true },
    { name: 'NDVI', icon: Leaf, active: false },
    { name: 'Umidade', icon: Droplets, active: false },
    { name: 'Temperatura', icon: Thermometer, active: false }
  ]

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          Mapa Interativo da Propriedade
        </CardTitle>
        <div className="flex items-center gap-2">
          {mapLayers.map((layer, index) => (
            <Button
              key={index}
              variant={layer.active ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1"
            >
              <layer.icon className="h-3 w-3" />
              {layer.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Mapa Base */}
          <div 
            className="w-full h-96 bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-lg relative overflow-hidden"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 50% 80%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)
              `
            }}
          >
            {/* Talhões */}
            {talhoes.map((talhao, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  selectedTalhao === talhao.name 
                    ? 'scale-110 z-10' 
                    : 'hover:scale-105'
                }`}
                style={talhao.position}
                onClick={() => onTalhaoSelect(talhao.name)}
              >
                <div className={`w-16 h-16 ${talhao.color} rounded-lg shadow-lg flex items-center justify-center relative`}>
                  <MapPin className="h-6 w-6 text-white" />
                  {selectedTalhao === talhao.name && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-lg min-w-max">
                  <p className="text-xs font-semibold">{talhao.name}</p>
                  <p className="text-xs text-gray-600">{talhao.culture} • {talhao.area}</p>
                </div>
              </div>
            ))}

            {/* Elementos do Mapa */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span>Soja</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded" />
                <span>Milho</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span>Arroz</span>
              </div>
            </div>

            {/* Escala */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-8 h-0.5 bg-gray-800" />
                <span>100m</span>
              </div>
            </div>

            {/* Coordenadas */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow text-xs">
              <p>29°41'S, 51°07'W</p>
            </div>
          </div>

          {/* Informações do Talhão Selecionado */}
          <div className="mt-4 p-4 bg-gray-50/80 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Dados do {selectedTalhao}</h3>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Monitoramento Ativo
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <Leaf className="h-5 w-5 mx-auto text-green-600 mb-1" />
                <p className="text-xs text-gray-600">NDVI</p>
                <p className="font-semibold">0.82</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <Droplets className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                <p className="text-xs text-gray-600">Umidade Solo</p>
                <p className="font-semibold">68%</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <Thermometer className="h-5 w-5 mx-auto text-red-600 mb-1" />
                <p className="text-xs text-gray-600">Temp. Solo</p>
                <p className="font-semibold">24°C</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <Satellite className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                <p className="text-xs text-gray-600">Última Imagem</p>
                <p className="font-semibold">Hoje</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}