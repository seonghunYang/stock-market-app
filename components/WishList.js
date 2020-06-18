import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';

const TextMain = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 15px;
`;
const FlatList = styled.FlatList`
`;
const TouchableHighlight = styled.TouchableHighlight`
`;
const TextSymbol = styled.Text`
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
  margin-right: 15px;
`;
const TextDes = styled.Text`
  font-size: 10px;
  color: #636e72;
  margin-bottom: 15px;
  margin-left: 15px;
`;
const ItemView = styled.View`
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const RowView = styled.View`
  flex-flow: row;
  align-items: center;
`
const EmptyView = styled.View`
  height: 200;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`
const Button = styled.Button`
`

function Item({ item, navigation } ) {
  const contentInset = { top: 0, bottom: 0 }

  return (
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="rgb(242, 242, 242)"
    onPress={() => {
      navigation.navigate('Detail',{
        symbol:item.symbol
      })
    }}
    >
      <ItemView>
        <TextMain>{item.symbol}</TextMain>
        <RowView>
          <TextSymbol>{item.c[item.c.length -1]}</TextSymbol>
        </RowView>
      </ItemView>
    </TouchableHighlight>
  )
}
function EmptyComponent({navigation}) {
  return (
    <EmptyView>
      <TextMain>Wishlist가 없습니다</TextMain>
      <TextDes>wishlist를 추가해보세요!</TextDes>
      <Button title="ADD SYMBOL" onPress={() => {navigation.navigate('Screen',{term: ""})}}></Button>
    </EmptyView>
  )
}
export default function({ navigation }) {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();


  return (
    <Collapse>
      <CollapseHeader>
        <View>
          <TextMain>My Wishlist</TextMain>
          <TextDes>{wishlist.length} symbols</TextDes>
        </View>
      </CollapseHeader>
      <CollapseBody>
        <FlatList
          data={wishlist}
          renderItem={({ item }) => <Item item={item} navigation={navigation} />}
          keyExtractor={item => item.symbol}
          ListEmptyComponent={<EmptyComponent navigation={navigation} />}
        />
      </CollapseBody>
    </Collapse>
  )
}