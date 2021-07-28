import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './Lists.css';
const Lists = (props) => {
  let data = props.data;
  // console.log(data);
  const [columns, setColumns] = useState(data);

  useEffect(() => {
    setColumns(data);
  }, [data]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className='tasks'>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className='tasks__column' key={`${columnId}${column.title}`}>
              <h3 style={{ color: 'grey' }}>{column.title}</h3>
              <Droppable droppableId={columnId}>
                {(provider) => {
                  return (
                    <div
                      className='tasks__list'
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Cards key={item.id} card={item} index={index} />
                        );
                      })}
                      {provider.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Lists;
