import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Service {
    name: string;
    icon: string;
    color: string;
    route:any;
}

interface Props {
    item: Service;
}

export function Services({ item }: Props) {
    const { navigate } = useNavigation();

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate(item.route)}>
            <View className="h-24 w-20 mx-2.5 items-center justify-between">
                <View className="bg-zinc-600 h-16 w-16 rounded-full items-center justify-center">
                    <MaterialIcons name={item.icon} size={24} color={item.color} />
                </View>

                <Text className="text-white">
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}