import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const logintheme = StyleSheet.create({
    title:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        marginTop:20,
    },
    LabelEmail:{
        marginTop:25,
        color :'#fff',
        fontWeight:'bold',

    },
    infutfield:{
        color:"#fff",
        fontSize:20
    },
    inputFielIos:{
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        paddingBottom:6
    },
    containerbotton:{
        alignItems:'center',
        marginTop:50
    },
    button:{
        borderWidth:2,
        borderColor:'white',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:100,
    },
    buttoText:{
        fontSize:18,
        color:'white',
    },
    newUserContainer:{
        marginTop:50,
        alignItems:'flex-end',
    },
    FormContainer:{
        flex: 1,
        paddingHorizontal:30,
        justifyContent:'center',
        height: 600,
        marginBottom:50
    }
});