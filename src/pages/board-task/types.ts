export type ActionStatus = 'A Fazer' | 'Fazendo' | 'Feita'
export type PlanStatus = 'Não Iniciado' | 'Em Andamento' | 'Concluído'
export type Priority = 'Baixa' | 'Média' | 'Alta'

export interface Action {
  id: string
  descricao: string
  status: ActionStatus
  prazo: string
}

export interface Plan {
  id: string
  titulo: string
  objetivo: string
  data: string
  status: PlanStatus
  prioridade: Priority
  acoes: Action[]
}

export interface BoardTaskViewProps {
  plans: Plan[]
  isLoading: boolean
  viewMode: 'board' | 'table'
  setViewMode: (mode: 'board' | 'table') => void
  onOpenCreate: () => void
  onEdit: (plan: Plan) => void
  onDelete: (id: string) => void
  onToggleActionStatus: (planId: string, actionId: string, currentStatus: ActionStatus) => void
}
