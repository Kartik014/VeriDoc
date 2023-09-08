import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../Styles';

const Forms = ({ navigation }) => {

    const [exerciseNo, setExerciseNo] = useState('')
    const [day, setDay] = useState('')
    const [exerciseInput, setExerciseInput] = useState([])
    const [diet, setDiet] = useState({ breakfast: '', lunch: '', dinner: '', snacks: '' })
    const [setsNo, setSetsNo] = useState('')
    const days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"]

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

    const handleDietChange = (key, value) => {
        setDiet(prevDiet => ({
            ...prevDiet,
            [key]: value,
        }))
    }

    const exerciseInputs = generateExerciseInput(exerciseNo)

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
                    <View key={index} style={styles.forms.element}>
                        {input}
                    </View>
                ))}
                <View style={styles.forms.element}>
                    <Text style={styles.forms.elementText}>TOTAL NUMBER OF SETS: </Text>
                    <TextInput
                        style={{ color: 'black' }}
                        placeholder='TEXT'
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
                        onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.forms.elementText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Forms;