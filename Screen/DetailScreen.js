import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";

import {detailInfo} from '../actions/stock';

const Text = styled.Text``
const View = styled.View``


export default function DetailScreen({route}) {
  const companyInfo = useSelector(state => state.companyInfo);
  const companyStockInfo = useSelector(state => state.companyStockInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!companyInfo){
      dispatch(detailInfo(route.params.symbol));
    }
    return;
  })
  return (
    <>
    {companyInfo &&
    <View>
    <Text>{companyInfo.symbol}</Text>
    <Text>{companyStockInfo.c}</Text>
    </View>
}
    </>

  );
}