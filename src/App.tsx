import { Routes, Route } from 'react-router-dom'

import Dashboard from './layouts/Dashboard'
import FormFeeTypePage from './pages/FormFeeTypePage'
import TypeFeePage from './pages/TypeFeePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<TypeFeePage />} />
        <Route path="/create" element={<FormFeeTypePage isEdit={ false } />} />
        <Route path="/edit" element={<FormFeeTypePage isEdit={ true } />} />
      </Route>
    </Routes>
  )
}

export default App
