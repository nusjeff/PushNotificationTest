import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomToggleSwitch = ({ name, control, rules = {} }) => {
  return (
    <Controller
      defaultValue={false}
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <Switch
            value={value}
            onValueChange={onChange}
            trackColor={{ true: '#007aff', false: '#ccc' }}
            thumbColor={value ? '#fff' : '#f4f3f4'}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], width: 44, height: 22 }}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomToggleSwitch;
