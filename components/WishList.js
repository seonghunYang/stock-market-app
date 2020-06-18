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
`;
const TextDes = styled.Text`
  font-size: 10px;
  color: #636e72;
  margin-bottom: 15px;
  margin-left: 15px;
`;
const ItemView = styled.View`
  margin-bottom: 15px;
`;
function Item({ item, navigation } ) {
  return (
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="rgb(242, 242, 242)"
    onPress={() => {
      navigation.navigate('Detail',{
        symbol:item
      })
    }}
    >
      <ItemView>
        <TextMain>{item}</TextMain>
      </ItemView>
    </TouchableHighlight>
  )

}
export default function({ navigation }) {
  const wishlist = useSelector(state => state.wishlist);

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
        keyExtractor={item => item}
        ListEmptyComponent={<Text></Text>}
      />
    </CollapseBody>
</Collapse>
  )
}