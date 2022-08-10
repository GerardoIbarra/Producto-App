import React, { createContext, useReducer,useEffect } from "react";
import cafeApi from "../api/cafeapi";
import { Usuario, LoginResponse, LoginData, RegisterData } from '../Interface/AppInterface';
import { AuthReducer, AuthState } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps ={
    errorMensagge: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp: (registerdata: RegisterData) => void;
    singIn: (LoginData:LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState ={
    status: 'checking',
    token: null,
    user: null,
    errorMensagge: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) =>{

    const [state, dispatch ] = useReducer(AuthReducer,authInitialState);

    useEffect( () => {
        checkToken();
    },[])

    const checkToken = async() =>{
        const token = await AsyncStorage.getItem('token');

        if(!token) return dispatch({type:'notAuthenticated'});

        const {data} = await cafeApi.get('/auth');
        await AsyncStorage.setItem('token', data.token)
        dispatch({
            type:'singUp',
            payload:{
                token:data.token,
                user: data.usuario
            }
        })
    }

    const singIn = async({correo,password}:LoginData) => {

        try{
            const {data} = await cafeApi.post<LoginResponse>('/auth/login', {correo,password});
            dispatch({
                type:'singUp',
                payload:{
                    token:data.token,
                    user: data.usuario
                }
            })
            await AsyncStorage.setItem('token', data.token);
        }catch(error){
            dispatch({
                type: 'addError',
                payload: 'informacion incorrecta'
            })
        }

    };

    const singUp= async({correo,nombre,password}:RegisterData) => {

        try{
            const {data} = await cafeApi.post<LoginResponse>('/usuarios', {correo,password,nombre});
            dispatch({
                type:'singUp',
                payload:{
                    token:data.token,
                    user: data.usuario
                }
            })
            await AsyncStorage.setItem('token', data.token);
        }catch(error){
            dispatch({
                type: 'addError',
                payload: 'informacion incorrecta'
            })
        }

    };
    const logOut= async() => {

        await AsyncStorage.removeItem('token');
        dispatch({
            type:'logout'
        });

    };
    const removeError= () => {
        dispatch({ type:'removeError' });
    };

    return(
        <AuthContext.Provider value={{
            ...state,
            singIn,
            singUp,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}