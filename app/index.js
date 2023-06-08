import { Redirect } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';

export default function Page() {
  return <Redirect href="/login" />
};
