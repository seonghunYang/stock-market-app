import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import styled from 'styled-components/native'

import NewsItem from "../components/NewsItem";
import {CreateGeneralNews} from '../actions/news';

const FlatList = styled.FlatList`
  width :100% ;
`;
const ActivityIndicator = styled.ActivityIndicator`
`;

export default function NewsScreen() {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news);

  useEffect(() => {
    if(news.length === 0) {
      dispatch(CreateGeneralNews())
    }
    if(news) {
      return;
    }
  });

  return (
    <>
      {news &&
        <View>
          <FlatList
            data={news}
            renderItem={({ item }) => <NewsItem item={item} />}
            keyExtractor={item => item.id}
            ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
          />
        </View>
      }
    </>
  );
}