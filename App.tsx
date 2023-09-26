import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './components/Cartapp/Store';
import HomeScreen from './components/Homescreen/HomeScreen';
import Registerpage from './components/Register-Login/Registerpage';
import Loginpage from './components/Register-Login/Loginpage';
import ChatList from './components/Chat/ChatList';
import ChatPage from './components/Chat/ChatPage';
import AllHardbtns from './components/Hardware/AllHardbtns';
import SocketEx from './components/Socket/SocketEx';
import InterDash from './components/Localize/InterDash';
import CartDash from './components/Cartapp/CartDash';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={Registerpage} />
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="Chatlist" component={ChatList} />
        <Stack.Screen name="Chatpage" component={ChatPage} />
        {/*  */}
        <Stack.Screen name="Hardware" component={AllHardbtns} />
        {/*  */}
        <Stack.Screen name="Socketex" component={SocketEx} />
        {/*  */}
        <Stack.Screen name="InterDash" component={InterDash} />
         {/*  */}
         <Stack.Screen name="CartDash" component={CartDash} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;
