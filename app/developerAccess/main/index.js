import React, {useState,useEffect} from 'react';
import { useRouter, Link, Redirect } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Dimensions, Alert } from 'react-native';
import IconButton from './IconButton';
import { auth,db } from '../../../firebase' ; 
import { doc,setDoc,addDoc,getDoc,collection,onSnapshot,query,orderBy,serverTimestamp} from 'firebase/firestore';

const data = [
  { buttonPage: 'AddDeveloper', buttonTitle: 'Add A Developer', buttonIconName: "add-user" , buttonIconCat: "Entypo"},
  { buttonPage: 'AddSender', buttonTitle: 'Add A Sender', buttonIconName: "person-add-alt" , buttonIconCat: "MaterialIcons"},
  { buttonPage: 'AddReceiver', buttonTitle: 'Add A Receiver', buttonIconName: "person-add-alt" , buttonIconCat: "MaterialIcons"},
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ buttonTitle: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2 ;

const renderItem = ({ item, index, navigation }) => {
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  return (
    <View style={styles.item}>
      <IconButton 
          type = 'SECONDARY'
          text={item.buttonTitle}
          onPress={() => navigation.push(`developerAccess/${item.buttonPage}`)} 
          fgColor = '#3A93AF'
          iconName = {item.buttonIconName} 
          iconCategory = {item.buttonIconCat}
      />  
    </View>
  );
};

const main = () => {
  const navigation = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {});
    return unsubscribe;
  }, []);  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <FlatList
        data= {formatData(data, numColumns)}
        style={styles.container}
        renderItem={(itemProps) => renderItem({ ...itemProps, navigation })}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingTop: 30, 
    paddingBottom: 100, 
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    backgroundColor : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 70,
    padding: 10,
    height: Dimensions.get('window').width / (1.5*numColumns), 
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#3A4552',
  },
});

export default main;
