import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { Controller} from 'react-hook-form' ; 

const CustomInput = ({control, placeholder, rules={}, secureTextEntry}) => {
  return (
    <Controller
      control = {control}
      name = {placeholder}
      rules = {rules}
      render= {
        ({
          field: {value, onChange, onBlur},
          fieldState: {error}
        }) => (
        <>
          <View style={[styles.container, {borderColor:error?'red':'#e8e8e8'}]}>
            <TextInput 
              value ={value} 
              onChangeText = {onChange}
              onBlur = {onBlur}
              placeholder={placeholder}
              placeholderTextColor="lightgray"
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && 
            (<Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || "Error"}
            </Text>)
          }
        </>
        )
      }
    />      
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    fontSize: 16, 
    height: 50, 
    color: '#3A4552',
  },
});

export default CustomInput;
