import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RoutesUrl } from '..'
import { GenericPageController } from '../../pages/generic-page/index.page'
import { PageNotFoundController } from '../../pages/page-not-found/index.page'

export function RouteProvider() {
  const routes = [
    {
      path: '*',
      element: <PageNotFoundController />,
    },
    {
      path: RoutesUrl.BASE_URL,
      element: <GenericPageController />,
    },
  ]

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
