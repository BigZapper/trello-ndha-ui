import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { Container, Draggable } from 'react-smooth-dnd'
import { MODAL_ACTION_CONFIRM } from 'ultilities/constant'
import { saveContentAfterPressEnter, selectAllInlineText } from 'ultilities/contentEditable'
import { mapOrder } from 'ultilities/sorts'
import './Column.scss'

export default function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size='sm'
            type='text'
            className='trello-content-editable'
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size='sm' className='dropdown-btn' />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Move all cards in this column (beta)...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Archive all cards in this column (beta)...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className='card-list'>
        <Container
          groupName='col'
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass='card-ghost'
          dropClass='card-ghost-drop'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className='footer-actions'>
          <i className='fa fa-plus icon' /> Add another card
        </div>
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title='Remove column'
        content={`Are you sure you want to remove <strong> ${column.title} </strong>? <br/>All related cards will also be remove`}
      />
    </div>
  )
}
