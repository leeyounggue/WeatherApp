import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import { Ionicons, Fontisto } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
    const [city, setCity] = useState("Loadiong...");
    const [days, setDays] = useState([]);
    const [ok, setOk] = useState(true);

    const getWeather = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk((current) => !current);
        }
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
        const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
        const API_KEY = "test";

        setCity(location[0].city);

        //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        // const json = await response.json();

    };

    const icons = {
        "Clean": "day-sunny",
        "Clear": "cloudy",
        "Hot": "cloudy",
        "Cool": "cloudy",
        "Cold": "cloudy",
    }

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weather}
            >
                <View style={{ ...styles.day, paddingLeft: 50 }} >
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignContent: "flex-end", width: "100%"}}>
                        <Text style={styles.temp}>27</Text>
                        <Fontisto name={icons.Clean} size={40} color="white" />
                    </View>

                    <Text style={styles.description}>Clean</Text>
                    <Text style={styles.subDesc}>Very Very Super Cool</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>30</Text>
                    <Text style={styles.description}>Hot</Text>
                    <Text style={styles.subDesc}>Oh My Gods Temporary</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Rain</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>21</Text>
                    <Text style={styles.description}>Clear</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>19</Text>
                    <Text style={styles.description}>Cold</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>{parseFloat(17.2828).toFixed(1)}</Text>
                    <Text style={styles.description}>Cool</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>31</Text>
                    <Text style={styles.description}>Hot</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "tomato"
    },
    city: {
        flex: 1.2,
        justifyContent: "center",
        alignItems: "center"
    },
    cityName: {
        fontSize: 38,
        fontWeight: "500"
    },
    weather: {},
    day: {
        width: SCREEN_WIDTH,
        alignItems: "flex-start",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    temp: {
        color: "white",
        marginTop: 20,
        fontSize: 120
    },
    description: {
        color: "white",
        marginTop: -30,
        fontSize: 40
    },
    subDesc: {
        color: "white",
        fontSize: 15,
        alignItems: "center"
    }

});