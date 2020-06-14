import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";

const TouchableHighlight = styled.TouchableHighlight`
`;
const ItemRow = styled.View`
  flex-flow: row;
  align-items: center;
  margin-left: 15px;
  margin-right: 35px;
`;
const TextHead = styled.Text`
`;
const TextMain = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
const TextSub = styled.Text`
  font-size: 10px;
  color: #636e72;
`;
const Image = styled.Image`
  border-radius: 10px;
`
export default function NewsItem({ item } ) {
  let date = new Date(item.datetime * 1000);
  date = date.toString().slice(0,21);
  return (
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#EFF7F6">
      <ItemRow>
        <Col size={90}> 
          <Row>
            <TextHead>{item.related}</TextHead>
          </Row>
          <Row>
            <TextMain>{item.headline}</TextMain>
          </Row>
          <Row>
            <TextSub>{date}  </TextSub>
            <TextSub> {item.source}</TextSub>
          </Row>
        </Col>
        <Col size={10}>
          <Image source={{uri: item.image}}
            style={{width: 60, height: 60}} />
        </Col>
      </ItemRow>
    </TouchableHighlight>
  )
}
