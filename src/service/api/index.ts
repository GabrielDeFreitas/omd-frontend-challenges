import { plansDb } from '@/mocks'
import type { Plan } from '@/pages/board-task/types'

const ApiDelay = {
  SHORT: 100,
  MEDIUM: 200,
  LONG: 300,
} as const

const wait = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

const generateId = (prefix = 'OMD'): string => {
  const hash = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${hash}`
}

export const api = {
  async getPlans(): Promise<Plan[]> {
    await wait(ApiDelay.MEDIUM)
    return structuredClone(plansDb)
  },

  async createPlan(planData: Omit<Plan, 'id'>): Promise<Plan> {
    await wait(ApiDelay.MEDIUM)
    const newPlan: Plan = { ...planData, id: generateId() }
    plansDb.push(newPlan)
    return newPlan
  },

  async updatePlan(planId: string, updates: Partial<Plan>): Promise<Plan | null> {
    await wait(ApiDelay.SHORT)
    const planIndex = plansDb.findIndex(plan => plan.id === planId)

    if (planIndex === -1) return null

    const updatedPlan = { ...plansDb[planIndex], ...updates }
    plansDb[planIndex] = updatedPlan
    return updatedPlan
  },

  async deletePlan(planId: string): Promise<boolean> {
    await wait(ApiDelay.SHORT)
    const planIndex = plansDb.findIndex(plan => plan.id === planId)

    if (planIndex === -1) return false

    plansDb.splice(planIndex, 1)
    return true
  },
}
