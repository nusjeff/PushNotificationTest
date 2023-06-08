import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    height: 60, 
    padding: 15,
    marginVertical: 20,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    // backgroundColor: '#FFD966',
    backgroundColor: '#3A93AF',
  },

  container_SECONDARY: {
    borderColor: 'royalblue',
    borderWidth: 20,
  },

  container_TERTIARY: {},

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: 'gray',
    color: 'white',
  },

  text_SECONDARY: {
    color: 'royalblue',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
