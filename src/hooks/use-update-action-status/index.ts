import { calculatePlanStatus } from '@/lib/utils'
import type { ActionStatus } from '@/pages/board-task/types'
import { api } from '@/service/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateActionStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      planId,
      actionId,
      status,
    }: {
      planId: string
      actionId: string
      status: ActionStatus
    }) => {
      const plans = await api.getPlans()
      const plan = plans.find(p => p.id === planId)
      if (!plan) throw new Error('Plan not found')

      const updatedAcoes = plan.acoes.map(a => (a.id === actionId ? { ...a, status } : a))

      const newStatus = calculatePlanStatus(updatedAcoes)

      return api.updatePlan(planId, { acoes: updatedAcoes, status: newStatus })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['plans'] }),
  })
}
