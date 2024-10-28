// src/redux/actions.js

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_ITEMS = 'SET_ITEMS';

export const addItem = (item) => ({ type: ADD_ITEM, payload: item });
export const removeItem = (id) => ({ type: REMOVE_ITEM, payload: id });
export const updateItem = (item) => ({ type: UPDATE_ITEM, payload: item });
export const setItems = (items) => ({ type: SET_ITEMS, payload: items });
