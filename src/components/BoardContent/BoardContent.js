import Column from 'components/Column/Column'
import { isEmpty, cloneDeep } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import './BoardContent.scss'
import { mapOrder } from 'ultilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from 'ultilities/dragDrop'
import { Button, Col, Container as BSContainer, Form, Row } from 'react-bootstrap'
import { createNewColumn, fetchBoardDetails, updateBoard, updateColumn, updateCard } from 'actions/ApiCall'

export default function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleOpenNewColumForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  const newColumnInputRef = useRef(null)

  useEffect(() => {
    // const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    const boardId = '615b0d52da99e3318035ef92'
    fetchBoardDetails(boardId).then(board => {
      setBoard(board)
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return <div className='not-found'>
      Board not found!
    </div>
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = cloneDeep(board)
    const oldBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    // Only call api when columnOrder change
    if (JSON.stringify(newBoard.columnOrder) !== JSON.stringify(oldBoard.columnOrder)) {
      // Call api update columnOrder in board detail
      updateBoard(newBoard._id, newBoard).catch(() => {
        setColumns(columns)
        setBoard(board)
      })
    }
  }


  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex != null || dropResult.addedIndex != null) {
      let newColumns = cloneDeep(columns)
      const oldColumn = columns.find(c => c._id === columnId)
      let currentColumn = newColumns.find(c => c._id === columnId)

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id)

      setColumns(newColumns)
      if (dropResult.removedIndex != null && dropResult.addedIndex != null) {
        /**
         * Action: move card inside its column
         * 1. Call api update cardOrder in current column
         */
        // Only call api when cardOrder change
        if (JSON.stringify(currentColumn.cardOrder) !== JSON.stringify(oldColumn.cardOrder)) {
          updateColumn(currentColumn._id, currentColumn).catch(() => { setColumns(columns) })
        }
      } else {
        /**
         * Action: move card between two column
         * 1. Call api update cardOrder in current column
         * 2. Call api update columnId in current card
         */
        updateColumn(currentColumn._id, currentColumn).catch(() => { setColumns(columns) })

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          // Call api update columnId in current card
          updateCard(currentCard._id, currentCard)
        }
      }

    }
  }


  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }
    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    }

    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)

      setNewColumnTitle('')
      toggleOpenNewColumForm()
    })

  }

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id

    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      // remove column
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      // update column information
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'columns-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState}
            />
          </Draggable>
        ))}
      </Container>

      <BSContainer className='trello-container'>
        {
          !openNewColumnForm &&
          <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumForm}>
              <i className='fa fa-plus icon' /> Add another column
            </Col>
          </Row>
        }

        {
          openNewColumnForm &&
          <Row>
            <Col className='enter-new-column'>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Enter column title...'
                className='input-enter-new-column'
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
              />
              <Button onClick={addNewColumn} variant='success' size='sm'>Add column</Button>
              <span onClick={toggleOpenNewColumForm} className='cancel-icon'>
                <i className='fa fa-trash icon'></i>
              </span>
            </Col>
          </Row>
        }

      </BSContainer>
    </div>
  )
}
