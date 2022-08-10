import React, { useContext, useEffect } from 'react';
import {
  Alert,
    Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background} from '../components/Background';
import {LoginImage} from '../components/LoginImage';
import {logintheme} from '../theme/logintheme';
import { useForm } from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any,any>{}

export const LoginScreen = ({navigation} : Props) => {

    const {email,password,onChange} = useForm({
        email:'',
        password:'',
    });

    const {singIn,errorMensagge,removeError} = useContext( AuthContext);

      useEffect(() => {

        if(errorMensagge.length === 0) return;

        Alert.alert('login incorrecto', errorMensagge, [
          {
            text:'ok',
            onPress: removeError
          }
        ]);

      },[errorMensagge])

    const OnLogin = () => {
        console.log({email,password});
        Keyboard.dismiss();

        singIn({correo:email,password});
    }

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={logintheme.FormContainer}>
          <LoginImage />
          <Text style={logintheme.title}>Login</Text>
          <Text style={logintheme.LabelEmail}>Email</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid={'white'}
            style={[
              logintheme.infutfield,
              Platform.OS == 'ios' && logintheme.inputFielIos,
            ]}
            selectionColor='white'
            onChangeText={ (value) => onChange(value, 'email') }
            value={email}
            onSubmitEditing={OnLogin}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text style={logintheme.LabelEmail}>Password</Text>
          <TextInput
          secureTextEntry={true}
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid={'white'}
            style={[
              logintheme.infutfield,
              Platform.OS == 'ios' && logintheme.inputFielIos,
            ]}
            onChangeText={ (value) => onChange(value, 'password') }
            value={password}
            onSubmitEditing={OnLogin}
            selectionColor='white'
            autoCorrect={false}
            autoCapitalize="none"
          />
          <View style={logintheme.containerbotton}>
            <TouchableOpacity 
            activeOpacity={0.6} 
            style={logintheme.button} 
            onPress={OnLogin}
            >
            <Text style={logintheme.buttoText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={logintheme.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={logintheme.button}
              onPress={() => navigation.replace('RegisterScreen')}
            >
            <Text style={logintheme.buttoText}>Nueva Cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
