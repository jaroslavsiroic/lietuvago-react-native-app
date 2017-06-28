const initialState = {
  showModal: false,
  modalText: ''
};

export default function modalReducer(state = initialState, action) {

  switch (action.type) {
    case 'SHOW_MODAL':
      console.log('SHOW_MODAL modal reducer');
      state = Object.assign({}, state);
      state.showModal = true;
      state.modalText = action.text;
    break;
    case 'HIDE_MODAL':
      state = Object.assign({}, initialState);
    break;
  }
  return state;
}