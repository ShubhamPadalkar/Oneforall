import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatList = ({navigation}) => {
  const [userlist, setUserlist] = useState([]);


  useEffect(() => 
  {async function getAllusers(){
    let userid = await AsyncStorage.getItem('userid')
    firestore()
    .collection('users')
    .get()
    .then(res => {
      let userlist: Array<any> = []
      res.docs.forEach(item => {
        let userdata = item.data();
        userdata.id = item.ref.path.split('/')[1];
        if(userid !== userdata.id)
        {userlist.push(userdata)}
      });
      setUserlist(userlist);
    })
    .catch(error => {
      Alert.alert('Failed to get userlist');
    });
  }
  getAllusers()
  }
  , []);

  return (

    <FlatList
    data={userlist}
    renderItem={({item})=>{

        return(
            <TouchableOpacity 
            onPress={async ()=>{
                let userid = await AsyncStorage.getItem('userid')
                navigation.navigate('Chatpage',{selecteduser:item, userid:userid})
            }}
            style={styles.usernameblock}>
            <Text style={styles.titletext}>{item.name}</Text>
            </TouchableOpacity>
        )
    }}
    keyExtractor={(item)=>item.id}
    />

    
  );
};

export default ChatList;

const styles = StyleSheet.create({
  titletext: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
  },
  usernameblock: {
    borderWidth: 1,
    height: 60,
    width:'80%',
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10
  },
});
