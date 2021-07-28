import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import './Cards.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/postCardAction';

const Cards = (props) => {
  const card = props.card;
  const index = props.index;
  //   console.log(card);

  const [actionbtn, setActionbtn] = useState(false);

  const leaveactionHandler = () => {
    setActionbtn(false);
  };

  const enteractionHandler = () => {
    setActionbtn(true);
  };

  const handlerEdit = (card) => {
    console.log('Edit');
  };

  const onSuccess = () => {
    window.alert('Deleted Successfully');
  };

  const handlerDelete = (card) => {
    if (window.confirm('Are you sure to delete this record?')) {
      props.deletePostCard(card.id, onSuccess);
    }
    console.log('Delete', card.id);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            key={card._id}
            className='task__item'
            // className={`item ${snapshot.isDragging && 'dragging'}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card
              style={{ borderLeft: `2px solid ${card.color}` }}
              onMouseLeave={leaveactionHandler}
              onMouseEnter={enteractionHandler}
            >
              <Card.Body
                style={{
                  padding: '5px',
                  textOverflow: 'ellipsis',
                }}
              >
                <Card.Title style={{ textTransform: 'capitalize' }}>
                  {card.title}
                </Card.Title>
                <Card.Text style={{ color: 'grey' }}>
                  {card.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ padding: '5px' }}>
                <small className='text-muted' style={{ display: 'flex' }}>
                  {card.date}
                  {actionbtn && (
                    <div style={{ display: 'flex', marginLeft: 'auto' }}>
                      <i
                        onClick={() => handlerEdit(card)}
                        className='bi bi-pencil-square'
                        style={{
                          color: 'grey',
                          cursor: 'pointer',
                          marginRight: '20px',
                        }}
                      ></i>
                      <i
                        onClick={() => handlerDelete(card)}
                        className='bi bi-archive-fill'
                        style={{ color: 'grey', cursor: 'pointer' }}
                      ></i>
                    </div>
                  )}
                </small>
              </Card.Footer>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};
const mapStateToProps = (state) => ({
  postCardList: state.postCard,
});

const mapActionToProps = {
  deletePostCard: actions.Delete,
};
export default connect(mapStateToProps, mapActionToProps)(Cards);
