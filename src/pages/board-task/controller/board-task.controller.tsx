import React, { useState } from 'react'
import type { Plan } from '../types'
import { usePlansQuery } from '@/hooks/use-plans-query'

import { BoardTaskView } from '../view/board-task.view'
import { PlanModal } from '@/components/plan-modal'
import { useCreatePlan } from '@/hooks/use-create-plan'
import { useUpdatePlan } from '@/hooks/use-update-plan'
import { useDeletePlan } from '@/hooks/use-delete-plan'
import { useUpdateActionStatus } from '@/hooks/use-update-action-status'
import { calculatePlanStatus } from '@/lib/utils'

export default function BoardTaskController() {
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)

  const { data: plans = [], isLoading } = usePlansQuery()
  const createPlan = useCreatePlan()
  const updatePlan = useUpdatePlan()
  const deletePlan = useDeletePlan()
  const updateActionStatus = useUpdateActionStatus()

  const handleCreateOrUpdate = (planData: Omit<Plan, 'id'>) => {
    const updatedStatus = calculatePlanStatus(planData.acoes)
    const planDataWithStatus = { ...planData, status: updatedStatus }

    if (editingPlan) {
      updatePlan.mutate({ id: editingPlan.id, updates: planDataWithStatus })
    } else {
      createPlan.mutate(planDataWithStatus)
    }

    setIsModalOpen(false)
    setEditingPlan(null)
  }

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setIsModalOpen(true)
  }
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Deseja realmente excluir este plano?')
    if (confirmDelete) {
      deletePlan.mutate(id)
    }
  }

  const handleActionStatusChange = (planId: string, actionId: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === 'A Fazer' ? 'Fazendo' : currentStatus === 'Fazendo' ? 'Feita' : 'A Fazer'

    updateActionStatus.mutate(
      { planId, actionId, status: nextStatus as 'A Fazer' | 'Fazendo' | 'Feita' },
      {
        onSuccess: updatedPlan => {
          if (!updatedPlan?.acoes) return

          updatePlan.mutate({
            id: planId,
            updates: { status: calculatePlanStatus(updatedPlan.acoes) },
          })
        },
      }
    )
  }

  return (
    <React.Fragment>
      <BoardTaskView
        plans={plans}
        isLoading={isLoading}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCreate={() => {
          setEditingPlan(null)
          setIsModalOpen(true)
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActionStatus={handleActionStatusChange}
      />

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPlan(null)
        }}
        initialPlan={editingPlan || undefined}
        onSubmit={handleCreateOrUpdate}
      />
    </React.Fragment>
  )
}
