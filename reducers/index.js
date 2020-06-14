import produce from "immer";

const initialState = {
  companyList: null ,
  news: [],
  loading: true,
  companyInfo: null,
  companyStockInfo: null,
  chartData: null,
  companyNews: null
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_COMPANYLIST":
      state.companyList = action.payload;
      break;
    case "CREATE_DETAIL":
      state.companyInfo = action.payload;
      state.companyStockInfo = action.payload2;
      break;
    case "CREATE_CHARTDATA":
      state.chartData = action.payload;
      break;
    case "SEARCH_COMPANY":
      state.searchedCompanyList = action.payload;
      break;
    case "CREATE_JENERAL_NEWS":
      state.news = action.payload;
      break; 
    case "CREATE_SYMBOL_NEWS":
      state.companyNews = action.payload
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