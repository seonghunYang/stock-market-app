import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";

import {detailInfo} from '../actions/stock';
import LiveStock from '../components/LiveStock';
import StockStatus from '../components/StockStatus';

const Text = styled.Text``
const View = styled.View``
const InfoView = styled.View`
  width: 100%;
  backgroundColor: #fff;
  margin-bottom: 5px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`
const RowView = styled.View`
  flex-flow: row;
  align-items: center;
`
const ActivityIndicator = styled.ActivityIndicator`
`;
const SymbolText =styled.Text`
  margin-left: 20px;
  margin-top: 15px;
  font-weight: bold;
  font-size: 25px;
  `
const NameText =styled.Text`
  color: #636e72;
  font-size: 20px;
  margin-left: 15px;
  margin-top: 15px;
`

export default function DetailScreen({route}) {
  const companyInfo = useSelector(state => state.companyInfo);
  const companyStockInfo = useSelector(state => state.companyStockInfo);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if(companyInfo){
      if(companyInfo.symbol === route.params.symbol){
        return ;
      }
      else{
        dispatch(detailInfo(route.params.symbol));
        return;
      }
    }
    else{
    dispatch(detailInfo(route.params.symbol));
    return;
  }
  })
  return (
    <View>
    {loading && <ActivityIndicator size="large" color="#0000ff" />}
    {companyInfo &&
    <View>
      <InfoView>
        <RowView>
          <SymbolText>{companyInfo.symbol}</SymbolText>
          <NameText>{companyInfo.name}</NameText>
        </RowView>
        <RowView>
          <LiveStock stockInfo={companyStockInfo} symbol={companyInfo.symbol} /> 
        </RowView>
      </InfoView>
      <InfoView>
        <StockStatus></StockStatus>
      </InfoView>
    </View>
    }
    </View>

  );
}