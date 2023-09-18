import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from '../Styles';
import { ScrollView } from 'react-native-gesture-handler';

const DayDetails = ({ route }) => {

    const currentUser = auth().currentUser
    const [sets, setSets] = useState("")
    const [snacks, setSnacks] = useState([""])
    const [lunch, setLunch] = useState([""])
    const [breakfast, setBreakfast] = useState([""])
    const [dinner, setDinner] = useState([""])
    const [exercises, setExercises] = useState([""])
    let selectedDay = route.params

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDoc = await firestore().collection("training_program").doc("training_programs").get()
                const userData = userDoc.data()

                const data = userData[currentUser.uid]

                const detailsData = data.exercise[selectedDay]
                setSets(detailsData.Sets)
                setSnacks(detailsData.Diet.snacks)
                setBreakfast(detailsData.Diet.breakfast)
                setLunch(detailsData.Diet.lunch)
                setDinner(detailsData.Diet.dinner)
                setExercises(detailsData.Exercise)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    const displayData = (lable, value) => {
        return (
            <View style={styles.forms.element}>
                <Text style={styles.forms.elementText}>{lable}: {value}</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.forms.ScrollContainer}>
            <View style={styles.forms.formContainer}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.forms.element}>
                        <Text style={[styles.forms.elementText, { fontWeight: 'bold' }, { fontSize: 45 }]}>{selectedDay}</Text>
                    </View>
                </View>
                <View>
                    {Object.keys(exercises).map((exerciseKey) => (
                        <View key={exerciseKey}>
                            <View style={styles.forms.element}>
                                <Text style={styles.forms.elementText}>Exercise: {exercises[exerciseKey].exercise}</Text>
                            </View>
                            <View style={styles.forms.element}>
                                <Text style={styles.forms.elementText}>Reps: {exercises[exerciseKey].reps}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View>
                    {displayData("Sets", sets)}
                    {displayData("Snacks", snacks)}
                    {displayData("Breakfast", breakfast)}
                    {displayData("Lunch", lunch)}
                    {displayData("Dinner", dinner)}
                </View>
            </View>
        </ScrollView>
    )
}

export default DayDetails;