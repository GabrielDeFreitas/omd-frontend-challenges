import type { Plan } from '@/pages/board-task/types'
import { api } from '@/service/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdatePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Plan> }) =>
      api.updatePlan(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['plans'] }),
  })
}
