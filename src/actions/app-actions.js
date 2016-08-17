import people from '../data/people';
import sports from '../data/sports';

const data = {
  people,
  sports
}

const SELECT_ITEM = 'SELECT_ITEM';
const selectItem = item => ({ type: SELECT_ITEM, payload: item });
const closeItem = item => ({ type: SELECT_ITEM, payload: null });

const SET_ITEMS = 'SET_ITEMS';
const fetchItems = category => {

  // in real world we would fetch these from server
  const resultFromFetch = data[category];

  return { type: SET_ITEMS, payload: resultFromFetch }
};


const SELECT_TAB = 'SELECT_TAB';
const selectTab = tab => {
	console.log('selecting tab id: ', tab);
	return { type: SELECT_TAB, payload: tab };
};


export {
  SET_ITEMS,
  SELECT_ITEM,
  SELECT_TAB,

  fetchItems,
  selectItem,
  closeItem,
  selectTab
};