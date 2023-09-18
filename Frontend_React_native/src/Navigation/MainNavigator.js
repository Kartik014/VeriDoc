import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Home from '../Screens/home';
import SignUp from '../Screens/SignUp';
import LogIn from '../Screens/LogIn';
import Forms from '../Screens/forms';
import MyProfile from '../Screens/MyProfile';
import DayDetails from '../Screens/DayDetails';

const stack = createStackNavigator()
const Tab = createBottomTabNavigator()
let profileUrl = ""
const defaultUrl = "https://firebasestorage.googleapis.com/v0/b/varsfit.appspot.com/o/images.jpeg?alt=media&token=745ae4a8-60f3-4728-aef1-b99467281ff7"

const CustomTabBarIcon = ({ imageSource }) => (
    <Image
        source={{ uri: imageSource || defaultUrl }}
        style={{
            width: 25,
            height: 25,
            borderRadius: 20
        }}
    />
)

function MainNavigator() {

    const [profileIconUrl, setProfileIconUrl] = useState('')
    const currentUser = auth().currentUser
    profileUrl = profileIconUrl

    useEffect(() => {
        const fetchProfileImageUrl = async () => {
            try {
                const userDoc = await firestore().collection("training_program").doc("training_programs").get()
                const userData = userDoc.data()

                if (userData && userData[currentUser.uid].image) {
                    const userImage = userData[currentUser.uid].image
                    setProfileIconUrl(userImage)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchProfileImageUrl()
    }, [])

    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}>
                <stack.Screen name="Tabs" component={TabNavigator} />
                <stack.Screen name="LogIn" component={LogIn} />
                <stack.Screen name="SignUp" component={SignUp} />
                <stack.Screen name="Forms" component={Forms} />
                <stack.Screen name="DayDetails" component={DayDetails} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: () => (
                    <Image source={require('../images/homeScreenIcon.png')} style={{
                        width: 25,
                        height: 25,
                        borderRadius: 20
                    }} />
                )
            }}
            />
            <Tab.Screen name='MyProfile' component={MyProfile} options={{
                tabBarIcon: ({ focused }) => (
                    <CustomTabBarIcon imageSource={profileUrl} focused={focused} />
                ),
            }}
            />
        </Tab.Navigator>
    )
}

export default MainNavigator;