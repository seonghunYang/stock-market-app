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
    }catch(error) {
      console.error(error);
    }
  }
}