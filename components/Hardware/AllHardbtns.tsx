import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sensors from './Sensors'
import Texttospeech from './Texttospeech'

const AllHardbtns = () => {
  return (
    <View>
      <Sensors/>
      <Texttospeech/>
    </View>
  )
}

export default AllHardbtns

const styles = StyleSheet.create({})