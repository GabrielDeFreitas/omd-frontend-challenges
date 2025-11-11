import type { Plan } from '@/pages/board-task/types'
import { api } from '@/service/api'
import { useQuery } from '@tanstack/react-query'

const PLANS_QUERY_KEY = ['plans']

export function usePlansQuery() {
  return useQuery<Plan[]>({
    queryKey: PLANS_QUERY_KEY,
    queryFn: api.getPlans,
  })
}
