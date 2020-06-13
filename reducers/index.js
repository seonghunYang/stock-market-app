import produce from "immer";

const initialState = {
  companyList: null ,
  news: [],
  loading: true
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_COMPANYLIST":
      state.companyList = action.payload;
      break;
    case "SEARCH_COMPANY":
      state.searchedCompanyList = action.payload;
      break;
    case "CREATE_JENERAL_NEWS":
      state.news = action.payload;
      break; 
    case "Start_Loading":
      state.loading = true;
      break;
    case "End_Loading":
      state.loading = false;
      break;
    default:
      break;
      
  }
}, initialState);

export default reducer;