import produce from "immer";

const initialState = {
  companyList: null ,
  news: [],
  loading: true,
  companyInfo: null,
  companyStockInfo: null,
  chartData: null,
  companyNews: null,
  mainData: null,
  wishlist: [],
  wishlistInfo: [],
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_MAIN_DATA":
      state.mainData = action.payload;
      break;
    case "CREATE_COMPANYLIST":
      state.companyList = action.payload;
      break;
    case "CREATE_DETAIL":
      state.companyInfo = action.payload;
      state.companyStockInfo = action.payload2;
      state.chartData = action.payload3;
      state.companyNews = action.payload4
      break;
    case "SEARCH_COMPANY":
      state.searchedCompanyList = action.payload;
      break;
    case "CREATE_JENERAL_NEWS":
      state.news = action.payload;
      break; 
    case "ADD_WISHLIST": 
      state.wishlist.push(action.payload);
      break;
    case "DELETE_WISHLIST":
      const cleanwishlist = state.wishlist.filter(function(item) {  //true만 남김
        return item.symbol !== action.symbol;
      }); 
      state.wishlist = cleanwishlist;
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