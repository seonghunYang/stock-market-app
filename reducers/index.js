import produce from "immer";

const initialState = {
  news: null
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_JENERAL_NEWS":
      state.news = action.payload;
      break; 
    default:
      break;
  }
}, initialState);

export default reducer;