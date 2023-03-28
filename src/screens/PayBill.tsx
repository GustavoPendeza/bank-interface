import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaskInput from "react-native-mask-input";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "tailwindcss/colors";
import { TitleScreen } from "../components/TItleScreen";
import { FormatNumber } from "../utils/format-number";

interface Params {
    balance: number;
}

export function PayBill() {
    const route = useRoute();
    let { balance } = route.params as Params;
    const [barcode, setBarcode] = useState('');
    const [characters, setCharacters] = useState(0);
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState(0);
    const [expiration, setExpiration] = useState('null');
    const [total, setTotal] = useState(0);
    const [credit, setCredit] = useState(0);
    const [limit, setLimit] = useState(1500);
    const [visibleBalanceModal, setVisibleBalanceModal] = useState(false);
    const [visibleCardModal, setVisibleCardModal] = useState(false);
    const current = new Date();

    function HandleOpenBalanceModal() {
        if (total) {
            if (balance === 0 || balance < total) {
                Alert.alert('Sorry', 'You don\'t have enough balance for this.')
            } else {
                setVisibleBalanceModal(true)
            }        
        } else {
            Alert.alert('Sorry', 'There is no bill to pay. Please enter the bar code correctly.')
        }
    }

    function HandleOpenCreditCardModal() {
        if (total) {
            if (credit === limit || credit + total < limit) {
                Alert.alert('Sorry', 'You\'ve used up all your credit or you\'re about to go over it.')
            } else {
                setVisibleCardModal(true)
            }
        } else {
            Alert.alert('Sorry', 'There is no bill to pay. Please enter the bar code correctly.')
        }
    }

    useEffect(() => {
        current.setDate(current.getDate() + 5)
        if (Array.from(barcode)[0] === '8' && characters === 48) {
            setReceiver('Mefi')
            setAmount(100)
            setExpiration(current.toDateString())
            setTotal(101)
        } else if (Array.from(barcode)[0] !== '8' && characters === 47) {
            setReceiver('Electricity company')
            setAmount(200)
            setExpiration(current.toDateString())
            setTotal(201)
        } else {
            setReceiver('')
            setAmount(0)
            setExpiration('')
            setTotal(0)
        }
    }, [characters])

    return (
        <View className="flex-1 bg-background">

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                <TitleScreen title="Pay bill" />

                <View className="justify-center h-20 mt-8 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                    <MaskInput
                        className="flex-1 text-white text-base"
                        placeholder="Enter the bar code"
                        placeholderTextColor={colors.zinc[400]}
                        keyboardType="number-pad"
                        onChangeText={(masked, unmasked) => {
                            setBarcode(masked)
                            setCharacters(unmasked.length)
                        }}
                        mask={Array.from(barcode)[0] === '8' || barcode === '' ?
                            [
                                /\d/, /\d/, /\d/, /\d/, /\d/, '.',
                                /\d/, /\d/, /\d/, /\d/, /\d/, ' ',
                                /\d/, /\d/, /\d/, /\d/, /\d/, '.',
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ',
                                /\d/, /\d/, /\d/, /\d/, /\d/, '.',
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ',
                                /\d/, ' ',
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
                            ]
                            :
                            [
                                /\d/, /\d/, /\d/, /\d/, /\d/, '.',
                                /\d/, /\d/, /\d/, /\d/, /\d/, ' ',
                                /\d/, /\d/, /\d/, /\d/, /\d/, '.',
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ',
                                /\d/, /\d/, /\d/, /\d/, /\d/, '.',
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ',
                                /\d/, ' ',
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
                                /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
                            ]
                        }
                        value={barcode}
                        multiline
                        clearButtonMode="always"
                    />
                </View>
                <View className="mx-7">
                    <Text className="text-white absolute right-4">
                        {characters}/
                        {
                            Array.from(barcode)[0] === '8' || barcode === '' ?
                                48
                                :
                                47
                        }
                    </Text>
                </View>

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#313440', '#372c39']}
                    className="flex-row mt-10 mx-10 px-5 py-8 items-center rounded-xl overflow-hidden"
                >
                    <View className="gap-y-5 w-full">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-zinc-500 text-sm">Receiver</Text>

                            <Text className="text-zinc-500 text-sm">{receiver}</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-zinc-500 text-sm">Amount</Text>

                            <Text className="text-zinc-500 text-sm">${amount}</Text>
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
                            <Text className="text-zinc-400 text-base font-semibold">Total</Text>

                            <Text className="text-zinc-400 text-lg font-bold">${total}</Text>
                        </View>
                    </View>

                </LinearGradient>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={HandleOpenBalanceModal}
                >
                    <View className="mt-8 mx-7">
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

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={HandleOpenCreditCardModal}
                >
                    <View className="mt-5 mx-7">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-white text-lg font-semibold">Credit card</Text>

                            <FontAwesome5 name="chevron-right" size={14} color={colors.white} />
                        </View>

                        <View className="mt-3">
                            <Text className="text-zinc-400 text-sm">Current invoice</Text>
                        </View>

                        <View className="mt-2">
                            <Text className="text-white text-base">${FormatNumber(credit)}</Text>
                        </View>

                        <View className="mt-1 mb-4">
                            <Text className="text-zinc-400 text-sm">Available limit of ${FormatNumber(limit)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View className="mb-4" style={{
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
                    total={total}
                />
            </Modal>
            
            <Modal
                visible={visibleCardModal}
                transparent={true}
                animationType={"slide"}
                onRequestClose={() => setVisibleCardModal(false)}
            >
                <ModalPayWithCreditCard
                    handleClose={() => setVisibleCardModal(false)}
                    credit={credit}
                    total={total}
                />
            </Modal>

        </View>
    )
}

interface Props {
    handleClose: any;
    balance?: number;
    credit?: number;
    total: number;
}

export function ModalPayWithBalance({ handleClose, balance = 0, total }: Props) {
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
                                ${FormatNumber(total)}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Your balance will be:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(balance - total)}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigate('home', { total: total })}
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

export function ModalPayWithCreditCard({ handleClose, credit = 0, total }: Props) {
    const { navigate } = useNavigation();

    return (
        <View className="flex-1">

            <TouchableOpacity activeOpacity={0.7} className="flex-1 z-20 bg-background opacity-70" onPress={handleClose}></TouchableOpacity>

            <View className="bg-background z-30" style={{ borderTopWidth: 1, borderColor: colors.zinc[500] }}>
                <View className="m-5">
                    <Text className="text-white text-xl font-semibold">Want to pay using your credit card?</Text>

                    <View className="mt-5 mb-10">
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Current invoice:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(credit)}
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
                                ${FormatNumber(total)}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Your invoice will be:
                            </Text>
                            <Text className="text-white text-base">
                                ${FormatNumber(credit + total)}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigate('home', { total: 0 })}
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