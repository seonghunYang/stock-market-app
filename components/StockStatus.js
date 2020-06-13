import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

export default function StockStatus() {
  const dispatch = useDispatch();
  
  return (
    <View>
      <Title>Status</Title>
    </View>
  );
}