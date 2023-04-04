import { useState } from 'react';
import { Alert, FlatList, ListRenderItemInfo, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from 'tailwindcss/colors';
import WalletValues from '../components/WalletValues';
import LinearGradient from 'react-native-linear-gradient';
import { FormatNumber } from '../utils/format-number';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Value {
    value: number;
}

interface Data {
    values: Value[];
}

export function Wallet() {
    const data: Data = require('../data/wallet.json');
    const [money, setMoney] = useState(0);
    const [visibleModal, setVisibleModal] = useState(false);

    function HandleConfirm() {
        try {
            if (!money) {
                Alert.alert('Sorry', 'Make sure you entered the value correctly. Do not use commas or spaces in cash amounts.')
            } else {
                setVisibleModal(true);
            }
        } catch (error) {
            Alert.alert('Sorry', 'There was an error registering this goal. Please try again.')
        }
    }

    function renderItem({ item }: ListRenderItemInfo<Value>) {
        return (
            <WalletValues
                value={item.value}
                selectedValue={money}
                setValue={setMoney}
            />
        )
    }

    return (
        <View className='flex-1 bg-background'>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View className='mt-12 items-center justify-center'>
                    <Text className="text-white text-xl">Top up your wallet</Text>
                </View>

                <View className="flex-row justify-between items-center bg-[#303453] h-14 mt-8 mx-7 px-4 rounded-2xl">
                    <Text className='text-white text-base'>Your balance</Text>

                    <Text className='text-white text-base font-semibold'>$16.027</Text>
                </View>

                <View className='bg-[#303453] mt-5 mx-7 p-4 rounded-2xl'>
                    <Text className='text-white text-base mx-1 mb-3'>Enter amount</Text>

                    <View className="flex-row items-center h-14 px-3 border-2 rounded-2xl border-zinc-500 focus:border-background">
                        <MaterialIcons name="attach-money" size={20} color={colors.white} />

                        <TextInput
                            className="flex-1 text-white"
                            keyboardType="number-pad"
                            onChange={(event) => setMoney(Number(Number(event.nativeEvent.text).toFixed(0)))}
                            maxLength={6}
                            value={money.toString()}
                            clearButtonMode="always"
                        />
                    </View>

                    <Text className="mt-3 mx-1 mb-3 text-zinc-400 text-sm">
                        or quick choice
                    </Text>

                    <FlatList
                        keyExtractor={(item) => item.value.toString()}
                        data={data.values}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => {
                            return <View className='mt-3'></View>
                        }}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                        scrollEnabled={false}
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={HandleConfirm}
                    className='mt-5'
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#303551', '#342d46']}
                        className="mx-7 h-12 px-5 items-center justify-center rounded-2xl"
                    >
                        <Text className="text-[#facad0] text-base font-semibold">Confirm</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Modal
                    visible={visibleModal}
                    transparent={true}
                    animationType={"slide"}
                    onRequestClose={() => setVisibleModal(false)}
                >
                    <ModalWallet
                        handleClose={() => setVisibleModal(false)}
                        value={money}
                    />
                </Modal>

            </ScrollView>
        </View>
    )
}

interface Props {
    handleClose: any;
    value: number;
}

export function ModalWallet({ handleClose, value }: Props) {
    return (
        <View className="flex-1">

            <TouchableOpacity activeOpacity={0.7} className="flex-1 z-20 bg-background opacity-70" onPress={handleClose}></TouchableOpacity>

            <View className="bg-background z-30" style={{ borderTopWidth: 1, borderColor: colors.zinc[500] }}>
                <View className="m-5">
                    <Text className="text-white text-xl font-semibold">Are you sure you want to add an amount to your account?</Text>

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#5e515c', '#57414e']}
                        className="flex-row mt-5 h-16 px-4 items-center rounded-2xl"
                    >
                        <FontAwesome5 name="info-circle" size={15} color={"#c3bcc2"} />
                        <Text className="text-[#c3bcc2] text-base ml-4">This will generate a bill that must be paid within 5 business days.</Text>
                    </LinearGradient>

                    <View className="mt-6 mb-10">
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Current balance:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(16027)}
                            </Text>
                        </View>

                        <View
                            className="flex-row items-center gap-1 pb-3 mb-2"
                            style={{ borderBottomWidth: 1, borderColor: colors.zinc[500] }}
                        >
                            <Text className="text-zinc-400 text-base">
                                Amount that will add:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(value)}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Your balance will be:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(16027 + value)}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => { }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#303551', '#342d46']}
                            className="h-12 px-5 mb-5 items-center justify-center rounded-2xl"
                        >
                            <Text className="text-[#facad0] text-base font-semibold">Confirm</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleClose}
                    >
                        <View
                            className="bg-[#303551] h-12 px-5 items-center justify-center rounded-2xl"
                        >
                            <Text className="text-red-600 text-base font-semibold">Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}