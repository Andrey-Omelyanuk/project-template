import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  BasePage, MainPage, DashboardPage, 
  UsersPage, UserProfilePage, PublicPage,
} from './pages'


const router = createBrowserRouter([
  // available for all
  { path: 'public', element: <PublicPage/> },
  // only for authenticated users
  { path: '', element: <BasePage/>, children: [
    { path: '/'      , element: <MainPage/>, children: [
      { path: 'dashboard'   , element: <DashboardPage/> },
      { path: 'users'       , element: <UsersPage/> },
      { path: 'user-profile', element: <UserProfilePage/> },
      { path: ''            , element: <DashboardPage/> },
    ]},
    { path: '', element: <MainPage/> },
  ]}
])


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
