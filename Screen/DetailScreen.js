import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'

import {detailInfo} from '../actions/stock';

import LiveStock from '../components/LiveStock';
import StockStatus from '../components/StockStatus';
import Chart from '../components/Chart';
import NewsItem from '../components/NewsItem';

const Text = styled.Text`
`;
const View = styled.View`
`;
const FlatList = styled.FlatList`
  width :100% ;
`;
const ScrollView = styled.ScrollView`
`;
const ChartView = styled.View`
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
`;
const InfoView = styled.View`
  width: 100%;
  backgroundColor: #fff;
  margin-bottom: 5px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;
const RowView = styled.View`
  flex-flow: row;
  align-items: center;
`;
const ActivityIndicator = styled.ActivityIndicator`
`;
const SymbolText =styled.Text`
  margin-left: 20px;
  margin-top: 15px;
  font-weight: bold;
  font-size: 25px;
`;
const NameText =styled.Text`
  color: #636e72;
  font-size: 20px;
  margin-left: 15px;
  margin-top: 15px;
`;
const RefreshControl = styled.RefreshControl`
`;
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function DetailScreen({route}) {
  const companyInfo = useSelector(state => state.companyInfo);
  const companyStockInfo = useSelector(state => state.companyStockInfo);
  const chartData = useSelector(state => state.chartData);
  const companyNews = useSelector(state => state.companyNews);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    dispatch(detailInfo(route.params.symbol)).then(() => setRefreshing(false));
  }, [refreshing]);
  
  return (
    <ScrollView
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
    {companyInfo && chartData && companyNews && !loading ?
    <View>
      <InfoView>
        <RowView>
          <SymbolText>{companyInfo.symbol}</SymbolText>
          <NameText>{companyInfo.name}</NameText>
        </RowView>
        <RowView>
          <LiveStock stockInfo={companyStockInfo} symbol={companyInfo.symbol} /> 
        </RowView>
        <ChartView>
          <Chart data={chartData}></Chart>
        </ChartView>
      </InfoView>
      <InfoView>
        <StockStatus stockInfo={companyStockInfo} ></StockStatus>
      </InfoView>
      <InfoView>
        <FlatList
          data={companyNews}
          renderItem={({ item }) => <NewsItem item={item} />}
          keyExtractor={item => item.id}
        />
      </InfoView>
    </View>
    : !refreshing && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
}