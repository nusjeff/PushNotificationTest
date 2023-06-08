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
    height: 65, 
    padding: 15,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    // backgroundColor: '#3A4552',
     backgroundColor: '#3A93AF',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    // color: '#F5F5F5',
  },
});

export default CustomButton;
