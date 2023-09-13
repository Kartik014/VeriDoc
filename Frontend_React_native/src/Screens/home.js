import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from "../Styles";

const Home = ({ navigation }) => {

    const currentUser = auth().currentUser
    const [dayNames, setDayNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDoc = await firestore().collection("training_program").doc("training_programs").get()
                const userData = userDoc.data()

                console.log(userData)

                const Data = userData[currentUser.uid]
                if (Data && Data.exercise) {
                    const dayNameArray = Object.keys(Data.exercise)
                    setDayNames(dayNameArray)
                }

            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.forms.scrollContainer}>
            <View style={styles.forms.formContainer}>
                <FlatList
                    data={dayNames}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[styles.forms.element, { justifyContent: 'center' }]} onPress={() => console.log("pressed ", { item })}>
                            <Text style={[styles.forms.elementText]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <TouchableOpacity
                        style={styles.forms.elementButton}
                        onPress={() => navigation.navigate('Forms')}>
                        <Text style={styles.forms.elementText}>ADD BUTTON</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}

export default Home;