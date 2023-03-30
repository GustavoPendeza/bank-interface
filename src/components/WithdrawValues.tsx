import { View, Text, TouchableOpacity } from 'react-native';
import { FormatNumber } from '../utils/format-number';

interface Props {
    value: number;
    selectedValue: number;
    setValue: (arg: number) => void;
}

export function WithdrawValues({ value, selectedValue, setValue }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setValue(value)}
        >
            <View className={`bg-[#303551] p-3 rounded-2xl ${selectedValue === value ? 'border-2 border-blue-400' : null}`}>
                <Text className='text-white text-base font-semibold'>${FormatNumber(value)}</Text>
            </View>
        </TouchableOpacity>
    )
}