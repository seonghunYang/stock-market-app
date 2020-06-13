import axios from 'axios';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const BASE_URL = "https://finnhub.io/api";

export function createCompanyList() {
  return async (dispatch) => {
    try {
      dispatch({type:"Start_Loading"})
      const {data} = await axios(BASE_URL+"/v1/stock/symbol",
       {params: {
          exchange: "US",
          token : API_KEY
       }})
      dispatch({
        type:"CREATE_COMPANYLIST",
        payload: data,
      });
      dispatch({type:"End_Loading"})
    }catch(error) {
      console.error(error);
    }
  }
}

export function detailInfo(symbol) {
  return async (dispatch) => {
    try {
      const {data} = await axios(BASE_URL+"/v1/stock/profile2", 
        {params: { symbol: symbol, token : API_KEY}});
      data["symbol"] = symbol;

      const quote_data = await axios(BASE_URL+"/v1/quote",
        {params: {symbol: symbol, token: API_KEY}}
        );

      const target_data = await axios(BASE_URL+"/v1/stock/price-target",{
        params: {symbol: symbol, token: API_KEY}
      });        
      quote_data.data["targetHigh"] = target_data.data.targetHigh;
      quote_data.data["targetLow"] = target_data.data.targetLow;
      quote_data.data["targetMean"] = target_data.data.targetMean;
    
      if(Object.keys(data).length === 0) {
        dispatch({
          type: "CREATE_DETAIL",
          payload: {ticker: symbol, name: "no company information"},
          payload2: quote_data.data,
        })
      }else{
      dispatch({
        type: "CREATE_DETAIL",
        payload: data,
        payload2: quote_data.data,
      });
    }
    }catch(error) {
      console.error(error);
    }
  }
}