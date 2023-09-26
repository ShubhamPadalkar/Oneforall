import { StyleSheet, Text, View, FlatList,Image, Button } from 'react-native'
import React,{useEffect} from 'react'
import { getProducts } from './CartReducer'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct, removeProduct } from './CartReducer'
const _ = require('lodash')


const CartDash = () => {
  const dispatch = useDispatch()
  const {products,loading,errorText,selectedProducts} = useSelector(state=>state.Cart)

  useEffect(()=>{
    dispatch(getProducts())
  },[])

  let totalPrice = _.reduce(selectedProducts,(sum,item)=>{
    return sum + item.price 
  },0)
  
  
  return (
    <View>
      <View style={styles.cartblock}>
        <Text style={styles.listTitle}>Product List</Text>
        <FlatList
          data={selectedProducts}
          renderItem={({item})=>{return(
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
            <Text style={{width:'50%',color:'#FFF'}}>{item.title}</Text>
            <Text style={{color:'#FFF'}}>{item.price} $</Text>
            </View>
          )}}
          keyExtractor={(item)=>item.id}
        />

        <Text style={styles.listTitle}>Total Amount -   {totalPrice} $</Text>
      </View>

      {products.length > 0 ?
     <FlatList
     data={products}
     renderItem={({item})=><CartItem ItemData={item} existingItem={selectedProducts}/>}
     keyExtractor={(item)=>item.id}
     /> : <Text style={styles.textstyle}>No data found</Text>  
    }
     
    </View>
  )
}

const CartItem = ({ItemData,existingItem}) => {
  const dispatch = useDispatch()

  const isSelected = checkExisting(ItemData,existingItem)

  return(
  <View style={styles.productblock}>
    <Image source={{uri:ItemData.image}} style={styles.imagestyle} />
    <Text style={styles.textstyle}>{ItemData.title}</Text>
    {isSelected ?
     <Button title="Remove from cart" onPress={()=>dispatch(removeProduct(ItemData.id))} />
    : <Button title="Add to Cart" onPress={()=>dispatch(selectProduct(ItemData))} />}
  </View>)
}


const checkExisting = (newitem,existingdata) => {
  let checkResult = _.some(existingdata,['id',newitem.id])
  return checkResult
}

export default CartDash

const styles = StyleSheet.create({
  cartblock:{
    minHeight:100,
    backgroundColor:'orange'
  },
  productblock:{
    borderWidth:1,
    marginVertical:20
  },
  textstyle:{
    color:'black',
    fontSize:16
  },
  imagestyle:{
    width:100,
    height:100,
    resizeMode:'contain'
  },
  listTitle:{
    color:'white', 
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:'grey'
  }
})