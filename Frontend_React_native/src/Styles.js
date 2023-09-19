import { StyleSheet } from "react-native"
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: width - 30,
        borderRadius: 15,
        borderWidth: 2,
        marginVertical: 10,
        padding: 10,
        color: 'black'
    },
    addButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50
    },
    signup: {
        alignItems: 'center',
        marginTop: 20,
        fontSize: 20
    },
    forms: {
        scrollContainer: {
            flexGrow: 1,
            justifyContent: 'center'
        },
        formContainer: {
            flex: 1,
            padding: 20,
            backgroundColor: '#3F4447'
        },
        element: {
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#6C777D',
            elevation: 10,
            shadowColor: 'black',
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10
        },
        elementText: {
            margin: 5,
            color: 'white',
        },
        elementButton: {
            alignItems: 'center',
            padding: 10,
            borderRadius: 50,
            elevation: 10,
            shadowColor: 'black',
            backgroundColor: '#6C777D',
            width: 200
        }
    },
    Profile: {
        container: {
            flex: 1,
            alignItems: "center",
            backgroundColor: '#3F4447'
        },
        image: {
            width: 150,
            height: 150,
            borderRadius: 100,
            marginTop: 30
        },
        scrollContainer: {
            flexGrow: 1,
            justifyContent: 'center'
        },
        elementText: {
            margin: 5,
            color: 'white',
        },
        wrapper: {
            flex: 1,
            flexDirection: 'row'
        }
    },
    Header: {
        headerTitle: {
            fontFamily: 'DancingScript-VariableFont_wght',
            fontSize: 40,
            color: 'white',
        },
        headerBackGround: {
            backgroundColor: '#6C777D'
        }
    }
})

export default styles