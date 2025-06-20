import { AuthLayout } from '../pages/auth/auth-layout'
import { UserContextProvider } from './user-context-provider'
import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { SignInForm } from '../pages/auth/components/sign-in/sign-in-form';
import { SignUpForm } from '../pages/auth/components/sign-up/sign-up-form';
import * as constants from './constants';
import { PageNotFound } from '../pages/page-not-found/not-found-page';
import { AuthProtected } from './auth-protected-router';
import { EventsPage } from '../pages/events/events-page';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={constants.DEFAULT_URL} element={<AuthProtected />}>
            <Route index element={<EventsPage />} />
          </Route>
          <Route
            path={constants.AUTH_URL}
            element={
              <AuthLayout startWithSignUp={constants.AUTH_START_WITH_SIGN_UP} />
            }
          >
            <Route
              index
              element={
                <Navigate
                  to={
                    constants.AUTH_START_WITH_SIGN_UP ? constants.SIGN_UP_URL : constants.SIGN_IN_URL
                  }
                  replace
                />}
            />
            <Route path={constants.SIGN_UP_URL} element={<SignUpForm />} />
            <Route path={constants.SIGN_IN_URL} element={<SignInForm />} />
          </Route>
          <Route path={constants.PATH_NOT_FOUND_URL} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App