import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RoutesUrl } from '..'
import { PageNotFoundController } from '../../pages/page-not-found/index.page'
import BoardTaskController from '@/pages/board-task/controller/board-task.controller'

export function RouteProvider() {
  const routes = [
    {
      path: '*',
      element: <PageNotFoundController />,
    },
    {
      path: RoutesUrl.BASE_URL,
      element: <BoardTaskController />,
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
