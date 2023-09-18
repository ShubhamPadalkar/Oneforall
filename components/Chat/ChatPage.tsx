import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatPage = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  let selecteduser = route.params.selecteduser;
  let userid = route.params.userid;
  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(userid + selecteduser.id)
      .collection('messages')
      .orderBy('createdAt','desc');

    subscriber.onSnapshot(querysnapshot => {
      const allmessages:Array<any> = querysnapshot.docs.map(item=>{
        return item.data()
      })
      setMessages(allmessages)
    })

    return () => subscriber
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg: any = messages[0];
    const myNewmsg = {
      ...msg,
      sendBy: userid,
      sendTo: selecteduser.id,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myNewmsg),
    );
    firestore()
      .collection('chats')
      .doc('' + userid + selecteduser.id)
      .collection('messages')
      .add(myNewmsg);
    firestore()
      .collection('chats')
      .doc('' + selecteduser.id + userid)
      .collection('messages')
      .add(myNewmsg);
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userid,
      }}
    />
  );
};

export default ChatPage;

const styles = StyleSheet.create({});
