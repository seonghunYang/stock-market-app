import axios from 'axios';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const BASE_URL = "https://finnhub.io/api";

export function CreateGeneralNews(category ="general") {
  return async (dispatch) => {
    try{
      const {data} = await axios(BASE_URL+"/v1/news", 
        {params: { category: category, token : API_KEY}});
      data[0]["symbol"] = category;
      dispatch({type: "CREATE_JENERAL_NEWS", payload: data});
      return;
    }catch(error) {
      console.error(error);
    }
  }
}


// export function SymbolSearchNews(symbol) {
//   return async (dispatch) => {
//     try{
//       let toDay = new Date(); 
//       let fromDay = new Date(toDay.getTime() - 60 * 60 * 24 * 14 * 1000)
//       toDay = getFormatDate(toDay);
//       fromDay = getFormatDate(fromDay);
//       const {data} = await axios(BASE_URL+"/v1/company-news",{
//         params: {
//           symbol: symbol,
//           from: fromDay,
//           to: toDay,
//           token: API_KEY
//         }
//       })
//       if(data.length !== 0) {
//         data[0]["symbol"] = symbol;
//       }
//       return data;
//     }catch(error) {
//       console.error(error);
//     }
//   }
// }

function getFormatDate(date){
  var year = date.getFullYear();              //yyyy
  var month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  var day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return  year + '-' + month + '-' + day;
}