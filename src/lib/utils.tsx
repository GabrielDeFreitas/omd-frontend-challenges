import type { Action, PlanStatus } from '@/pages/board-task/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CheckCircle, Clock, AlertTriangle, Circle } from 'lucide-react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculatePlanStatus = (acoes: Action[]): PlanStatus => {
  const allDone = acoes.every(a => a.status === 'Feita')
  const doingSomething = acoes.some(a => a.status === 'Fazendo')

  if (allDone) return 'Concluído'
  if (doingSomething || acoes.some(a => a.status === 'Feita')) return 'Em Andamento'
  return 'Não Iniciado'
}

export function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'concluído':
    case 'feito':
    case 'done':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'em andamento':
    case 'in progress':
      return <Clock className="h-4 w-4 text-blue-600" />
    case 'atrasado':
    case 'delayed':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    default:
      return <Circle className="h-4 w-4 text-gray-400" />
  }
}

export function getActionIcon(actionStatus: string) {
  switch (actionStatus.toLowerCase()) {
    case 'feita':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'fazendo':
      return <Clock className="h-4 w-4 text-blue-600" />
    case 'a fazer':
      return <Circle className="h-4 w-4 text-gray-400" />
    default:
      return <Circle className="h-4 w-4 text-gray-400" />
  }
}
