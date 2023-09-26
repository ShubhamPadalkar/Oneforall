import { StyleSheet, Text, View, Alert, Button } from 'react-native'
import React,{useEffect,useState} from 'react'
import ws from './wsSocket'

const SocketEx = () => {
    const [received,setReceived] = useState('')

    useEffect(()=>{
        ws.onopen = () => {
            ws.send('')
            console.log("Connection opened")
        }

        ws.onmessage = (e) => {
            console.log('messages',e)
            setReceived(e.data)
        }

        ws.onerror = (e) => {
            Alert.alert(e.message)
        }

        ws.onclose = (e) => {
            console.log(e.code,e.message)
        }

    },[])



  return (
    <View>
      <Text style={styles.textcolor}>{received}</Text>

      <Button title='Send Hello' onPress={()=>ws.send('Hello')} />
    </View>
  )
}

export default SocketEx

const styles = StyleSheet.create({
    textcolor:{
        color:'black'
    }
})