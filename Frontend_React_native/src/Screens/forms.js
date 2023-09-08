import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../Styles';

const Forms = () => {

    const [exerciseNo, setExerciseNo] = useState('')
    const [day, setDay] = useState('')
    const [exerciseInput, setExerciseInput] = useState([])
    const [setsNo, setSetsNo] = useState('')
    const days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"]

    const generateExerciseInput = (exerciseNo) => {
        const inputs = []
        for (let i = 0; i < exerciseNo; i++) {
            inputs.push(
                <TextInput
                    key={i}
                    style={styles1.elementText}
                    placeholder={`Exercise ${i + 1}`}
                    placeholderTextColor={'gray'}
                    value={exerciseInput[i] || ''}
                    onChangeText={value => handleChange(value, i)} />
            )
        }
        return inputs;
    }

    const handleChange = (value, index) => {
        const updateInput = { ...exerciseInput }
        updateInput[index] = value
        setExerciseInput(updateInput)
    }

    // const consoleIt = () => {
    //     for(let i=0; i<exerciseNo; i++ ){
    //         console.log(`${exerciseInput[i]}`)
    //     }
    // }

    const exerciseInputs = generateExerciseInput(exerciseNo)

    return (
        <View style={styles1.formContainer}>
            <View style={styles1.element}>
                <Text style={styles1.elementText}>SELECT DAY: </Text>
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
            <View style={styles1.element}>
                <Text style={styles1.elementText}>TOTAL NUMBER OF EXERCISE: </Text>
                <TextInput
                    style={{ color: 'black' }}
                    placeholder='TEXT'
                    value={exerciseNo}
                    onChangeText={value => {
                        setExerciseNo(value)
                        setExerciseInput(Array.from({ length: parseInt(value, 10) }, () => ''))
                    }}
                    keyboardType='numeric'
                />
            </View>
            {exerciseInputs.map((input, index) => (
                <View key={index} style={styles1.element}>
                    {input}
                </View>
            ))}
            {/* <View>
                <TouchableOpacity
                style= {styles.signup}
                onPress={()=>consoleIt()}>
                    <Text>consoleIt</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles1.element}>
                <Text style={styles1.elementText}>TOTAL NUMBER OF SETS: </Text>
                <TextInput
                    style={{ color: 'black' }}
                    placeholder='TEXT'
                    value={setsNo}
                    onChangeText={value => setSetsNo(value)}
                    keyboardType='numeric'
                />
            </View>
        </View>
    );
};

const styles1 = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 20,
    },
    element: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: 'black',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    elementText: {
        margin: 5,
        color: 'black',
    }
})

export default Forms;