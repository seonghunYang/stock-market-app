import React, {useEffect} from 'react';
import styled from 'styled-components/native'
import { AreaChart} from 'react-native-svg-charts'

const TouchableHighlight = styled.TouchableHighlight`
`;
const ItemRow = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;
  `;
const TextHead = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;
const TextMain = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
const TextSub = styled.Text`
  font-size: 10px;
  color: #636e72;
`;
const ChartView = styled.View`
  height: 30;
  flex-direction: row;
`;

export default function MainCard({ data } ) {
  const contentInset = { top: 10, bottom: 10 }
  return (
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#EFF7F6"
    >
      <ItemRow>
        <ChartView>
          <AreaChart
            style={{ flex: 1}}
            data={data.c}
            svg={{ fill: 'rgba(116, 185, 255, 0.6)' }}
            contentInset={contentInset}
            showGrid={false}
          ></AreaChart>
        </ChartView>
        <TextMain>{data.symbol}</TextMain>
        <TextHead>{data.c[data.c.length -1]}</TextHead>
      </ItemRow>
    </TouchableHighlight>
  )
}
