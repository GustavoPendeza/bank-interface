import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ListRenderItemInfo } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { TitleScreen } from '../components/TItleScreen';
import WithdrawValues from '../components/WithdrawValues';

interface Params {
    balance: number;
}

interface Value {
    value: number;
}

interface Data {
    values: Value[];
}

export function Withdraw() {
    const data: Data = require('../data/withdraw.json');
    const route = useRoute();
    let { balance } = route.params as Params;
    const [value, setValue] = useState(0)

    function renderItem({ item }: ListRenderItemInfo<Value>) {
        return (
            <WithdrawValues
                value={item.value}
                selectedValue={value}
                setValue={setValue}
            />
        )
    }

    return (
        <View className='flex-1 bg-background'>

            <TitleScreen title='Withdraw' />

            <Text className="mt-7 mx-7 text-zinc-500 text-base">
                Withdraw from physical banks
            </Text>

            <View className='mt-10 mx-5'>
                <FlatList
                    keyExtractor={(item) => item.value.toString()}
                    data={data.values}
                    renderItem={renderItem}
                    numColumns={5}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    scrollEnabled={false}
                />
            </View>

            <Text className="mt-10 mx-5 text-white text-base font-semibold">
                Choose a bank account
            </Text>

            <View className='bg-[#161825] h-60 mt-3 mx-3 rounded-xl'>

            </View>

            <View className='flex-row justify-end mt-3 mx-3'>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#303551', '#342d46']}
                        className="h-10 px-5 items-center justify-center rounded-2xl"
                    >
                        <Text className='text-white text-sm font-semibold'>Add new account</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    )
}