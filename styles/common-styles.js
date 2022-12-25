import { Platform, StatusBar, StyleSheet } from "react-native";

export const androidSafeArea = {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
}