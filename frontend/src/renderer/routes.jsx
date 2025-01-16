import { Router } from '../lib/electron-router-dom'

import { Route } from 'react-router-dom'
import Clock from './src/components/Clock'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Clock />} />
        </>
      }
    />
  )
}
