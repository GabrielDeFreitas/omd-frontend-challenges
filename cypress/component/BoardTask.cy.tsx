import { mount } from '@cypress/react18'
import type { Plan } from '@/pages/board-task/types'
import BoardTaskView from '@/pages/board-task/view/board-task.view'
import '../../src/index.css'

const mockPlans: Plan[] = [
  {
    id: 'PLAN-001',
    titulo: 'Implementar Dashboard',
    objetivo: 'Criar dashboard interativo',
    prioridade: 'Alta',
    status: 'Em Andamento',
    data: '2024-01-15',
    acoes: [
      { id: 'ACT-001', descricao: 'Criar componentes', status: 'Feita', prazo: '2024-01-20' },
      { id: 'ACT-002', descricao: 'Integrar API', status: 'Fazendo', prazo: '2024-01-25' },
    ],
  },
  {
    id: 'PLAN-002',
    titulo: 'Configurar CI/CD',
    objetivo: 'Automatizar deploy',
    prioridade: 'Média',
    status: 'Não Iniciado',
    data: '2024-01-10',
    acoes: [
      { id: 'ACT-003', descricao: 'Setup GitHub Actions', status: 'A Fazer', prazo: '2024-01-30' },
    ],
  },
]

function mountBoardTaskView(overrides = {}) {
  const props = {
    plans: mockPlans,
    isLoading: false,
    viewMode: 'board' as const,
    setViewMode: cy.stub().as('setViewMode'),
    onOpenCreate: cy.stub().as('onOpenCreate'),
    onEdit: cy.stub().as('onEdit'),
    onDelete: cy.stub().as('onDelete'),
    onToggleActionStatus: cy.stub().as('onToggleActionStatus'),
    ...overrides,
  }

  mount(<BoardTaskView {...props} />)
  return props
}

describe('BoardTaskView', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  it('should render the page title and description', () => {
    mountBoardTaskView()
    cy.contains('Gestão de Planos').should('be.visible')
    cy.contains('Visualize e gerencie seus planos de ação.').should('exist')
  })

  it('should display and trigger the "Novo Plano" button', () => {
    mountBoardTaskView()
    cy.contains('button', 'Novo Plano').should('be.visible').click()
    cy.get('@onOpenCreate').should('have.been.calledOnce')
  })

  it('should render the board view columns', () => {
    mountBoardTaskView()
    cy.contains('Não Iniciado').should('exist')
    cy.contains('Em Andamento').should('exist')
    cy.contains('Concluído').should('exist')
  })

  it('should display plans and actions in board view', () => {
    mountBoardTaskView()
    cy.contains('Implementar Dashboard').should('exist')
    cy.contains('Configurar CI/CD').should('exist')
    cy.contains('Criar componentes').should('exist')
    cy.contains('Integrar API').should('exist')
  })

  it('should switch to table view when clicking the tab', () => {
    mountBoardTaskView()
    cy.contains('button', 'Tabela').click()
    cy.get('@setViewMode').should('have.been.calledWith', 'table')
  })

  it('should render the table view with correct headers', () => {
    mountBoardTaskView({ viewMode: 'table' })
    cy.contains('th', 'ID').should('exist')
    cy.contains('th', 'Título').should('exist')
    cy.contains('th', 'Status').should('exist')
    cy.contains('th', 'Prioridade').should('exist')
    cy.contains('th', 'Ações').should('exist')
  })

  it('should display plan data in table view', () => {
    mountBoardTaskView({ viewMode: 'table' })
    cy.contains('td', 'PLAN-001').should('exist')
    cy.contains('td', 'Implementar Dashboard').should('exist')
    cy.contains('Alta').should('exist')
  })

  it('should show skeleton when isLoading is true', () => {
    mountBoardTaskView({ isLoading: true })
    cy.get('[class*="animate-pulse"]').should('exist')
  })

  it('should show empty column message when there are no plans', () => {
    mountBoardTaskView({ plans: [] })
    cy.contains('Nenhum plano neste status').should('exist')
  })

  it('should display completed action count in table view', () => {
    mountBoardTaskView({ viewMode: 'table' })
    cy.contains('1/2 concluídas').should('exist')
    cy.contains('0/1 concluídas').should('exist')
  })

  it('should display correctly formatted dates', () => {
    mountBoardTaskView()
    cy.contains(/\d{2}\/\d{2}\/\d{4}/).should('exist')
  })

  it('should display priority badges', () => {
    mountBoardTaskView({ viewMode: 'table' })
    cy.contains('Alta').should('exist')
    cy.contains('Média').should('exist')
  })
})

describe('BoardTaskView - Empty State', () => {
  it('should show empty table message when there are no plans', () => {
    mountBoardTaskView({ plans: [], viewMode: 'table' })
    cy.contains('Nenhuma ação registrada').should('exist')
  })
})
