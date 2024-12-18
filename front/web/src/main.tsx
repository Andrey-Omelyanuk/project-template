import './index.css'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime2/lib/css/blueprint-datetime2.css'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { FocusStyleManager } from '@blueprintjs/core'
import LandingPage from './pages/public/landing.tsx'
import PublicLayout from './pages/public/layout.tsx'
import PricingPage from './pages/public/prices.tsx'
import AboutPage from './pages/public/about.tsx'
const BaseLayout        = lazy(() => import('./pages/app/layout.tsx'))
const DashboardPage     = lazy(() => import('./pages/app/dashboard.tsx'))
const OrgsPage          = lazy(() => import('./pages/app/orgs.tsx'))
const UsersPage         = lazy(() => import('./pages/app/users.tsx'))
const UserProfilePage   = lazy(() => import('./pages/app/user-profile.tsx'))
const root = document.getElementById('root')

FocusStyleManager.onlyShowFocusOnTabs()

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        {/* // TODO: add 404 */}
        <Routes>
            <Route path='landing'>
                <Route element={<PublicLayout/>}>
                    <Route index          element={<LandingPage/>}/>
                    <Route path='pricing' element={<PricingPage/>}/>
                    <Route path='about'   element={<AboutPage/>}/>
                </Route>
            </Route>
            <Route path='/'>
                <Route element={(
                    // TODO: add global loading screen
                    <Suspense fallback={<>First Loading ...</>}>
                        <BaseLayout/>
                    </Suspense>
                )}>
                    <Route index          element={<DashboardPage/>}/>
                    <Route path='users'   element={<UsersPage/>}/>
                    <Route path='orgs'    element={<OrgsPage/>}/>
                    <Route path='profile' element={<UserProfilePage/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
