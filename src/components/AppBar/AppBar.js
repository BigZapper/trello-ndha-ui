import React from 'react'
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import logo from 'assets/logo.png'
import './AppBar.scss'

export default function AppBar() {
  return (
    <nav className="navbar-app">
      <Container className='trello-container'>
        <Row>
          <Col sm={5} xs={12} className='col-no-padding'>
            <div className='app-actions'>
              <div className='item all'><i className="fa fa-th" /></div>
              <div className="item home"><i className="fa fa-home"></i></div>
              <div className="item boards"><i className="fa fa-columns"></i>&nbsp;&nbsp;<strong>Boards</strong></div>
              <div className="item search">
                <InputGroup className='group-search'>
                  <FormControl
                    className='input-search'
                    placeholder='Jump to...'
                  />
                  <InputGroup.Text className='input-icon-search'><i className="fa fa-search"></i></InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col className="col-no-padding" sm={2} xs={12}>
            <div className="app-branding text-center">
              <a href="# ">
                <img src={logo} alt="top-logo" className="top-logo" />
                <span className="slogan">Trello Clone App</span>
              </a>
            </div>
          </Col>
          <Col className="col-no-padding" sm={5} xs={12}>
            <div className="user-actions">
              <div className="item quick"><i className="fa fa-plus-square-o"></i></div>
              <div className="item news"><i className="fa fa-info-circle"></i></div>
              <div className="item notification"><i className="fa fa-bell-o"></i></div>
              <div className="item user-avatar">
                <img src="https://lh3.googleusercontent.com/ogw/ADea4I5iWJ0RmxsFyvU_BsOSb9xTvIIF8dZxHFmih2NmFQ=s32-c-mo" alt="avatar" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  )
}
