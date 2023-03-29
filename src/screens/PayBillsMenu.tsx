import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "tailwindcss/colors";
import { TitleScreen } from "../components/TItleScreen";

interface Params {
    balance: number;
    invoice: number;
}

export function PayBillsMenu() {
    const { navigate } = useNavigation();
    const route = useRoute();
    let { balance, invoice } = route.params as Params;

    return (
        <View className="flex-1 bg-background">

            <TitleScreen title="Pay bills online" />

            <Text className="mt-7 mx-7 text-zinc-500 text-base">
                Payment options
            </Text>

            <View className="mt-5">
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigate('paybill', { balance: balance, invoice: invoice })}
                >
                    <View className="flex-row items-center justify-between h-24 mx-5">
                        <View className="flex-row items-center">
                            <FontAwesome5 name="barcode" size={20} color={colors.white} />
                            <View className="gap-1 ml-4 mr-4 w-10/12">
                                <Text className="text-white text-base font-semibold">Pay bill</Text>
                                <Text className="text-zinc-400 text-sm">Use account balance or credit card.</Text>
                            </View>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={colors.white} />
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
                    onPress={() => navigate('paycreditcard', { balance: balance, invoice: invoice })}
                >
                    <View className="flex-row items-center justify-between h-24 mx-5">
                        <View className="flex-row items-center">
                            <FontAwesome5 name="credit-card" size={18} color={colors.white} />
                            <View className="gap-1 ml-4 mr-4 w-10/12">
                                <Text className="text-white text-base font-semibold">Pay credit card bill</Text>
                                <Text className="text-zinc-400 text-sm">Pay with your balance.</Text>
                            </View>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={colors.white} />
                    </View>
                </TouchableOpacity>

                <View style={{
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    borderColor: colors.zinc[700]
                }}>
                </View>
            </View>

        </View>
    )
}