import React from 'react';
import { useDispatch } from 'react-redux'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";

const Title = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 15px;
`;
const TextMain = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
const TextSub = styled.Text`
  font-size: 15px;
  color: #636e72;
`;
const ItemRow = styled.View`
  flex-flow: row;
  align-items: center;
  margin-left: 15px;
  margin-bottom: 20px;
`;
export default function StockStatus({stockInfo}) {
  const dispatch = useDispatch();
  return (
    <View>
      <Title>Status</Title>
      <ItemRow>
        <Col>
            <TextMain>CURR</TextMain>
            <TextSub>{stockInfo.c}</TextSub>
        </Col>
        <Col>
          <TextMain>PREV</TextMain>
          <TextSub>{stockInfo.pc}</TextSub>
        </Col>
      </ItemRow>
      <ItemRow>
        <Col>
            <TextMain>OPEN</TextMain>
            <TextSub>{stockInfo.o}</TextSub>
        </Col>
        <Col>
          <TextMain>TG/MN</TextMain>
          <TextSub>{stockInfo.targetMean}</TextSub>
        </Col>
      </ItemRow>
      <ItemRow>
        <Col>
            <TextMain>HIGH</TextMain>
            <TextSub>{stockInfo.h}</TextSub>
        </Col>
        <Col>
          <TextMain>TG/HG</TextMain>
          <TextSub>{stockInfo.targetHigh}</TextSub>
        </Col>
      </ItemRow>
      <ItemRow>
        <Col>
            <TextMain>Low</TextMain>
            <TextSub>{stockInfo.l}</TextSub>
        </Col>
        <Col>
          <TextMain>TG/LW</TextMain>
          <TextSub>{stockInfo.targetLow}</TextSub>
        </Col>
      </ItemRow>
    </View>
  );
}