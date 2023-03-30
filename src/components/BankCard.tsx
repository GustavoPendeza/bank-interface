import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
    bank: string;
    selectedBank: string;
    setBank: (arg: string) => void;
}

export function BankCard({ bank, selectedBank, setBank }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setBank(bank)}
        >
            <View
                className={`bg-[#303551] items-center p-3 my-1 mx-1 rounded-xl 
                ${selectedBank === bank ? 'border-2 border-blue-400' : null}`}
            >
                <Text className='text-white text-base font-semibold'>{bank}</Text>
            </View>
        </TouchableOpacity>
    )
}