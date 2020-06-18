import axios from 'axios';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const BASE_URL = "https://finnhub.io/api";

export function mainDataLoader() {
  return async (dispatch) => {
    try{
      let mainData = [];
      let d = new Date();
      let toDay = parseInt(d.getTime() / 1000); 
      let fromDay = parseInt(d.getTime() / 1000) - 60 * 60 * 24; 

      const EUR_USD = await axios(BASE_URL+"/v1/forex/candle",{
        params:{
          symbol:"OANDA:EUR_USD",
          resolution:"60",
          from: fromDay,
          to: toDay,
          token: API_KEY
      }})
      EUR_USD.data["symbol"] = "EUS_USD";
      mainData.push(EUR_USD.data)

      const GBP_USD = await axios(BASE_URL+"/v1/forex/candle",{
        params:{
          symbol:"OANDA:GBP_USD",
          resolution:"60",
          from: fromDay,
          to: toDay,
          token: API_KEY
      }})
      GBP_USD.data["symbol"] = "GBP_USD";
      mainData.push(GBP_USD.data)

      const BTCUSDT = await axios(BASE_URL+"/v1/crypto/candle",{
        params:{
          symbol:"BINANCE:BTCUSDT",
          resolution:"60",
          from: fromDay,
          to: toDay,
          token: API_KEY
      }})
      BTCUSDT.data["symbol"] = "BTC_USDT";
      mainData.push(BTCUSDT.data)

      const ETHUSDT = await axios(BASE_URL+"/v1/crypto/candle",{
        params:{
          symbol:"BINANCE:ETHUSDT",
          resolution:"60",
          from: fromDay,
          to: toDay,
          token: API_KEY
      }})
      ETHUSDT.data["symbol"] = "ETH_USDT";
      mainData.push(ETHUSDT.data)

      const AAPL = await axios(BASE_URL+"/v1/stock/candle",{
        params:{
          symbol:"AAPL",
          resolution:"60",
          from: fromDay,
          to: toDay,
          token: API_KEY
      }})
      AAPL.data["symbol"] = "AAPL";
      mainData.push(AAPL.data)

      const MSFT = await axios(BASE_URL+"/v1/stock/candle",{
        params:{
          symbol:"MSFT",
          resolution:"60",
          from: fromDay,
          to: toDay,
          token: API_KEY
      }})
      MSFT.data["symbol"] = "MSFT";
      mainData.push(MSFT.data)

      const AMZN = await axios(BASE_URL+"/v1/stock/candle",{
        params:{
          symbol:"AMZN",
          resolution:"60",
          from: fromDay,
          to: toDay,
          token: API_KEY
      }})
      AMZN.data["symbol"] = "AMZN";
      mainData.push(AMZN.data)
      
      dispatch({type: "CREATE_MAIN_DATA", payload: mainData})
    }catch(error){
      console.log(error)
    }
  }
}


export function addWishlist (symbol) {
  return async (dispatch) => {
    let d = new Date();
    let toDay = parseInt(d.getTime() / 1000); 
    let fromDay = parseInt(d.getTime() / 1000) - 60 * 60 * 24; 
    const {data} = await axios(BASE_URL+"/v1/stock/candle",{
      params:{
        symbol:symbol,
        resolution:"60",
        from: fromDay,
        to: toDay,
        token: API_KEY
    }})
    data["symbol"] = symbol;
    dispatch({type: "ADD_WISHLIST", payload: data});
  }
}

export function deleteWishlist (symbol) {
  return ({
    type: "DELETE_WISHLIST", symbol: symbol
  })
}

