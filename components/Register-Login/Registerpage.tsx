import {useReducer} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

interface IntialStateProps {
  name: string;
  email: string;
  mobnum: string;
  password: string;
}

const initialState: IntialStateProps = {
  name: '',
  email: '',
  mobnum: '',
  password: '',
};

const reducer = (state: any, action: {type: string; payload: string}) => {
  switch (action.type) {
    case 'name':
      return {...state, name: action.payload};
    case 'email':
      return {...state, email: action.payload};
    case 'mobnum':
      return {...state, mobnum: action.payload};
    case 'password':
      return {...state, password: action.payload};
    default:
      break;
  }
};

const validate = (requestData: IntialStateProps) => {
  for (let data in requestData) {
    if (requestData[data] === '') {
      return false;
    }
  }
  return true;
};

const Registerpage = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerUser = (requestObject: IntialStateProps) => {
    let userid = uuid.v4().toString();
    firestore()
      .collection('users')
      .doc(userid)
      .set(requestObject)
      .then(res => 
        {
          Alert.alert('Success',"user registered")
          navigation.navigate('Login')
        })
      .catch(error => Alert.alert('Failed',"user not registered"));
  };

  return (
    <View>
      <Text style={styles.titletext}>Registerpage</Text>

      <Text style={styles.titletext}>Name</Text>
      <TextInput
        style={styles.inputstyle}
        onChangeText={(text: string) => dispatch({type: 'name', payload: text})}
        value={state.name}
      />
      <Text style={styles.titletext}>Email</Text>
      <TextInput
        style={styles.inputstyle}
        onChangeText={(text: string) =>
          dispatch({type: 'email', payload: text})
        }
        value={state.email}
      />
      <Text style={styles.titletext}>Mob num</Text>
      <TextInput
        style={styles.inputstyle}
        onChangeText={(text: string) =>
          dispatch({type: 'mobnum', payload: text})
        }
        value={state.mobnum}
      />
      <Text style={styles.titletext}>Password</Text>
      <TextInput
        style={styles.inputstyle}
        onChangeText={(text: string) =>
          dispatch({type: 'password', payload: text})
        }
        value={state.password}
      />
      <View
        style={{
          height: 200,
          justifyContent: 'space-around',
          width: 200,
          alignSelf: 'center',
        }}>
        <Button
          title="Register User"
          onPress={() => {
            let isValid = validate(state);
            if (isValid) {
              registerUser(state);
            } else {
              Alert.alert('Please fill all data');
            }
          }}
        />
        <Button title="Login" onPress={()=> navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default Registerpage;

const styles = StyleSheet.create({
  titletext: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
  },
  inputstyle: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    color: '#000',
  },
});
