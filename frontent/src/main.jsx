import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Layout from './AdminCompo/Layout'
import Form from './AdminCompo/Form.jsx'
import DutyAssignForm from './AdminCompo/Assign.jsx'
import LeaveRequests from './AdminCompo/Leave.jsx'
import Admin from './AdminCompo/Admin.jsx'
import DutyRecords from './AdminCompo/Record.jsx'
import LoginPage from './Login/Login.jsx'
import GuardDashboard from './GuradCompo/Home.jsx'
import LeavePage from './GuradCompo/LeavePage.jsx'


import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom'
import Layout2 from './AdminCompo/Layout2.jsx'
import GuardsList from './AdminCompo/GuardsList.jsx'
import ActiveGuards from './AdminCompo/ActiveGuards.jsx'
import SuspendGuards from './AdminCompo/SuspendGuards.jsx'

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token')
  const currentRole = localStorage.getItem('role')

  if (!token) {
    return <Navigate to="/" replace />
  }

  if (role && role !== currentRole) {
    return <Navigate to="/" replace />
  }

  return children
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Admin />} />
      </Route>

      <Route
        element={
          <ProtectedRoute role="admin">
            <Layout2 />
          </ProtectedRoute>
        }
      >
        <Route path ="/form" element={<Form />} />
        <Route path="/assign" element={<DutyAssignForm />} />
        <Route path="/leave" element={<LeaveRequests />} />
        <Route path="/record" element={<DutyRecords />} />
        <Route path="/guards" element={<GuardsList />} />
        <Route path="/guards/suspend" element={<SuspendGuards />} />
        <Route path="/guards/active" element={<ActiveGuards />} />
      </Route>

      <Route
        path="/guard-dashboard"
        element={
          <ProtectedRoute role="guard">
            <GuardDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/guard-leave"
        element={
          <ProtectedRoute role="guard">
            <LeavePage />
          </ProtectedRoute>
        }
      />
    </>
  )
)
// import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter> */}
      {/* <App /> */}
      <RouterProvider router={router} />
    {/* </BrowserRouter> */}
  </StrictMode>
)
