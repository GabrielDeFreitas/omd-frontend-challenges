import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RoutesUrl } from '..'

export function RouteProvider() {
  const routes = [
    {
      path: '*',
      element: <h1 className="text-3xl font-bold underline">error-area</h1>,
    },
    {
      path: RoutesUrl.BASE_URL,
      element: <h1 className="text-3xl font-bold underline">base-url</h1>,
    },
  ]

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
