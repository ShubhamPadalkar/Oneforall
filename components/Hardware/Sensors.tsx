import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect , useState } from 'react'
import {gyroscope,setUpdateIntervalForType, SensorTypes} from "react-native-sensors"

setUpdateIntervalForType(SensorTypes.gyroscope,500);

const Sensors = () => {
const [gyro,setGyro] = useState({x:'None',y:'None',z:'None'})
const gyro_subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
  setGyro({x:x.toString(),y:y.toString(),z:z.toString()})
)

useEffect(()=>{

    return()=>{
        gyro_subscription.unsubscribe()
    }
},[])


  return (
    <View>
      <Text style={styles.alltext}>Gyro sensors</Text>
      <Text style={styles.alltext}>Gyro-X = {gyro.x}</Text>
      <Text style={styles.alltext}>Gyro-Y = {gyro.y}</Text>
      <Text style={styles.alltext}>Gyro-Z = {gyro.z}</Text>
    </View>
  )
}

export default Sensors

const styles = StyleSheet.create({
    alltext:{
        fontSize:20,
        color:'black'
    }
})