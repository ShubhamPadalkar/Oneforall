import { StyleSheet, Text, View, Button } from 'react-native'
import React,{useState} from 'react'
import Voice,{SpeechResultsEvent} from '@react-native-voice/voice';

const Texttospeech = () => {

const [text,setText] = useState('')
const [isRecording,setRecording] = useState(false)

Voice.onSpeechStart = (e: any) => {
    setRecording(true)
    console.log('onSpeechStart: ', e);
  };

Voice.onSpeechEnd = (e: any) => {
    setRecording(false)
    console.log('onSpeechEnd: ', e);
  };

Voice.onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    setText(e.value);
  };


 const startspeech = async () => {
    try {
      await Voice.start('en-US');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
 }

 const stopspeech = async () => {
    try {
        await Voice.stop();
        console.log('called stop');
      } catch (e) {
        console.error(e);
      }
 }


 

  return (
    <View>
        <Text style={{color:'black'}}>{isRecording ? "Recording started" : "Recording stopped"}</Text>
        <Text style={{color:'green'}}>{text}</Text>
        <Button title='Start Speech to text' onPress={()=>startspeech()} />
        <Button title='Stop recording'  onPress={()=>stopspeech()} />

    </View>
  )
}

export default Texttospeech

const styles = StyleSheet.create({})