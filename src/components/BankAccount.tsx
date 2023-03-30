import { View, Text, TouchableOpacity } from 'react-native';

interface Account {
    bank: string;
    agency: string;
    account: string;
}

interface Props {
    item: Account;
    account: Account | null;
    setAccount: (arg: Account) => void;
}

export function BankAccount({ item, account, setAccount }: Props) {
    console.log(item === account)
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setAccount({ bank: item.bank, agency: item.agency, account: item.account })}
        >
            <View
                className={`flex-row items-center justify-between bg-[#303551] my-1 mx-1 rounded-xl 
                ${item.bank === account?.bank &&
                        item.agency === account.agency &&
                        item.account === account.account
                        ?
                        'border-2 border-blue-400'
                        :
                        null
                    }`
                }
            >
                <Text className='text-white text-base font-semibold ml-4'>{item.bank}</Text>

                <View className='mr-4 items-end'>
                    <Text className='text-white text-base'>{item.agency}</Text>
                    <Text className='text-white text-base'>{item.account}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}