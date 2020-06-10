import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, Text, View } from 'react-native';

import {CreateGeneralNews} from '../actions/news';

export default function NewsScreen() {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news);
  
  useEffect(() => {
    if(!news) {
      dispatch(CreateGeneralNews())
    }
    if(news && news.length === 0) {
      return;
    }
  });

  return (
    <>
      {news &&
        <View>
          <FlatList
            data={news}
            renderItem={({ item }) => <Text>{item.headline}</Text>}
          />
        </View>
      }
    </>
  );
}