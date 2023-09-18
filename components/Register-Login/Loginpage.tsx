import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Loginpage = ({navigation}) => {
  const [userdata, setUser] = useState({email: 'johnwick@mail.com', password: 'test123'});


  useEffect(()=>{
    async function checkLogin(){
      let userid = await AsyncStorage.getItem('userid')
      let userdata = await AsyncStorage.getItem('userinfo')
      if(userid && userdata)
      {return navigation.navigate('Chatlist')}
      return null
    }

    checkLogin()
  },[])

  const loginUser = async (usercreds: {email: string; password: string}) => {
    await firestore()
      .collection('users')
      .where('email', '==', usercreds.email)
      .get()
      .then(async (res) => {
        let userid = res.docs[0].ref.path.split('/')[1]
        let userinfo = res.docs[0].data()
        await AsyncStorage.setItem('userid',userid)
        await AsyncStorage.setItem('userinfo',JSON.stringify(userinfo))
        navigation.navigate('Chatlist')
      })
      .catch(err => Alert.alert('Login failed','user not found!'));
  };

  return (
    <View>
      <Text>Loginpage</Text>
      <Text style={styles.titletext}>Email</Text>
      <TextInput
        style={styles.inputstyle}
        onChangeText={(text: string) => setUser({...userdata, email: text})}
        value={userdata.email}
      />
      <Text style={styles.titletext}>Password</Text>
      <TextInput
        style={styles.inputstyle}
        onChangeText={(text: string) => setUser({...userdata, password: text})}
        value={userdata.password}
      />
      <View
        style={{
          height: 200,
          justifyContent: 'space-around',
          width: 200,
          alignSelf: 'center',
        }}>
        <Button title="Login" onPress={()=>loginUser(userdata)} />
      </View>
    </View>
  );
};

export default Loginpage;

const styles = StyleSheet.create({
  titletext: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
  },
  inputstyle: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    color: '#000',
  },
});
