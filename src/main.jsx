import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top } from './components/pages/Top'
import { NotFound } from './components/pages/NotFound'

export const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Top />}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
