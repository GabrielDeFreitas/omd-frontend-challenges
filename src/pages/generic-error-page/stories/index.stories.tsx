import type { Meta, StoryObj } from '@storybook/react-vite'
import { GenericErrorPageController } from '../index.page'

const meta = {
  title: 'pages/generic-error-page',
  component: GenericErrorPageController,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O **GenericErrorPageController** é responsável por encapsular a lógica da página genérica
e renderizar o \`GenericPageView\` com o título correspondente.
        
> Ele é um exemplo de separação entre controller e view no projeto.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GenericErrorPageController>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Padrão',
  parameters: {
    docs: {
      description: {
        story: 'Renderiza a página genérica padrão com o título **generic-page**.',
      },
    },
  },
}

export const WithCustomTitle: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: 12, fontStyle: 'italic' }}>
        Este é um exemplo de como o Controller renderiza diferentes Views.
      </p>
      <GenericErrorPageController />
    </div>
  ),
  name: 'Com título customizado',
  parameters: {
    docs: {
      description: {
        story:
          'Mesmo sem props, o controller define internamente o título **generic-page** e o repassa à View.',
      },
    },
  },
}
