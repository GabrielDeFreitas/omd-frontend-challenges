import { z } from 'zod'
import { useForm, useFieldArray, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/button'
import { X, PlusCircle, Trash2 } from 'lucide-react'
import type { Plan, Priority, Action } from '@/pages/board-task/types'
import { useEffect } from 'react'
import type { FormValues } from './types'

const actionSchema = z.object({
  id: z.string().optional(),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  status: z.enum(['A Fazer', 'Fazendo', 'Feita']),
  prazo: z.string().min(1, 'Prazo é obrigatório'),
})

const planSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  objetivo: z.string().min(1, 'Objetivo é obrigatório'),
  prioridade: z.enum(['Baixa', 'Média', 'Alta']).optional().default('Média'),
  acoes: z.array(actionSchema).min(1, 'Pelo menos uma ação é necessária'),
})

export function PlanModal({
  isOpen,
  onClose,
  initialPlan,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  initialPlan?: Partial<Plan> | null
  onSubmit: (data: Omit<Plan, 'id'>) => void
}) {
  const resolver = zodResolver(planSchema) as unknown as Resolver<FormValues>

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      titulo: initialPlan?.titulo ?? '',
      objetivo: initialPlan?.objetivo ?? '',
      prioridade: (initialPlan?.prioridade as Priority) ?? 'Média',
      acoes: (initialPlan?.acoes as Action[] | undefined) ?? [
        { descricao: '', status: 'A Fazer', prazo: '' },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'acoes' })

  useEffect(() => {
    if (isOpen) {
      reset({
        titulo: initialPlan?.titulo ?? '',
        objetivo: initialPlan?.objetivo ?? '',
        prioridade: (initialPlan?.prioridade as Priority) ?? 'Média',
        acoes: (initialPlan?.acoes as Action[] | undefined) ?? [
          { descricao: '', status: 'A Fazer', prazo: '' },
        ],
      })
    }
  }, [isOpen, initialPlan, reset])

  if (!isOpen) return null

  const submit = (data: FormValues) => {
    const acoesWithId: Action[] = data.acoes.map(a => ({
      id: a.id ?? crypto.randomUUID(),
      descricao: a.descricao,
      status: a.status,
      prazo: a.prazo,
    }))

    const payload: Omit<Plan, 'id'> = {
      titulo: data.titulo,
      objetivo: data.objetivo,
      prioridade: data.prioridade,
      acoes: acoesWithId,
      data: initialPlan?.data ?? new Date().toISOString().split('T')[0],
      status: initialPlan?.status ?? 'Não Iniciado',
    }

    onSubmit(payload)
    onClose()
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{initialPlan ? 'Editar Plano' : 'Novo Plano'}</h2>
            <Button onClick={onClose} size="icon" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(submit)}>
            <div>
              <label className="block text-sm font-medium mb-1">Título *</label>
              <input {...register('titulo')} className="w-full px-3 py-2 border rounded-md" />
              {errors.titulo && (
                <p className="text-xs text-red-600 mt-1">{errors.titulo.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Objetivo *</label>
              <textarea
                {...register('objetivo')}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
              {errors.objetivo && (
                <p className="text-xs text-red-600 mt-1">{errors.objetivo.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Prioridade</label>
              <select {...register('prioridade')} className="w-full px-3 py-2 border rounded-md">
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Ações *</label>
                <Button
                  onClick={() => append({ descricao: '', status: 'A Fazer', prazo: '' })}
                  size="sm"
                  type="button"
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Adicionar Ação
                </Button>
              </div>
              {errors.acoes && (
                <p className="text-xs text-red-600 mb-2">
                  {'message' in errors.acoes
                    ? errors.acoes.message
                    : 'Pelo menos uma ação é necessária'}
                </p>
              )}

              {fields.map((field, index) => (
                <div className="flex items-center gap-2 mb-2" key={field.id}>
                  <input
                    {...register(`acoes.${index}.descricao` as const)}
                    className="flex-1 px-3 py-2 border rounded-md"
                    placeholder="Descrição"
                  />
                  <select
                    {...register(`acoes.${index}.status` as const)}
                    className="px-2 py-2 border rounded-md"
                  >
                    <option value="A Fazer">A Fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Feita">Feita</option>
                  </select>
                  <input
                    type="date"
                    {...register(`acoes.${index}.prazo` as const)}
                    className="px-2 py-2 border rounded-md"
                  />
                  <Button
                    onClick={() => remove(index)}
                    size="icon"
                    type="button"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button className="w-full" type="submit">
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
