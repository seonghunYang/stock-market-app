import axios from 'axios';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const BASE_URL = "https://finnhub.io/api";

export function createCompanyList() {
  return async (dispatch) => {
    try {
      const {data} = await axios(BASE_URL+"/v1/stock/symbol",
       {params: {
          exchange: "US",
          token : API_KEY
       }})
    
      dispatch({
        type:"CREATE_COMPANYLIST",
        payload: data,
      });
    }catch(error) {
      console.error(error);
    }
  }
}

export function SearchCompany(companyList) {
  return {
    type: "SEARCH_COMPANY",
    payload: companyList,
  }
}