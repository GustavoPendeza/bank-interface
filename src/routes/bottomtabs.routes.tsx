import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { History } from '../screens/History';
import { Home } from '../screens/Home';
import { Deals } from '../screens/Deals';
import { Wallet } from '../screens/Wallet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator()

export function BottomTabsRoutes() {
    const circle = <View className='h-1 w-1 rounded-full bg-[#fdc8d5] mt-1'></View>;

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#303453',
                    borderRadius: 15,
                    height: 75,
                    borderTopWidth: 0
                },
            }}
        >
            <Screen
                name='home'
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <MaterialIcons name="home" size={32} color={focused ? '#fdc8d5' : '#9091ae'} />
                            {focused ? circle : null}
                        </>
                    ),
                }}
            />
            <Screen
                name='deals'
                component={Deals}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <FontAwesome5 name="percentage" size={24} color={focused ? '#fdc8d5' : '#9091ae'} />
                            {focused ? circle : null}
                        </>
                    ),
                }}
            />
            <Screen
                name='history'
                component={History}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <FontAwesome5 name="clock" size={24} color={focused ? '#fdc8d5' : '#9091ae'} />
                            {focused ? circle : null}
                        </>
                    ),
                }}
            />
            <Screen
                name='wallet'
                component={Wallet}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <MaterialIcons name="account-balance-wallet" size={30} color={focused ? '#fdc8d5' : '#9091ae'} />
                            {focused ? circle : null}
                        </>
                    ),
                }}
            />
        </Navigator>
    )
}