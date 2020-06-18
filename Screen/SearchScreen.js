import React, {useEffect} from 'react';
import { Text, View, Keyboard} from 'react-native';
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';

import {createCompanyList} from '../actions/stock';
const FlatList = styled.FlatList`
  width :100% ;
  backgroundColor: #fff
`;
const TouchableHighlight = styled.TouchableHighlight`
`;
const ActivityIndicator = styled.ActivityIndicator`
`;
const TextMain = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #636e72
`;
const TextSymbol = styled.Text`
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
`;
const TextDes = styled.Text`
  font-size: 10px;
  color: #636e72;
  margin-bottom: 15px;
`;
const ItemRow = styled.View`
  margin-left: 15px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;
const ItemTitle = styled.View`
  padding-left: 15px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  backgroundColor: rgb(242, 242, 242)
`;

const EmptyView = styled.View`
  width: 100%;
  height: 500
  flex-flow: column;
  align-items: center;
  justify-content: center;
`
function Item({ item, navigation } ) {
  return (
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="rgb(242, 242, 242)"
    onPress={() => {
      Keyboard.dismiss();
      navigation.navigate('Detail',{
        symbol:item.symbol
      })
    }}
    >
      <ItemRow>
        <TextSymbol>{item.symbol}</TextSymbol>
        <TextDes>{item.description}</TextDes>
      </ItemRow>
    </TouchableHighlight>
  )

}

//redux구조로 시도 term을 기억 / router term 연결 완료
export default function SearchScreen({ navigation, route }) {
  const [term, setTerm] = React.useState('');
  const [searchedCompanyList, setSearchedCompanyList] = React.useState([]);
  const dispatch = useDispatch();
  const companyList = useSelector(state => state.companyList);
  const loading = useSelector(state => state.loading);
  
  useEffect(() => {
    if (companyList) {
      if(route.params.term !== term){
        if(route.params.term === ""){
          setSearchedCompanyList([]);
          setTerm(route.params.term);
          return;         
        }else{
        let searchedCompany = companyList.filter(item =>(item.symbol.indexOf(route.params.term.toUpperCase()) > -1));
        setSearchedCompanyList(searchedCompany);
        setTerm(route.params.term);
        return;
        }
      }else{
        return;
      }
    }
    dispatch(createCompanyList());
  })
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={searchedCompanyList.slice(0,5)}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={item => item.symbol}
        ListHeaderComponent={<ItemTitle><TextMain>Symbols</TextMain></ItemTitle>}
        ListEmptyComponent={loading ? <ActivityIndicator size="large" color="#0000ff" />: 
        <EmptyView>
          <FontAwesome name="search" backgroundColor="white" color="gray" size={60}></FontAwesome>
          <TextMain>SYMBOL을 검색하세요.</TextMain>
        </EmptyView>
        }
      />
    </View>
  );
}