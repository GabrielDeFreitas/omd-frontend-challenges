import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageNotFoundView } from '../view/page-not-found.view'
import type { PageNotFoundProps } from '../types'

const meta = {
  title: 'pages/page-not-found-view',
  component: PageNotFoundView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **PageNotFoundView** exibe uma mensagem de erro 404 quando o usuário tenta acessar
uma página inexistente. Ela mostra um ícone, título, descrição e um botão para voltar à página inicial.

> Essa View é visual e não contém lógica de navegação ou estado. A lógica deve ser implementada no Controller correspondente.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageNotFoundView>

export default meta
type Story = StoryObj<typeof meta>

const mockProps: PageNotFoundProps = {
  pageNotFound: {
    content: {
      title: 'Página não encontrada',
      description:
        'A página que você tentou acessar não existe ou foi movida. Clique no botão abaixo para voltar à página inicial.',
    },
    actions: {
      label: 'Voltar para a página inicial',
      goToHome: () => alert('Redirecionando para a página inicial...'),
    },
  },
}

export const Default: Story = {
  name: 'Default',
  args: mockProps,
  parameters: {
    docs: {
      description: {
        story: 'Renderiza o estado padrão da tela de página não encontrada (404).',
      },
    },
  },
}
