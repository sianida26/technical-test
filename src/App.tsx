import { Routes, Route } from 'react-router-dom'

import Dashboard from './layouts/Dashboard'
import CreateFeeTypePage from './pages/CreateFeeTypePage'
import TypeFeePage from './pages/TypeFeePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<TypeFeePage />} />
        <Route path="/create" element={<CreateFeeTypePage />} />
      </Route>
    </Routes>
  )
}

export default App
