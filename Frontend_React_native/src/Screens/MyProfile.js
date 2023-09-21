import React, { useState, useEffect } from "react";
import { TouchableHighlight, View, Image, ScrollView, Text } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import styles from "../Styles";

const MyProfile = () => {

    const currentUser = auth().currentUser
    const defaultUrl = "https://firebasestorage.googleapis.com/v0/b/varsfit.appspot.com/o/images.jpeg?alt=media&token=745ae4a8-60f3-4728-aef1-b99467281ff7"
    const [imageUrl, setImageUrl] = useState(defaultUrl)
    const [postsNo, setPostsNo] = useState(0)
    const [followersNo, setFollowersNo] = useState(0)

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

                    await uploadImageToIpfs(selectedImage.uri)
                    setImageUrl(downloadURL);
                    await saveDataToFirestore(downloadURL);

                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    const uploadImageToIpfs = async (Imageuri) => {

        const timeStamp = Date.now()
        const randomString = Math.random().toString(36).substring(7)

        const fileName = `image_${timeStamp}_${randomString}.jpg`
        try {
            const formData = new FormData()
            formData.append('file', {
                uri: Imageuri,
                type: "image/jpg",
                name: fileName
            })

            const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'pinata_api_key': 'a505e3a50bf7a498bef1',
                    'pinata_secret_api_key': '4c77af20022279f7b8a89f9601a88380e09a484a014f6636b88728813647defc'
                }
            })

            if (response.data && response.data.IpfsHash) {
                const ipfsImageUrl = `https://white-uniform-mastodon-684.mypinata.cloud/ipfs/${response.data.IpfsHash}`
                try {
                    const collectionRef = firestore().collection('training_program').doc('training_programs')

                    const nestedMap = {
                        [currentUser.uid]: {
                            IPFSimageUrl: ipfsImageUrl,
                            CID: response.data.IpfsHash
                        }
                    }

                    await collectionRef.set(nestedMap, { merge: true })
                } catch (err) {
                    console.log(err)
                }
            }

        } catch (err) {
            console.error(err)
            if (err.response) {
                console.error('Response Data:', err.response.data);
                console.error('Response Status:', err.response.status);
            }
        }
    }

    const saveDataToFirestore = async (downloadURL) => {
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
        <View style={[{ backgroundColor: '#3F4447' }, { flex: 1 }]}>
            <ScrollView style={styles.Profile.ScrollContainer}>
                <View style={styles.Profile.container}>
                    <TouchableHighlight onPress={selectImage}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.Profile.image}
                            resizeMode="contain"
                        />
                    </TouchableHighlight>
                </View>
                <View style={[styles.Profile.wrapper, { margin: 20 }]}>
                    <View style={styles.Profile.wrapper}>
                        <Text style={[styles.Profile.elementText, { fontSize: 20 }]}>POSTS:</Text>
                        <Text style={[styles.Profile.elementText, { fontSize: 20 }]}>{postsNo}</Text>
                    </View>
                    <View style={styles.Profile.wrapper}>
                        <Text style={[styles.Profile.elementText, { fontSize: 20 }]}>FOLLOWERS:</Text>
                        <Text style={[styles.Profile.elementText, { fontSize: 20 }]}>{followersNo}</Text>
                    </View>
                </View>
            </ScrollView >
        </View >
    )
}

export default MyProfile;