import './index.css'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime2/lib/css/blueprint-datetime2.css'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { FocusStyleManager, Icon } from '@blueprintjs/core'
import LandingPage from './pages/public/landing.tsx'
import PublicLayout from './pages/public/layout.tsx'
import PricingPage from './pages/public/prices.tsx'
import AboutPage from './pages/public/about.tsx'
import NotFoundPage from './pages/404.tsx'
import Welcome from './components/core/Welcome.tsx'
const BaseLayout        = lazy(() => import('./pages/app/layout.tsx'))
const DashboardPage     = lazy(() => import('./pages/app/dashboard.tsx'))
const OrgsPage          = lazy(() => import('./pages/app/orgs.tsx'))
const CoursesPage       = lazy(() => import('./pages/app/courses.tsx'))
const CoursePage        = lazy(() => import('./pages/app/course.tsx'))
const UsersPage         = lazy(() => import('./pages/app/users.tsx'))
const UserProfilePage   = lazy(() => import('./pages/app/user-profile.tsx'))
const root = document.getElementById('root')

import { IconNames, Icons, IconSize } from "@blueprintjs/icons"
import OrgPage from './pages/app/org.tsx'
Icons.load(IconNames.TREE, IconSize.LARGE)
Icons.load(IconNames.USER, IconSize.LARGE)

FocusStyleManager.onlyShowFocusOnTabs()

ReactDOM.createRoot(root).render(
    <BrowserRouter>
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
                    <Suspense fallback={<Welcome/>}>
                        <BaseLayout/>
                    </Suspense>
                )}>
                    <Route index           element={<DashboardPage/>}/>
                    <Route path='users'    element={<UsersPage/>}/>
                    <Route path='orgs'     element={<OrgsPage/>}/>
                    <Route path='org/:org' element={<OrgPage/>}/>
                    <Route path='courses'  element={<CoursesPage/>}/>
                    <Route path='courses/:course' element={<CoursePage/>}/>
                    <Route path='profile'  element={<UserProfilePage/>}/>
                </Route>
            </Route>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
)
