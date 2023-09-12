import { StyleSheet } from "react-native"
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    UserMain: {
        flex: 1,
        flexDirection: 'row',
        flexDirection: 'row-reverse',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 20
    },
    wrapper: {
        flex: 1,
        margin: 10,
        alignItems: 'flex-start',
        padding: 15
    },
    image: {
        height: 75,
        width: 75,
        borderRadius: 80,
        margin: 10
    },
    text: {
        fontSize: 17,
        color: 'black'
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 30,
        elevation: 5
    },
    modalText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: 'black'
    },
    modalImage: {
        height: 100,
        width: 100,
        alignContent: 'center',
        marginBottom: 20
    },
    modalCloseButton: {
        alignSelf: "flex-end",
        marginTop: 10,
        paddingVertical: 5
    },
    modalCloseButtonText: {
        color: "blue",
        fontSize: 16,
        fontWeight: "bold"
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
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
            justifyContent: 'center',
        },
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
        },
        elementButton: {
            alignItems: 'center',
            padding: 10,
            borderRadius: 50,
            elevation: 10,
            shadowColor: 'black',
            backgroundColor: '#FAF9F6',
            width: 200
        }
    },
    Profile:{
        container: {
            flex: 1,
            alignItems: "center",
        },
        image: {
            width: 150,
            height: 150,
            borderRadius: 100,
            marginTop: 30
        }
    }
})

export default styles