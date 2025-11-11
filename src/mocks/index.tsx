import type { Plan } from '@/pages/board-task/types'

export const plansDb: Plan[] = [
  {
    id: 'omd-1213',
    titulo: 'Implementar Dashboard Analytics',
    objetivo: 'Criar uma dashboard completa com métricas e gráficos',
    data: '2025-10-21',
    status: 'Não Iniciado',
    prioridade: 'Alta',
    acoes: [
      {
        id: '1',
        descricao: 'Definir arquitetura da dashboard',
        status: 'A Fazer',
        prazo: '2025-10-25',
      },
      { id: '2', descricao: 'Criar mockups e protótipos', status: 'A Fazer', prazo: '2025-10-28' },
      { id: '3', descricao: 'Integrar dados de APIs', status: 'A Fazer', prazo: '2025-11-05' },
    ],
  },
  {
    id: 'omd-1214',
    titulo: 'Refatorar Sistema de Autenticação',
    objetivo: 'Melhorar segurança e performance do sistema de login',
    data: '2025-10-15',
    status: 'Em Andamento',
    prioridade: 'Média',
    acoes: [{ id: '4', descricao: 'Implementar JWT', status: 'Fazendo', prazo: '2025-10-30' }],
  },
  {
    id: 'omd-1215',
    titulo: 'Otimizar Performance do Backend',
    objetivo: 'Reduzir tempo de resposta das APIs',
    data: '2025-09-10',
    status: 'Concluído',
    prioridade: 'Alta',
    acoes: [
      { id: '5', descricao: 'Analisar queries lentas', status: 'Feita', prazo: '2025-09-15' },
      { id: '6', descricao: 'Implementar cache Redis', status: 'Feita', prazo: '2025-09-20' },
    ],
  },
]
