import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../Styles";

const LogIn = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        const checkAuthentication= async ()=>{
            const user = auth().currentUser
            if(user){
                navigation.navigate('Home',{
                    email: user.email,
                    uid: user.uid
                })
            }
        }

        checkAuthentication()
    },[navigation])

    const handleLogIn = async () => {
        try {
            const isUserLogIn = await auth().signInWithEmailAndPassword(
                email,
                password
            );

            navigation.navigate('Home', {
                email: isUserLogIn.user.email,
                uid: isUserLogIn.user.uid
            })

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                placeholder="Enter your email"
                value={email}
                onChangeText={value => setEmail(value)}
            />
            <TextInput
                style={styles.inputBox}
                placeholder="Password"
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleLogIn()}>
                <Text>LOG IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signup}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color:'black'}}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LogIn;