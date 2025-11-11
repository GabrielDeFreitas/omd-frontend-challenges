import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoardTaskView } from '../view/board-task.view'
import { plansDb } from '@/mocks'

const meta = {
  title: 'pages/board-task-view',
  component: BoardTaskView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
O **BoardTaskView** renderiza a visualização de gestão de planos com dois modos: Board (cards) e Tabela.

> Componente de apresentação que recebe dados e callbacks via props.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BoardTaskView>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  plans: plansDb,
  isLoading: false,
  viewMode: 'board' as const,
  setViewMode: (mode: 'board' | 'table') => console.log('View mode:', mode),
  onOpenCreate: () => console.log('Create clicked'),
  onEdit: (plan: any) => console.log('Edit:', plan.id),
  onDelete: (id: string) => console.log('Delete:', id),
  onToggleActionStatus: (planId: string, actionId: string, status: string) =>
    console.log('Toggle:', { planId, actionId, status }),
}

export const Default: Story = {
  args: defaultArgs,
  name: 'Padrão (Board)',
  parameters: {
    docs: {
      description: {
        story: 'Visualização em board com cards organizados por status.',
      },
    },
  },
}

export const TableView: Story = {
  args: {
    ...defaultArgs,
    viewMode: 'table',
  },
  name: 'Visualização em Tabela',
  parameters: {
    docs: {
      description: {
        story: 'Visualização em tabela com informações compactas.',
      },
    },
  },
}

export const Loading: Story = {
  args: {
    ...defaultArgs,
    plans: [],
    isLoading: true,
  },
  name: 'Estado de Carregamento',
  parameters: {
    docs: {
      description: {
        story: 'Exibe skeletons durante o carregamento.',
      },
    },
  },
}

export const EmptyState: Story = {
  args: {
    ...defaultArgs,
    plans: [],
  },
  name: 'Estado Vazio',
  parameters: {
    docs: {
      description: {
        story: 'Renderiza mensagem quando não há planos cadastrados.',
      },
    },
  },
}

export const SingleStatus: Story = {
  args: {
    ...defaultArgs,
    plans: plansDb.filter(plan => plan.status === 'Em Andamento'),
  },
  name: 'Apenas Um Status',
  parameters: {
    docs: {
      description: {
        story: 'Demonstra comportamento com planos em apenas um status.',
      },
    },
  },
}
