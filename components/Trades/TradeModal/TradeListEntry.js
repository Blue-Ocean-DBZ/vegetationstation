import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

const TradeListEntry = (props) => {

  var Select = async () => {
    await props.setImage(props.plant.plant_id)
  }

  return (
     <View >
        <TouchableOpacity activeOpacity={0.6} onPress={Select}>
          <Image
            style={{borderColor:'#283618', borderWidth: props.plant.plant_id === props.selectedImage ?  3: 0,
            width: 160,
            height:160,
            margin: 5,
            marginLeft: 3,
            marginRight: 3,
           }}
            source={{uri:props.plant.photo}}
          />
      </TouchableOpacity>
    </View>
  );
};

export default TradeListEntry;