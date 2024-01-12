import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top } from './components/pages/Top'
import { NotFound } from './components/pages/NotFound'
import React, { createContext } from 'react'
import { FooterTabs } from './common/Footer/FooterTabs'
import { AddPage } from './components/pages/AddPage'
import { ListPage } from './components/pages/ListPage'
import { SafeArea } from 'antd-mobile'

export const BookDataContext = createContext();

export const Main = () => {
  const [bookData, setBookData] = React.useState([]);
  return (
    <div style={{ height:'100vh' }}>
      <BookDataContext.Provider value={[bookData, setBookData]}>
        <BrowserRouter>
          <SafeArea position='top' style={{ height:'5vh' }} />
          <Routes >
            <Route exact path='/' element={ <Top /> }/>
            <Route path='/list' element={ <ListPage /> } />
            <Route path='*' element={ <NotFound /> } />
          </Routes>
          <FooterTabs />
        </BrowserRouter>
      </BookDataContext.Provider>
    </div>
  )
}
