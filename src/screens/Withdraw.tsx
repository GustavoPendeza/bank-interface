import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ListRenderItemInfo, Modal, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import colors from 'tailwindcss/colors';
import { BankAccount } from '../components/BankAccount';
import { TitleScreen } from '../components/TItleScreen';
import { WithdrawValues } from '../components/WithdrawValues';
import { FormatNumber } from '../utils/format-number';

interface Params {
    balance: number;
    newAccount: Account | null;
}

interface Value {
    value: number;
}

interface Account {
    bank: string;
    agency: string;
    account: string;
}

interface Data {
    values: Value[];
    accounts: Account[];
}

export function Withdraw() {
    const { navigate } = useNavigation();
    const data: Data = require('../data/withdraw.json');
    const route = useRoute();
    let { balance, newAccount } = route.params as Params;
    const [value, setValue] = useState(0);
    const [account, setAccount] = useState<Account | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);

    function HandleConfirm() {
        try {
            if (!value || !account) {
                Alert.alert('Sorry', 'Select the amount you want to withdraw and to which bank account.')
            } else if (value > balance) {
                Alert.alert('Sorry', 'You do not have this amount to withdraw.')
            } else {
                setVisibleModal(true);
            }
        } catch (error) {
            Alert.alert('Sorry', 'There was an error. Please try again.')
        }
    }

    useEffect(() => {
        if (newAccount) {
            data.accounts.push(newAccount)
            newAccount = null
        }

        setRefresh(true)
    }, [newAccount])

    useEffect(() => {
        setRefresh(false)
    }, [refresh])

    function renderValues({ item }: ListRenderItemInfo<Value>) {
        return (
            <WithdrawValues
                value={item.value}
                selectedValue={value}
                setValue={setValue}
            />
        )
    }

    function renderAccounts({ item }: ListRenderItemInfo<Account>) {
        return (
            <BankAccount
                item={item}
                account={account}
                setAccount={setAccount}
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
                    renderItem={renderValues}
                    numColumns={5}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    scrollEnabled={false}
                />
            </View>

            <Text className="mt-10 mx-5 text-white text-base font-semibold">
                Choose a bank account
            </Text>

            <View className='bg-[#161825] h-1/3 mt-3 mx-3 rounded-2xl overflow-hidden'>
                <FlatList
                    keyExtractor={(item, index) => item.account + index}
                    data={data.accounts}
                    renderItem={renderAccounts}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                />
            </View>

            <View className='flex-row justify-end mt-3 mx-3'>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigate('addnewaccount', { balance: balance, accounts: data.accounts })}
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

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={HandleConfirm}
                className="absolute bottom-0 w-full"
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
                <ModalWithdraw
                    handleClose={() => setVisibleModal(false)}
                    balance={balance}
                    value={value}
                    account={account!}
                />
            </Modal>

        </View>
    )
}

interface Props {
    handleClose: any;
    balance: number;
    value: number;
    account: Account;
}

export function ModalWithdraw({ handleClose, balance, value, account }: Props) {
    const { navigate } = useNavigation();

    return (
        <View className="flex-1">

            <TouchableOpacity activeOpacity={0.7} className="flex-1 z-20 bg-background opacity-70" onPress={handleClose}></TouchableOpacity>

            <View className="bg-background z-30" style={{ borderTopWidth: 1, borderColor: colors.zinc[500] }}>
                <View className="m-5">
                    <Text className="text-white text-xl font-semibold">Are you sure you want to withdraw money from this account?</Text>

                    <View className='flex-row items-center justify-between mt-8 mb-5'>
                        <Text className='text-white text-base font-semibold ml-4'>{account.bank}</Text>

                        <View className='mr-4 items-end'>
                            <Text className='text-white text-base'>{account.agency}</Text>
                            <Text className='text-white text-base'>{account.account}</Text>
                        </View>
                    </View>

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
                                Amount you will withdraw:
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
                                ${FormatNumber(balance - value)}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigate('home', { total: value, credit: null })}
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