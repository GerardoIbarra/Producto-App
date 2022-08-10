import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { Text, View, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { LoginImage } from '../components/LoginImage';
import { logintheme } from '../theme/logintheme';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any,any>{}


export const RegisterScreen = ({navigation}:Props) => {

  const {singUp}= useContext(AuthContext);

  const {email,password,onChange, name} = useForm({
    email:'',
    password:'',
    name:'',
});

const OnRegister = () => {
    console.log({email,password});
    Keyboard.dismiss();
    singUp({
      nombre:name,
      correo:email,
      password
    })
}

  return (
    <>
      <KeyboardAvoidingView
        style={{flex:1,backgroundColor:'#5856D6'}}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={logintheme.FormContainer}>
          <LoginImage />
          <Text style={logintheme.title}>Register</Text>
          <Text style={logintheme.LabelEmail}>Name</Text>
          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid={'white'}
            style={[
              logintheme.infutfield,
              Platform.OS == 'ios' && logintheme.inputFielIos,
            ]}
            selectionColor='white'
            onChangeText={ (value) => onChange(value, 'name') }
            value={name}
            onSubmitEditing={OnRegister}
            autoCorrect={false}
            autoCapitalize="words"
          />
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
            onSubmitEditing={OnRegister}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text style={logintheme.LabelEmail}>Password</Text>
          <TextInput
          secureTextEntry={true}
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid={'white'}
            style={[
              logintheme.infutfield,
              Platform.OS == 'ios' && logintheme.inputFielIos,
            ]}
            onChangeText={ (value) => onChange(value, 'password') }
            value={password}
            onSubmitEditing={OnRegister}
            selectionColor='white'
            autoCorrect={false}
            autoCapitalize="none"
          />
          
        </View>

        <View style={logintheme.containerbotton}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={logintheme.button}
              onPress={() => navigation.replace('LoginScreen')}
            >
            <Text style={logintheme.buttoText}>Ingresar</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
