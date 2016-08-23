import Immutable from 'immutable';

import {
  SET_ITEMS,
  SELECT_ITEM,
  SELECT_TAB
} from '../actions/app-actions';

const initialState = Immutable.fromJS({
  items: [],
  chosenItem: null,
  currentTab: 0 // just pick the first tab
});

// Process fetched items somehow
const modifyItems = items => items.map((item, index) => {
  item.id = index;
  item.foo = 'bar';
  return item;
})

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return state.set('items', Immutable.fromJS(modifyItems(action.payload)));
    case SELECT_ITEM:
      return state.set('chosenItem', Immutable.fromJS(action.payload));
    case SELECT_TAB:
      return state.merge({
        currentTab: action.payload,
        chosenItem: null,
        items: Immutable.fromJS([])
      });

    default:
      return state;
  }
}
