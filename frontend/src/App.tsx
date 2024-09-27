import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='bg-slate-400'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </div>
  )
}

export default App