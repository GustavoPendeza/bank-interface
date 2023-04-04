import { View, Text, TouchableOpacity } from 'react-native';
import { FormatNumber } from '../utils/format-number';

interface Props {
    value: number;
    selectedValue: number;
    setValue: (arg: number) => void;
}

export default function WalletValues({ value, selectedValue, setValue }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setValue(value)}
        >
            <View className={`py-1 px-4 rounded-full border-2 ${selectedValue === value ? 'border-blue-400' : 'border-zinc-500'}`}>
                <Text className='text-white text-base font-semibold'>${FormatNumber(value)}</Text>
            </View>
        </TouchableOpacity>
    )
}