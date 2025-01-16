import { Router } from '../lib/electron-router-dom'

import { Route } from 'react-router-dom'
import Dashboard from './src/screens/Dashboard'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Dashboard />} />
        </>
      }
    />
  )
}
