import React from 'react';
import { v4 } from 'uuid';
import useInput from './use-input';
import { connect } from 'react-redux';
import * as actions from '../../actions/postCardAction';
import { Modal, Button } from 'react-bootstrap';

const isNotEmpty = (value) => value.trim() !== '';

const AddCard = (props) => {
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);
  const {
    value: typeValue,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resettype,
  } = useInput(isNotEmpty);
  const {
    value: colorValue,
    isValid: colorIsValid,
    hasError: colorHasError,
    valueChangeHandler: colorChangeHandler,
    inputBlurHandler: colorBlurHandler,
    reset: resetcolor,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (titleIsValid && typeIsValid && descriptionIsValid && colorIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    console.log('Card Added Successfully');
    event.preventDefault();
    // date
    let today = new Date();
    let time = today.toLocaleString([], { hour12: true });

    if (!formIsValid) {
      return;
    }
    let itemsfetch = {
      _id: v4(),
      title: titleValue,
      description: descriptionValue,
      assign_to: typeValue,
      color: colorValue,
      date: time,
    };

    const onSuccess = () => {
      window.alert('Card Create Successfully');
      props.handleClose();
    };
    console.log(itemsfetch);
    props.createPostCard(itemsfetch, onSuccess);
    resetTitle();
    resettype();
    resetDescription();
    resetcolor();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Card</Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              value={titleValue}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              type='text'
              className='form-control'
              id='title'
              placeholder='Enter Title'
            />
            {titleHasError && (
              <p className='error-text'>Please enter a Title.</p>
            )}
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea
              className='form-control'
              id='description'
              rows='3'
              placeholder='Enter Description'
              value={descriptionValue}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
            ></textarea>
            {descriptionHasError && (
              <p className='error-text'>Please enter a description.</p>
            )}
          </div>
          <div>
            <label htmlFor='exampleColorInput' className='form-label'>
              Color picker
            </label>
            <input
              type='color'
              className='form-control form-control-color'
              id='exampleColorInput'
              title='Choose your color'
              value={colorValue}
              onChange={colorChangeHandler}
              onBlur={colorBlurHandler}
            ></input>
            {colorHasError && (
              <p className='error-text'>Please enter a Color.</p>
            )}
          </div>
          <div>
            <label htmlFor='assign_to' className='form-label'>
              Assign To
            </label>
            <select
              className='form-select'
              aria-label='Default select example'
              defaultValue={typeValue}
              onChange={typeChangeHandler}
              onBlur={typeBlurHandler}
            >
              <option value='todo'>Todo</option>
              <option value='doing'>Doing</option>
              <option value='done'>Done</option>
            </select>
            {typeHasError && <p className='error-text'>Please enter a Type.</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleClose}>
            Close
          </Button>
          <button
            disabled={!formIsValid}
            className='btn btn-primary'
            variant='primary'
            value='submit'
          >
            Submit
          </button>
        </Modal.Footer>
      </form>
    </>
  );
};
const mapStateToProps = (state) => ({
  postCardList: state.postCard,
});

const mapActionToProps = {
  createPostCard: actions.create,
};
export default connect(mapStateToProps, mapActionToProps)(AddCard);
