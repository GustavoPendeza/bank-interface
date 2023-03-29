import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { TitleScreen } from '../components/TItleScreen'
import LinearGradient from 'react-native-linear-gradient'
import colors from 'tailwindcss/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FormatNumber } from '../utils/format-number'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface Params {
    balance: number;
    invoice: number;
}

export function PayCreditCard() {
    const route = useRoute();
    let { balance, invoice } = route.params as Params;
    const [expiration, setExpiration] = useState('null');
    const [visibleBalanceModal, setVisibleBalanceModal] = useState(false);
    const current = new Date();

    function HandleOpenBalanceModal() {
        if (invoice) {
            if (balance === 0 || balance < invoice) {
                Alert.alert('Sorry', 'You don\'t have enough balance for this.')
            } else {
                setVisibleBalanceModal(true)
            }
        } else {
            Alert.alert('Sorry', 'There is no bill to pay.')
        }
    }

    useEffect(() => {
        current.setDate(current.getDate() + 5)

        setExpiration(current.toDateString())
    })

    return (
        <View className='flex-1 bg-background'>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                <TitleScreen title='Pay credit card bill' />

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#313440', '#372c39']}
                    className="flex-row mt-10 mx-10 px-5 py-8 items-center rounded-xl overflow-hidden"
                >
                    <View className="gap-y-5 w-full">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-zinc-500 text-sm">Receiver</Text>

                            <Text className="text-zinc-500 text-sm">Mefi</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-zinc-500 text-sm">Amount</Text>

                            <Text className="text-zinc-500 text-sm">${FormatNumber(invoice)}</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-zinc-500 text-sm">Balance</Text>

                            <Text className="text-zinc-500 text-sm">${FormatNumber(balance)}</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-zinc-500 text-sm">Expiration</Text>

                            <Text className="text-zinc-500 text-sm">{expiration}</Text>
                        </View>

                        <View className="h-14 justify-center">
                            <View className="absolute h-10 w-10 -left-10 bg-background rounded-full"></View>

                            <View style={{
                                borderStyle: 'dashed',
                                borderBottomWidth: 2,
                                borderColor: colors.zinc[600]
                            }}>
                            </View>

                            <View className="absolute h-10 w-10 -right-10 bg-background rounded-full"></View>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-zinc-400 text-base font-semibold">Balance</Text>

                            <Text className="text-zinc-400 text-lg font-bold">${FormatNumber(balance - invoice)}</Text>
                        </View>
                    </View>

                </LinearGradient>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={HandleOpenBalanceModal}
                >
                    <View className="mt-10 mx-7">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-white text-lg font-semibold">Your balance</Text>

                            <FontAwesome5 name="chevron-right" size={14} color={colors.white} />
                        </View>

                        <View className="mt-3">
                            <Text className="text-zinc-400 text-sm">Current balance</Text>
                        </View>

                        <View className="mt-2 mb-4">
                            <Text className="text-white text-base">${FormatNumber(balance)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    borderColor: colors.zinc[700]
                }}>
                </View>

            </ScrollView>

            <Modal
                visible={visibleBalanceModal}
                transparent={true}
                animationType={"slide"}
                onRequestClose={() => setVisibleBalanceModal(false)}
            >
                <ModalPayWithBalance
                    handleClose={() => setVisibleBalanceModal(false)}
                    balance={balance}
                    invoice={invoice}
                />
            </Modal>

        </View>
    )
}

interface Props {
    handleClose: any;
    balance: number;
    invoice: number;
}

export function ModalPayWithBalance({ handleClose, balance, invoice }: Props) {
    const { navigate } = useNavigation();

    return (
        <View className="flex-1">

            <TouchableOpacity activeOpacity={0.7} className="flex-1 z-20 bg-background opacity-70" onPress={handleClose}></TouchableOpacity>

            <View className="bg-background z-30" style={{ borderTopWidth: 1, borderColor: colors.zinc[500] }}>
                <View className="m-5">
                    <Text className="text-white text-xl font-semibold">Want to pay using your balance?</Text>

                    <View className="mt-5 mb-10">
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Current balance:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(balance)}
                            </Text>
                        </View>

                        <View
                            className="flex-row items-center gap-1 pb-3 mb-2"
                            style={{ borderBottomWidth: 1, borderColor: colors.zinc[500] }}
                        >
                            <Text className="text-zinc-400 text-base">
                                Amount to pay:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(invoice)}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Your balance will be:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(balance - invoice)}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigate('home', { total: invoice, credit: 0 })}
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