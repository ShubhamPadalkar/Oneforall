import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Homescreen/HomeScreen';
import Registerpage from './components/Register-Login/Registerpage';
import Loginpage from './components/Register-Login/Loginpage';
import ChatList from './components/Chat/ChatList';
import ChatPage from './components/Chat/ChatPage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={Registerpage} />
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="Chatlist" component={ChatList} />
        <Stack.Screen name="Chatpage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
