import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import styles from '../Styles';

const Forms = ({ navigation }) => {

    const currentUser = auth().currentUser
    const [exerciseNo, setExerciseNo] = useState('')
    const [day, setDay] = useState('')
    const [exerciseInput, setExerciseInput] = useState([''])
    const [repsInput, setRepsInput] = useState([''])
    const [diet, setDiet] = useState({ breakfast: '', lunch: '', dinner: '', snacks: '' })
    const [setsNo, setSetsNo] = useState('')
    const days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"]


    const saveDataToFirestore = async () => {
        try {
            const collectionRef = firestore().collection('training_program').doc('training_programs')

            const exercisesData = exerciseInput.map((exercise, index) => ({
                exercise: exercise,
                reps: repsInput[index] || ''
              })).reduce((acc, item, index) => {
                acc[`ex${index + 1}`] = item;
                return acc;
              }, {});

            const nestedMap = {
                [currentUser.uid]: {
                    exercise: {
                        [day]: {
                            Exercise: exercisesData,
                            Sets: setsNo,
                            Diet: diet
                        }
                    },
                    image:"https://firebasestorage.googleapis.com/v0/b/varsfit.appspot.com/o/images.jpeg?alt=media&token=745ae4a8-60f3-4728-aef1-b99467281ff7"
                }
            }

            await collectionRef.set(nestedMap, { merge: true })

            navigation.navigate('Tabs')

        } catch (err) {
            console.log(err)
        }
    }

    const generateExerciseInput = (exerciseNo) => {
        const inputs = []
        for (let i = 0; i < exerciseNo; i++) {
            inputs.push(
                <TextInput
                    key={i}
                    style={[styles.forms.elementText, { flex: 1 }]}
                    placeholder={`Exercise ${i + 1}`}
                    placeholderTextColor={'gray'}
                    value={exerciseInput[i] || ''}
                    onChangeText={value => handleChange(value, i)}
                />
            )
        }
        return inputs;
    }

    const generateRepsInput = (exerciseNo) => {
        const repInput = []
        for (let i = 0; i < exerciseNo; i++) {
            repInput.push(
                <View style={styles.forms.element}>
                    <Text style={styles.forms.elementText}>Reps for {exerciseInput[i]}: </Text>
                    <TextInput
                        key={i}
                        style={[styles.forms.elementText, { flex: 1 }]}
                        value={repsInput[i] || ''}
                        onChangeText={value => handleRepChange(value, i)}
                    />
                </View>
            )
        }
        return repInput;
    }

    const handleChange = (value, index) => {
        const updateInput = [ ...exerciseInput ]
        updateInput[index] = value
        setExerciseInput(updateInput)
    }

    const handleRepChange = (value, index) => {
        const updateInput = [ ...repsInput ]
        updateInput[index] = value
        setRepsInput(updateInput)
    }

    const handleDietChange = (key, value) => {
        setDiet(prevDiet => ({
            ...prevDiet,
            [key]: value,
        }))
    }

    const exerciseInputs = generateExerciseInput(exerciseNo)
    const repsInputs = generateRepsInput(exerciseNo)

    return (
        <ScrollView contentContainerStyle={styles.forms.scrollContainer}>
            <View style={styles.forms.formContainer}>
                <View style={styles.forms.element}>
                    <Text style={styles.forms.elementText}>SELECT DAY: </Text>
                    <SelectDropdown
                        data={days}
                        onSelect={(selectedItem) => {
                            setDay(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item) => {
                            return item;
                        }}
                    />
                </View>
                <View style={styles.forms.element}>
                    <Text style={styles.forms.elementText}>TOTAL NUMBER OF EXERCISE: </Text>
                    <TextInput
                        style={[{ color: 'black' }, { flex: 1 }]}
                        value={exerciseNo}
                        onChangeText={value => {
                            setExerciseNo(value)
                            setExerciseInput([])
                            setExerciseInput(Array.from({ length: parseInt(value, 10) }, () => ''))
                            setRepsInput(Array.from({ length: parseInt(value, 10) }, () => ''))
                        }}
                        keyboardType='numeric'
                    />
                </View>
                {exerciseInputs.map((input, index) => (
                    <View key={index} style={styles.forms.element}>
                        {input}
                    </View>
                ))}
                {repsInputs.map((input, index) => (
                    <View key={index}>
                        {input}
                    </View>
                ))}
                <View style={styles.forms.element}>
                    <Text style={styles.forms.elementText}>TOTAL NUMBER OF SETS: </Text>
                    <TextInput
                        style={[{ color: 'black' }, { flex: 1 }]}
                        value={setsNo}
                        onChangeText={value => setSetsNo(value)}
                        keyboardType='numeric'
                    />
                </View>
                <View style={[styles.forms.element, { flexDirection: 'column' }, { alignItems: 'stretch' }]}>
                    <Text style={styles.forms.elementText}>DIET PLAN</Text>
                    <View style={styles.forms.element}>
                        <Text style={styles.forms.elementText}>BREAKFAST: </Text>
                        <TextInput
                            style={[{ color: 'black' }, { flex: 1 }]}
                            value={diet.breakfast}
                            onChangeText={value => handleDietChange('breakfast', value)} />
                    </View>
                    <View style={styles.forms.element}>
                        <Text style={styles.forms.elementText}>LUNCH: </Text>
                        <TextInput
                            style={[{ color: 'black' }, { flex: 1 }]}
                            value={diet.lunch}
                            onChangeText={value => handleDietChange('lunch', value)} />
                    </View>
                    <View style={styles.forms.element}>
                        <Text style={styles.forms.elementText}>DINNER: </Text>
                        <TextInput
                            style={[{ color: 'black' }, { flex: 1 }]}
                            value={diet.dinner}
                            onChangeText={value => handleDietChange('dinner', value)} />
                    </View>
                    <View style={styles.forms.element}>
                        <Text style={styles.forms.elementText}>SNACKS: </Text>
                        <TextInput
                            style={[{ color: 'black' }, { flex: 1 }]}
                            value={diet.snacks}
                            onChangeText={value => handleDietChange('snacks', value)} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <TouchableOpacity style={styles.forms.elementButton}
                        onPress={saveDataToFirestore}>
                        <Text style={styles.forms.elementText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Forms;