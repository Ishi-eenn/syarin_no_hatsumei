import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top } from './components/pages/Top'
import { NotFound } from './components/pages/NotFound'
import React from 'react'
import { FooterTabs } from './common/Footer/FooterTabs'
import { AddPage } from './components/pages/AddPage'
import { ListPage } from './components/pages/ListPage'
import { SafeArea } from 'antd-mobile'

export const Main = () => {
  return (
    <div style={{ height:'100vh' }}>
      <BrowserRouter>
        <SafeArea position='top' style={{ height:'5vh' }} />
        <Routes>
          <Route exact path='/home' element={ <Top /> }/>
          <Route path='/add' element={ <AddPage /> } />
          <Route path='/list' element={ <ListPage /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
        <FooterTabs />
      </BrowserRouter>
    </div>
  )
}
