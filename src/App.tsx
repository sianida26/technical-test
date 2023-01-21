import { Routes, Route } from 'react-router-dom'

import Dashboard from './layouts/Dashboard'
import TypeFeePage from './pages/TypeFeePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<TypeFeePage />} />
      </Route>
    </Routes>
  )
}

export default App
