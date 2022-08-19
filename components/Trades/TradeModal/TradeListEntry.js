import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import plantData from '../exampleData/Dummy.js'

const TradeListEntry = (props) => {
  var Select = async () => {
    await props.setImage(props.plant.plant_id)
  }

  return (
     <View >
        <TouchableOpacity activeOpacity={0.6} onPress={Select}>
          <Image
            style={{borderColor:'#283618', borderWidth: props.plant.plant_id === props.selectedImage ?  3: 0,//change id to trade id plant. plant id
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

const styles = StyleSheet.create({

});

export default TradeListEntry;