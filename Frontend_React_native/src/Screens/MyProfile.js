import React, { useState, useEffect } from "react";
import { TouchableHighlight, View, Image, StyleSheet } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import styles from "../Styles";

const MyProfile = () => {

    const currentUser = auth().currentUser
    const defaultUrl = "https://firebasestorage.googleapis.com/v0/b/varsfit.appspot.com/o/images.jpeg?alt=media&token=745ae4a8-60f3-4728-aef1-b99467281ff7"
    const [imageUrl, setImageUrl] = useState(defaultUrl)

    useEffect(() => {
        const fetchProfileImageUrl = async () => {
            try {
                const userDoc = await firestore().collection("training_program").doc("training_programs").get()
                const userData = userDoc.data()

                if (userData && userData[currentUser.uid].image) {
                    const userImage = userData[currentUser.uid].image
                    setImageUrl(userImage)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchProfileImageUrl()
    }, [])

    const selectImage = () => {

        const options = {
            storageOptions: {
                skipBackup: true,
                path: "images",
            }
        }

        ImagePicker.launchImageLibrary(options, async (response) => {
            if (response.didCancel) {

                console.log("User cancelled");

            } else if (response.error) {

                console.log(response.error);

            } else if (response.assets && response.assets.length > 0) {

                const selectedImage = response.assets[0];
                const fileName = `${Date.now()}.${selectedImage.type.split('/')[1]}`;
                const storageRef = storage().ref(`${fileName}`);

                try {
                    await storageRef.putFile(selectedImage.uri);
                    const downloadURL = await storageRef.getDownloadURL();

                    setImageUrl(downloadURL);
                    await saveDataToFirestore(downloadURL);

                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    const saveDataToFirestore = async (downloadURL) => {
        console.log("URL:", downloadURL)
        try {
            const collectionRef = firestore().collection('training_program').doc('training_programs')

            const nestedMap = {
                [currentUser.uid]: {
                    image: downloadURL
                }
            }

            await collectionRef.set(nestedMap, { merge: true })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.Profile.container}>
            <TouchableHighlight onPress={selectImage}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.Profile.image}
                    resizeMode="contain"
                />
            </TouchableHighlight>
        </View>
    )
}

export default MyProfile;