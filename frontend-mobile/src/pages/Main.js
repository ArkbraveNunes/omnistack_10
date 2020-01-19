import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import  MapView, { Marker, Callout }  from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

function Main( { navigation } ) {
    // alert('dwsmdoawmdai')
    const [ currentRegion, setCurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            // alert(granted)
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;
                // alert(coords)
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            }

        }    
    loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    // alert(JSON.stringify(currentRegion))
    return (
        <>
            <MapView initialRegion = { currentRegion } style = { styles.map }>
                <Marker coordinate= {{ latitude: -28.2878125, longitude: -52.4335982 }}>
                    <Image  style = { styles.avatar } source = {{ uri: 'https://avatars1.githubusercontent.com/u/2254731?s=400&v=4' }}/>
                    <Callout onPress = {() => {
                        navigation.navigate('Perfil do Github', { github_username: 'diego3g' })
                    } }>
                        <View style = { styles.callout }>
                            <Text styles = { styles.devName } >Diego Fernandes</Text>
                            <Text styles = { styles.devBio } >CTO na @Rocketseat. Apaixonado pelas melhores tecnologias de desenvolvimento web e mobile.</Text>
                            <Text styles = { styles.devTechs } >ReactJS, React Native, NodeJS</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style = {styles.searchForm}>
                <TextInput style = { styles.searchInput } placeholder ="Buscar devs por tecnologias..." placeholderTextColor = '#999' autoCapitalize = 'words' autoCorrect = {false}/>
                <TouchableOpacity onPress = {() => {}} style = { styles.loadButton }>
                    <MaterialIcons name = 'my-location' size = { 20 } colort = "#FFF"></MaterialIcons>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 300,
        alignItems:"center"
    },
    devName: {
        fontWeight: "normal",
        fontSize: 12,
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm : {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height:4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#8E4DFF",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,        
    }
})


export default Main;