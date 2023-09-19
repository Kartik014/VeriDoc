import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Home from '../Screens/home';
import SignUp from '../Screens/SignUp';
import LogIn from '../Screens/LogIn';
import Forms from '../Screens/forms';
import MyProfile from '../Screens/MyProfile';
import DayDetails from '../Screens/DayDetails';
import styles from '../Styles';

const stack = createStackNavigator()
const Tab = createBottomTabNavigator()
let UserName = ""
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
    const [userName, setUserName] = useState('')
    const currentUser = auth().currentUser
    profileUrl = profileIconUrl
    UserName = userName || "Profile"

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

        const fetchProfile = async () => {
            try {
                const userInfoDoc = await firestore().collection("users").doc(currentUser.uid).get()
                const userInfoData = userInfoDoc.data()

                if (userInfoData && userInfoData.name) {
                    const username = userInfoData.name
                    setUserName(username)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchProfileImageUrl()
        fetchProfile()
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
        <Tab.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: '#4D5559' }
        }} tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'gray'
        }}>
            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: () => (
                    <Image source={require('../images/homeScreenIcon.png')} style={{
                        width: 25,
                        height: 25,
                        borderRadius: 20
                    }} />
                ),
                headerStyle: styles.Header.headerBackGround,
                headerTitleStyle: styles.Header.headerTitle
            }}
            />
            <Tab.Screen name={UserName} component={MyProfile} options={{
                tabBarIcon: ({ focused }) => (
                    <CustomTabBarIcon imageSource={profileUrl} focused={focused} />
                ),
                headerStyle: styles.Header.headerBackGround,
                headerTitleStyle: styles.Header.headerTitle,
                headerRight: () => (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => console.log("Button Pressed")}>
                            <Image source={require('../images/edit_img_vector.jpg')} style={{
                                width: 30,
                                height: 30,
                                borderRadius: 20,
                                marginRight: 30
                            }} />
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
        </Tab.Navigator>
    )
}

export default MainNavigator;