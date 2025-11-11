import React, { useState, useCallback } from 'react'
import type { Plan, ActionStatus } from '../types'
import { usePlansQuery } from '@/hooks/use-plans-query'
import { useCreatePlan } from '@/hooks/use-create-plan'
import { useUpdatePlan } from '@/hooks/use-update-plan'
import { useDeletePlan } from '@/hooks/use-delete-plan'
import { useUpdateActionStatus } from '@/hooks/use-update-action-status'
import { calculatePlanStatus } from '@/lib/utils'
import { BoardTaskView } from '../view/board-task.view'
import { PlanModal } from '@/components/plan-modal'

type ViewMode = 'board' | 'table'

const ACTION_STATUS_CYCLE: Record<ActionStatus, ActionStatus> = {
  'A Fazer': 'Fazendo',
  Fazendo: 'Feita',
  Feita: 'A Fazer',
}

export default function BoardTaskController() {
  const [viewMode, setViewMode] = useState<ViewMode>('board')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)

  const { data: plans = [], isLoading } = usePlansQuery()
  const createPlan = useCreatePlan()
  const updatePlan = useUpdatePlan()
  const deletePlan = useDeletePlan()
  const updateActionStatus = useUpdateActionStatus()

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setEditingPlan(null)
  }, [])

  const openCreateModal = useCallback(() => {
    setEditingPlan(null)
    setIsModalOpen(true)
  }, [])

  const handleEdit = useCallback((plan: Plan) => {
    setEditingPlan(plan)
    setIsModalOpen(true)
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm('Deseja realmente excluir este plano?')) {
        deletePlan.mutate(id)
      }
    },
    [deletePlan]
  )

  const handleCreateOrUpdate = useCallback(
    (planData: Omit<Plan, 'id'>) => {
      const updatedStatus = calculatePlanStatus(planData.acoes)
      const planWithStatus = { ...planData, status: updatedStatus }

      if (editingPlan) {
        updatePlan.mutate({ id: editingPlan.id, updates: planWithStatus })
      } else {
        createPlan.mutate(planWithStatus)
      }

      closeModal()
    },
    [editingPlan, updatePlan, createPlan, closeModal]
  )

  const handleActionStatusChange = useCallback(
    (planId: string, actionId: string, currentStatus: ActionStatus) => {
      const nextStatus = ACTION_STATUS_CYCLE[currentStatus]

      updateActionStatus.mutate(
        { planId, actionId, status: nextStatus },
        {
          onSuccess: updatedPlan => {
            if (updatedPlan?.acoes) {
              updatePlan.mutate({
                id: planId,
                updates: { status: calculatePlanStatus(updatedPlan.acoes) },
              })
            }
          },
        }
      )
    },
    [updateActionStatus, updatePlan]
  )

  return (
    <React.Fragment>
      <BoardTaskView
        plans={plans}
        isLoading={isLoading}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCreate={openCreateModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActionStatus={handleActionStatusChange}
      />

      <PlanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialPlan={editingPlan ?? undefined}
        onSubmit={handleCreateOrUpdate}
      />
    </React.Fragment>
  )
}
