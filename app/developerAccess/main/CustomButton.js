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
    height: 70, 
    padding: 15,
    marginVertical: 20,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3A4552',
  },

  container_SECONDARY: {
    borderColor: '#3A4552',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },

  text_SECONDARY: {
    color: '#02B0D1',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
