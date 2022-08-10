import { Usuario } from "../Interface/AppInterface";

export interface AuthState {
    errorMensagge: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
}

type AuthAction =
   | {type: 'singUp', payload:{ token:string, user: Usuario} }
   | {type: 'addError', payload: string}
   | {type: 'removeError' }
   | { type: 'notAuthenticated' }
   | {  type: 'logout'}


export const AuthReducer = (state:AuthState, action:AuthAction ): AuthState => {

    switch(action.type){

        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMensagge: action.payload
            }

        case 'removeError':
            return{
                ...state,
                errorMensagge: ''
            }

        case 'singUp':
            return{
                ...state,
                errorMensagge: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case 'logout':
        case 'notAuthenticated':
            return{
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }

        default:
            return state;

    }

}