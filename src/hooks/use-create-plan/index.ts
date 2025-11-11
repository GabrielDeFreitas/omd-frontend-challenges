import type { Plan } from '@/pages/board-task/types'
import { api } from '@/service/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreatePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (plan: Omit<Plan, 'id'>) => api.createPlan(plan),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['plans'] }),
  })
}
