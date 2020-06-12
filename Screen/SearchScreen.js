import React, {useEffect} from 'react';
import { Text, View,FlatList} from 'react-native';
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'

import {createCompanyList} from '../actions/stock';
import {SearchCompany} from '../actions/stock';
const TouchableHighlight = styled.TouchableHighlight`
`;
const ItemRow = styled.View`
  flex-flow: row;
  align-items: center;
  margin-left: 15px;
  margin-right: 35px;
`;
function Item({ item } ) {
  return (
    <TouchableHighlight
    activeOpacity={0.6}>
      <ItemRow>
        <Text>{item.symbol}</Text>
      </ItemRow>
    </TouchableHighlight>
  )
}

//redux구조로 시도 term을 기억 / router term 연결 완료
export default function SearchScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const companyList = useSelector(state => state.companyList);
  const searchedCompanyList = useSelector(state => state.searchedCompanyList);
  // const a = route.params.term
  useEffect(() => {
    if (companyList) {
      if(route.params.term){
        // let searchedCompany = companyList.filter(item =>(item.symbol.indexOf(route.params.term.toUpperCase()) > -1));
        // dispatch(SearchCompany(searchedCompany));
      }
        return;
    }
    dispatch(createCompanyList());
  })
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{route.params.term}</Text>
      {/* <FlatList
        data={searchedCompanyList}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.symbol}
        ListHeaderComponent={<Text>symbols</Text>}
        ListEmptyComponent={<Text>search symbol</Text>}
      /> */}
    </View>
  );
}