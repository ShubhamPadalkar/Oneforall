import { StyleSheet, Text, View, Button} from 'react-native'
import React,{useState} from 'react'
import Translated,{changeLanguage} from './Localised'

const InterDash = () => {
    const [state,setState] = useState('')
  return (
    <View>
      <Text style={styles.textColor}>{Translated.greeting}</Text>
      <Button title={'fr'} onPress={()=>{
        changeLanguage('fr')
        setState(Date.now)
        }} />
         <Button title={'en'} onPress={()=>{
        changeLanguage('en')
        setState(Date.now)
        }} />
    </View>
  )
}

export default InterDash

const styles = StyleSheet.create({
    textColor:{
        color:'black',
        fontSize:30
    }
})