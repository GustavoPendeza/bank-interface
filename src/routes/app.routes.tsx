import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateGoal } from '../screens/CreateGoal';
import { Index } from '../screens/Index';
import { PayBill } from '../screens/PayBill';
import { PayBillsMenu } from '../screens/PayBillsMenu';
import { Savings } from '../screens/Savings';
import { Transfer } from '../screens/Transfer';

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='index' component={Index} />
            <Screen name='transfer' component={Transfer} />
            <Screen name='savings' component={Savings} />
            <Screen name='createGoal' component={CreateGoal} />
            <Screen name='paybillsmenu' component={PayBillsMenu} />
            <Screen name='paybill' component={PayBill} />
        </Navigator>
    )
}