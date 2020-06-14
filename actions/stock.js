import axios from 'axios';
import {SymbolSearchNews} from './news';
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
      dispatch({type:"Start_Loading"})
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
    
      let d = new Date();
      let toDay = parseInt(d.getTime() / 1000); 
      let fromDay = parseInt(d.getTime() / 1000) - 60 * 60 * 24 * 14; 
      const chartData = await axios(BASE_URL+"/v1/stock/candle",
      {params: {
        symbol: symbol,
        resolution: "D",
        token : API_KEY,
        from: fromDay,
        to: toDay
      }});

      toDay = new Date(); 
      fromDay = new Date(toDay.getTime() - 60 * 60 * 24 * 14 * 1000)
      toDay = getFormatDate(toDay);
      fromDay = getFormatDate(fromDay);
      const companyNews = await axios(BASE_URL+"/v1/company-news",{
        params: {
          symbol: symbol,
          from: fromDay,
          to: toDay,
          token: API_KEY
        }
      })

      if(Object.keys(data).length === 0) {
        dispatch({
          type: "CREATE_DETAIL",
          payload: {ticker: symbol, name: "no company information"},
          payload2: quote_data.data,
          payload3: chartData.data,
          payload4: companyNews.data
        })
        dispatch({type:"End_Loading"})
      }else{
      dispatch({
        type: "CREATE_DETAIL",
        payload: data,
        payload2: quote_data.data,
        payload3: chartData.data,
        payload4: companyNews.data
      });
      dispatch({type:"End_Loading"})
    }
    }catch(error) {
      console.error(error);
    }
  }
}

function getFormatDate(date){
  var year = date.getFullYear();              //yyyy
  var month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  var day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return  year + '-' + month + '-' + day;
}

//모듈화 일단 너무 느려서 합침
// export function createChartData(symbol, resolution = "D") {
//   return async (dispatch) => {
//     try {
//       let d = new Date();
//       let toDay = parseInt(d.getTime() / 1000); 
//       let fromDay = parseInt(d.getTime() / 1000) - 60 * 60 * 24 * 14; 
//       const {data} = await axios(BASE_URL+"/v1/stock/candle",
//       {params: {
//         symbol: symbol,
//         resolution: resolution,
//         token : API_KEY,
//         from: fromDay,
//         to: toDay
//       }});
//       return data;
//   }catch(error) {
//     console.error(error);
//   }
//   }
// }