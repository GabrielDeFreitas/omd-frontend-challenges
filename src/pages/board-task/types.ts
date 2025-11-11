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
