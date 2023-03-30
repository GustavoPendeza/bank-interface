import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ListRenderItemInfo, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskInput from 'react-native-mask-input';
import colors from 'tailwindcss/colors';
import { BankCard } from '../components/BankCard';
import { TitleScreen } from '../components/TItleScreen';

interface Account {
    bank: string;
    agency: string;
    account: string;
}

interface Params {
    balance: number;
    accounts: Account[];
}

interface Bank {
    bank: string;
}

interface Data {
    banks: Bank[];
}

export function AddNewAccount() {
    const data: Data = require('../data/banks.json');
    const route = useRoute();
    let { balance, accounts } = route.params as Params;
    const [bank, setBank] = useState('');
    const [agency, setAgency] = useState('');
    const [charactersAgency, setCharactersAgency] = useState(0);
    const [account, setAccount] = useState('');
    const [charactersAccount, setCharactersAccount] = useState(0);
    const [accountMask, setAccountMask] = useState<any>(null);
    const [visibleModal, setVisibleModal] = useState(false);
    const [newAccount, setNewAccount] = useState<Account | null>(null);
    const fiveAgencyMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/];
    const fourAgencyMask = [/\d/, /\d/, /\d/, /\d/];
    const sixAccountMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
    const eightAccountMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
    const nineAccountMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
    const twelveAccountMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];

    function HandleConfirm() {
        accounts.map((item) => {
            if (item.agency === agency && item.account === account) {
                Alert.alert('Sorry', 'You already registered this account.')
            }
        })

        try {
            if (!bank || !agency || !account) {
                Alert.alert('Sorry', 'You must select a bank and make sure you add your account correctly.')
            } else {
                if (
                    bank === 'Caixa Econômica' && charactersAgency < 4 ||
                    bank === 'Caixa Econômica' && charactersAccount < 12 ||
                    bank === 'Bradesco' && charactersAgency < 5 && charactersAccount < 8 ||
                    bank === 'Bradesco' && charactersAccount < 8 ||
                    bank === 'Itaú' && charactersAgency < 4 && charactersAccount < 6 ||
                    bank === 'Itaú' && charactersAccount < 6 ||
                    bank === 'Banco do Brasil' && charactersAgency < 5 && charactersAccount < 9 ||
                    bank === 'Banco do Brasil' && charactersAccount < 9 ||
                    bank === 'Santander' && charactersAgency < 4 ||
                    bank === 'Santander' && charactersAccount < 9
                ) {
                    Alert.alert('Sorry', 'Make sure you add your account correctly.')
                } else {
                    setNewAccount({
                        bank: bank,
                        agency: agency,
                        account: account
                    })
                }
            }
        } catch (error) {
            Alert.alert('Sorry', 'There was an error registering this bank account. Please try again.')
        }
    }

    useEffect(() => {
        setAgency('');
        setAccount('');

        if (bank === 'Caixa Econômica') {
            setAccountMask(twelveAccountMask)
        } else if (bank === 'Bradesco') {
            setAccountMask(eightAccountMask)
        } else if (bank === 'Itaú') {
            setAccountMask(sixAccountMask)
        } else {
            setAccountMask(nineAccountMask)
        }
    }, [bank])

    useEffect(() => {
        if (newAccount) {
            setVisibleModal(true);
        }
    }, [newAccount])

    function renderItem({ item }: ListRenderItemInfo<Bank>) {
        return (
            <BankCard
                bank={item.bank}
                selectedBank={bank}
                setBank={setBank}
            />
        )
    }

    return (
        <View className='flex-1 bg-background'>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                <TitleScreen title='Add new account' />

                <Text className="mt-10 mx-5 text-white text-base font-semibold">
                    Choose a bank
                </Text>

                <View className='bg-[#161825] mt-3 mx-3 rounded-2xl overflow-hidden'>
                    <FlatList
                        keyExtractor={(item) => item.bank}
                        data={data.banks}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                </View>

                {
                    bank ?
                        <>
                            <View className="justify-center h-14 mt-10 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                                <MaskInput
                                    className="flex-1 text-white text-base"
                                    placeholder="Agency number"
                                    keyboardType='number-pad'
                                    placeholderTextColor={colors.zinc[400]}
                                    onChangeText={(masked, unmasked) => {
                                        setAgency(masked)
                                        setCharactersAgency(unmasked.length)
                                    }}
                                    mask={
                                        bank === 'Banco do Brasil' || bank === 'Bradesco' ?
                                            fiveAgencyMask :
                                            fourAgencyMask
                                    }
                                    value={agency}
                                    clearButtonMode="always"
                                />
                            </View>

                            <View className="justify-center h-14 mt-10 mb-20 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                                <MaskInput
                                    className="flex-1 text-white text-base"
                                    placeholder="Account number"
                                    keyboardType='number-pad'
                                    placeholderTextColor={colors.zinc[400]}
                                    onChangeText={(masked, unmasked) => {
                                        setAccount(masked)
                                        setCharactersAccount(unmasked.length)
                                    }}
                                    mask={accountMask}
                                    value={account}
                                    clearButtonMode="always"
                                />
                            </View>
                        </>
                        :
                        null
                }

            </ScrollView >

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
                <ModalAddNewAccount
                    handleClose={() => setVisibleModal(false)}
                    balance={balance}
                    newAccount={newAccount!}
                />
            </Modal>

        </View >
    )
}

interface Props {
    handleClose: any;
    balance: number;
    newAccount: Account;
}

export function ModalAddNewAccount({ handleClose, balance, newAccount }: Props) {
    const { navigate } = useNavigation();

    return (
        <View className="flex-1">

            <TouchableOpacity activeOpacity={0.7} className="flex-1 z-20 bg-background opacity-70" onPress={handleClose}></TouchableOpacity>

            <View className="bg-background z-30" style={{ borderTopWidth: 1, borderColor: colors.zinc[500] }}>
                <View className="m-5">
                    <Text className="text-white text-xl font-semibold">Are you sure you want to add this account?</Text>

                    <View className="mt-5 mb-10">
                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Bank:
                            </Text>
                            <Text className="text-white text-base">
                                {newAccount.bank}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Agency:
                            </Text>
                            <Text className="text-white text-base">
                                {newAccount.agency}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            <Text className="text-zinc-400 text-base">
                                Account:
                            </Text>
                            <Text className="text-white text-base">
                                {newAccount.account}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigate('withdraw', { balance: balance, newAccount: newAccount })}
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