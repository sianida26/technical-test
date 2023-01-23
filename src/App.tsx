import { Routes, Route } from 'react-router-dom'

import Dashboard from './layouts/Dashboard'
import FormFeeTypePage from './pages/FormFeeTypePage'
import TypeFeePage from './pages/TypeFeePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<TypeFeePage />} />
        <Route path="/create" element={<FormFeeTypePage action="create" />} />
        <Route path="/edit" element={<FormFeeTypePage action="edit" />} />
        <Route path="/details" element={<FormFeeTypePage action="view" />} />
      </Route>
    </Routes>
  )
}

export default App
