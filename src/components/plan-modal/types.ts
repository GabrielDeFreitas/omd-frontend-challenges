import type { ActionStatus, Priority } from '@/pages/board-task/types'

export type ActionForm = {
  id?: string
  descricao: string
  status: ActionStatus
  prazo: string
}

export type FormValues = {
  titulo: string
  objetivo: string
  prioridade: Priority
  acoes: ActionForm[]
}
