'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, MapPin, Search, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { updateProfile, profile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [locationData, setLocationData] = useState({
    city: '',
    state: '',
    customLocation: profile?.location || ''
  })

  // Estados brasileiros
  const brazilianStates = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ]

  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      let finalLocation = ''
      
      if (locationData.customLocation.trim()) {
        finalLocation = locationData.customLocation.trim()
      } else if (locationData.city && locationData.state) {
        const stateName = brazilianStates.find(s => s.value === locationData.state)?.label
        finalLocation = `${locationData.city}, ${stateName}`
      } else {
        setError('Por favor, preencha sua localização.')
        setIsLoading(false)
        return
      }

      await updateProfile({ location: finalLocation })
      setSuccess('Localização salva com sucesso!')
      
      setTimeout(() => {
        onClose()
      }, 1500)
      
    } catch (err) {
      setError('Erro ao salvar localização. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearLocation = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateProfile({ location: null })
      setSuccess('Localização removida com sucesso!')
      setLocationData({ city: '', state: '', customLocation: '' })
      
      setTimeout(() => {
        onClose()
      }, 1500)
      
    } catch (err) {
      setError('Erro ao remover localização. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Configurar Localização
          </DialogTitle>
          <DialogDescription>
            Adicione sua localização para receber dados meteorológicos personalizados para sua região.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSaveLocation} className="space-y-4">
          {/* Mensagens de erro e sucesso */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Localização Personalizada */}
          <div className="space-y-2">
            <Label htmlFor="custom-location">Localização Personalizada</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="custom-location"
                type="text"
                placeholder="Ex: Fazenda São João, Ribeirão Preto - SP"
                className="pl-10"
                value={locationData.customLocation}
                onChange={(e) => setLocationData(prev => ({ 
                  ...prev, 
                  customLocation: e.target.value,
                  city: '', // Limpar campos de cidade/estado quando usar personalizado
                  state: ''
                }))}
              />
            </div>
            <p className="text-xs text-gray-500">
              Digite sua localização completa (cidade, estado, fazenda, etc.)
            </p>
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Seleção por Cidade e Estado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                type="text"
                placeholder="Ex: Ribeirão Preto"
                value={locationData.city}
                onChange={(e) => setLocationData(prev => ({ 
                  ...prev, 
                  city: e.target.value,
                  customLocation: '' // Limpar localização personalizada
                }))}
                disabled={!!locationData.customLocation}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Select 
                value={locationData.state} 
                onValueChange={(value) => setLocationData(prev => ({ 
                  ...prev, 
                  state: value,
                  customLocation: '' // Limpar localização personalizada
                }))}
                disabled={!!locationData.customLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {brazilianStates.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Localização Atual */}
          {profile?.location && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Localização Atual:</span>
              </div>
              <p className="text-sm text-green-700">{profile.location}</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Salvar Localização
                </>
              )}
            </Button>

            {profile?.location && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClearLocation}
                disabled={isLoading}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Remover
              </Button>
            )}
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </Button>
          </div>
        </form>

        {/* Informações sobre a funcionalidade */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-xs text-blue-700">
              <p className="font-medium mb-1">💡 Dica:</p>
              <p>
                Sua localização é usada para fornecer dados meteorológicos precisos e 
                recomendações personalizadas para sua região agrícola.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}