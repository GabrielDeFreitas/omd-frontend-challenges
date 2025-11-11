import { api } from '@/service/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeletePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.deletePlan(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['plans'] }),
  })
}
