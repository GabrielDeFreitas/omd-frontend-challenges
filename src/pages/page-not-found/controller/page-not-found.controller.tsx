import { useNavigate } from 'react-router-dom'
import { PageNotFoundView } from '../view/page-not-found.view'
import { RoutesUrl } from '@/routes'

export function PageNotFoundController() {
  const navigate = useNavigate()

  const handleGoToHome = () => {
    navigate(RoutesUrl.BASE_URL)
  }

  const pageNotFound = {
    content: {
      title: 'Página não encontrada',
      description:
        'A página que você tentou acessar não existe ou foi movida. Clique no botão abaixo para voltar à página inicial.',
    },
    actions: {
      label: 'Voltar para a página inicial',
      goToHome: handleGoToHome,
    },
  }

  return <PageNotFoundView pageNotFound={pageNotFound} />
}
