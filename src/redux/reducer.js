import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, SET_ITEMS, BOUGHT_ITEMS } from './action';

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };

    case REMOVE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };

    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case SET_ITEMS:
      return { ...state, items: action.payload };

    case BOUGHT_ITEMS:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, bought: !item.bought } : item
        ),
      };

    default:
      return state;
  }
};

export default reducer;
