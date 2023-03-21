import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Index } from '../screens/Index';
import { Savings } from '../screens/Savings';

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='index' component={Index} />
            <Screen name='savings' component={Savings} />
        </Navigator>
    )
}