import axios from 'axios';
import {
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
} from '../constants/notesConstants';
// import { fetchNotes } from '../../api/api';
import api from '../../api/api';

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await api.fetchNotes(userInfo);

    const sortedData = data.sort(
      (a, b) => (a.createdAt < b.createdAt && 1) || -1,
    );

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: sortedData,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const data = await api.addNote(userInfo, title, content, category);

      dispatch({
        type: NOTE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const data = await api.updateNote(userInfo, id, title, content, category);

      dispatch({
        type: NOTE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNoteAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await api.removeNote(userInfo, id);

    dispatch({
      type: NOTE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload: message,
    });
  }
};
