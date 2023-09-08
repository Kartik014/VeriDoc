import React, { useState } from "react";
import { TouchableOpacity, View ,Text, TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import styles from "../Styles";

const SignUp = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userRegister = async () => {
        try {
            const userRegistration = await auth().createUserWithEmailAndPassword(
                email,
                password
            )

            await firestore().collection('users').doc(userRegistration.user.uid).set({
                name: name,
                email: email,
                uid: userRegistration.user.uid
            })

            navigation.navigate('Home', {
                email: userRegistration.user.email,
                uid: userRegistration.user.uid
            })

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View>
            <TextInput
                style={styles.inputBox}
                placeholder="Enter your name"
                value={name}
                onChangeText={value => setName(value)}
            />
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
                onPress={() => userRegister()}>
                <Text>SIGN UP</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp;