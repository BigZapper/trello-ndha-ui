import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './BoardBar.scss'

export default function BoardBar() {
  return (
    <nav className='navbar-board'>
      <Container className='trello-container'>
        <Row>
          <Col className='col-no-padding' sm={10} xs={12}>
            <div className="board-info">
              <div className="item board-logo-icon">
                <i className="fa fa-coffee"></i>&nbsp;&nbsp;<strong>Trello Clone App</strong>
              </div>
              <div className="divider"></div>

              <div className="item board-type">Private Workspace</div>
              <div className="divider"></div>

              <div className="item member-avatar">
                <img src="https://lh3.googleusercontent.com/a-/AOh14Ghtl7KjFCM0oSII6h9MMvEDY-h59jpMraNjoQIRvQ=s64-c" alt="avatar" />
                <img src="https://lh3.googleusercontent.com/a-/AOh14Gj50bGQXSnShEklQbHovgBOFvhZ6DbXXY8RRN0deA=s64-c" alt="avatar" />
                <img src="https://lh3.googleusercontent.com/a-/AOh14GiUIOsgrxmt8jKk9Z_UWGEuOzewY_h0GLd3ZgIYhg=s64-c" alt="avatar" />
                <img src="https://lh3.googleusercontent.com/a-/AOh14GgrpN5kLpuvVynQg235dPffhzEiJdxi0UK26FkW=s64-c" alt="avatar" />
                <img src="https://lh3.googleusercontent.com/a-/AOh14GjMMZCLTFHxncGHNONyU-zpS5Y2PM9nMq0Ctxhu=s64-c" alt="avatar" />
                <span className="more-members">+7</span>
                <span className='invite'>Invite</span>
              </div>
            </div>
          </Col>
          <Col className="col-no-paddn" sm={2} xs={12}>
            <div className="board-actions">
              <div className="item menu"><i className="fa fa-ellipsis-h mr-2 mt-1"></i> Show menu</div>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  )
}
