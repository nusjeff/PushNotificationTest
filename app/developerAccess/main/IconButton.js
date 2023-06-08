import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

const IconButton = ({onPress, text, iconName, iconCategory, type = 'PRIMARY', bgColor, fgColor}) => {
  let IconComponent;
  switch (iconCategory) {
    case 'AntDesign':
      IconComponent = AntDesign;
      break;
    case 'Entypo':
      IconComponent = Entypo;
      break;
    case 'Feather':
      IconComponent = Feather;
      break;
    case 'FontAwesome':
      IconComponent = FontAwesome;
      break;
    case 'FontAwesome5':
      IconComponent = FontAwesome5;
      break;
    case 'Fontisto':
      IconComponent = Fontisto;
      break;
    case 'Foundation':
      IconComponent = Foundation;
      break;
    case 'Ionicons':
      IconComponent = Ionicons;
      break;
    case 'MaterialCommunityIcons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    case 'Octicons':
      IconComponent = Octicons;
      break;
    case 'SimpleLineIcons':
      IconComponent = SimpleLineIcons;
      break;
    case 'Zocial':
      IconComponent = Zocial;
      break;
  };
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <View>
          <IconComponent name={iconName} size={40} color={fgColor} />
      </View>
      <Text style={[styles[`text_${type}`],fgColor ? {color: fgColor} : {},]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    width: 170,
    height: 250, 
    alignItems: 'center',
    borderRadius: 5,
  },
  container_SECONDARY: {
    borderColor: 'lightgray',
    borderWidth: 1,     
  },
  text_SECONDARY: {
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
    // fontWeight: 'bold',    
    color: '#3A93AF',
  },

});

export default IconButton;
