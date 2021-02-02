import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { Transactions } from './transactions'

function AppRouter () {
  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light' css={navStyle} >
          <Link className='navbar-brand' to='/'><img alt='Divvy logo' css={logoStyle} src='//app.divvy.co/assets/icons/favicon.ico' width='60px' /></Link>
          <button aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation' className='navbar-toggler' data-target='#navbarNavAltMarkup' data-toggle='collapse' type='button'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav' />
            <Link className='nav-item nav-link' css={linkStyle} to='/transactions'>Transactions</Link>
          </div>
        </nav>
        <br />
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Transactions} exact path='/transactions' />
        </div>
      </div>
      <footer>
        <br />
      </footer>
    </Router>
  )
}

export default AppRouter

const navStyle = css`
  background: #fff8d7;
  padding: 20px 20px;
  border-bottom: 1px solid #ddd;
  color: #000;
`
const linkStyle = css`
  color: #02306d;
`
const logoStyle = css`
  margin-top: -5px;
  background: #fff;
  border-radius: 100px;
  border: 1px solid #000;
`
const contentStyle = css`
  grid-row: 2;
`
