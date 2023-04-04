import { Text, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FormatNumber } from "../utils/format-number";

interface Transaction {
    icon: string;
    color: string;
    name: string;
    date: string;
    cost: boolean;
    money: number;
}

interface Props {
    item: Transaction;
}

export function Transactions({ item }: Props) {
    return (
        <View className="flex-row w-full h-16 justify-between items-center px-5">
            <View className="flex-row items-center">
                <View className="mx-2">
                    <MaterialIcons name={item.icon} size={26} color={item.color} />
                </View>
                <View className="pl-3 gap-1">
                    <Text className="text-white text-base font-semibold">{item.name}</Text>
                    <Text className="text-zinc-500">{item.date}</Text>
                </View>
            </View>

            <View>
                <Text className={item.cost === true ? 'text-red-500' : 'text-green-400'}>
                    {item.cost === true ? "-" : "+"}
                    ${FormatNumber(item.money)}
                </Text>
            </View>
        </View>
    )
}