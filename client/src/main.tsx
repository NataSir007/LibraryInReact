import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'
import './index.css'
import './utils/i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <RouterProvider router={router as any} />
  </StrictMode>
)
