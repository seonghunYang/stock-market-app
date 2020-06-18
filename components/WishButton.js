import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import {addWishlist, deleteWishlist} from '../actions/index';

export default function Wishlist({ symbol } ) {
  const wishlist = useSelector(state => state.wishlist);

  const dispatch = useDispatch();
  const checkWishlist= () => {
    let checkWish = false;
    wishlist.forEach((item) => {
      if(item.symbol === symbol) {
        checkWish = true;
      }
    })
    return checkWish
  }
  const [isWishlist, setIsWishlist] = React.useState(() => {
    return checkWishlist();
  });

  return (
    <View>
      {isWishlist? 
      <FontAwesome.Button
        name="star"
        size={24}
        color="#ffeb3b"
        backgroundColor="#fff"
        onPress={() =>{
          setIsWishlist(false);
          dispatch(deleteWishlist(symbol))
        }}
        /> 
      : <FontAwesome.Button 
          name="star-o"
          size={24} 
          color="black"
          backgroundColor="#fff"
          onPress={() => {
            setIsWishlist(true);
            dispatch(addWishlist(symbol))  
          }}
          />}
    </View>
  )
}
