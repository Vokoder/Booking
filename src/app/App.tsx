import { UserContextProvider } from './auth'
import '@ant-design/v5-patch-for-react-19'
import { BrowserRouter, Routes, Route } from 'react-router'
import { SignInForm } from '@/pages/sign-in'
import { SignUpForm } from '@/pages/sign-up'
import { SIGN_IN_URL, SIGN_UP_URL, DEFAULT_URL, PATH_NOT_FOUND_URL } from '@constants/routes'
import { PageNotFound } from '@pages/page-not-found/not-found-page'
import { AuthProtected, GuestProtected } from '@app/routes'
import { EventsPage } from '@pages/events-page'
import { AlertContextProvider } from '@app/alert'

function App() {
  return (
    <UserContextProvider>
      <AlertContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={DEFAULT_URL} element={<AuthProtected />}>
              <Route index element={<EventsPage />} />
            </Route>
            <Route path={DEFAULT_URL} element={<GuestProtected />}>
              <Route index path={SIGN_IN_URL} element={<SignInForm />} />
              <Route path={SIGN_UP_URL} element={<SignUpForm />} />
            </Route>
            <Route path={PATH_NOT_FOUND_URL} element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AlertContextProvider>
    </UserContextProvider>
  )
}

export default App
