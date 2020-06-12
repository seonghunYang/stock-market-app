import produce from "immer";

const initialState = {
  companyList: null ,
  searchedCompanyList: [],
  news: null
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_COMPANYLIST":
      state.companyList = action.payload;
      state.searchedCompanyList = action.payload;
      break;
    case "SEARCH_COMPANY":
      state.searchedCompanyList = action.payload;
      break;
    case "CREATE_JENERAL_NEWS":
      state.news = action.payload;
      break; 
    default:
      break;
      
  }
}, initialState);

export default reducer;