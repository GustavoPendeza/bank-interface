import { StatusBar } from "react-native";
import { Routes } from "./src/routes";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { View } from "react-native";

export default function App() {
    SystemNavigationBar.setNavigationColor('#1c1e2e', 'light', 'navigation');

    return (
        <View className="flex-1 bg-background">
            <Routes />
            <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
        </View>
    )
}