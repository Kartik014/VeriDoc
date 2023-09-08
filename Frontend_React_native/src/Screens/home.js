import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Home = ({navigation}) =>{
    return (
        <View>
            <Text>HOME SCREEN</Text>
            <TouchableOpacity
            onPress={()=>navigation.navigate('Forms')}>
                <Text>ADD BUTTON</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;