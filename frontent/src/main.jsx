import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import Layout from './AdminCompo/Layout'
import Form from './AdminCompo/Form.jsx'
import DutyAssignForm from './AdminCompo/Assign.jsx'
import LeaveRequests from './AdminCompo/Leave.jsx'
import Admin from './AdminCompo/Admin.jsx'


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Layout2 from './AdminCompo/Layout2.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Admin />} />
      </Route>

      <Route element={<Layout2 />}>
        <Route path ="/form" element={<Form />} />
        <Route path="/assign" element={<DutyAssignForm />} />
        <Route path="/leave" element={<LeaveRequests />} />
      </Route>
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