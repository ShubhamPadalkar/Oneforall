import { StyleSheet, Text, ScrollView, Button, TouchableOpacity } from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <TouchableOpacity style={styles.btnstyle} onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.btntext}>Chat App</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnstyle} onPress={()=>navigation.navigate('Hardware')}>
        <Text style={styles.btntext}>Hardware</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnstyle} onPress={()=>navigation.navigate('Socket')}>
        <Text style={styles.btntext}>Socket App</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnstyle} onPress={()=>navigation.navigate('InterDash')}>
        <Text style={styles.btntext}>Localization</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnstyle} onPress={()=>navigation.navigate('CartDash')}>
        <Text style={styles.btntext}>Cart App</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    btnstyle:{
        width:'80%',
        height:50,
        backgroundColor:'cyan', 
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
        borderWidth:2
    },
    btntext:{
        color:'black',
        fontSize:24,
    }
})