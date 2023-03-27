import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "tailwindcss/colors";
import { TitleScreen } from "../components/TItleScreen";

export function PayBill() {
    const [bill, setBill] = useState('');
    const [characters, setCharacters] = useState(0);

    function HandleOnChange(text: string) {
        setBill(text)
        setCharacters(text.length)
    }

    return (
        <View className="flex-1 bg-background">

            <TitleScreen title="Pay bill" />

            <View className="justify-center h-20 mt-10 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                <TextInput
                    className="flex-1 text-white"
                    placeholder="Enter the number"
                    placeholderTextColor={colors.zinc[400]}
                    keyboardType="number-pad"
                    onChange={(event) => HandleOnChange(event.nativeEvent.text)}
                    maxLength={48}
                    multiline
                    clearButtonMode="always"
                />
            </View>
            <View className="mx-7">
                <Text className="text-white absolute right-4">{characters}/48</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { }}
            >
                <View className="mt-20 mx-7">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-white text-lg font-semibold">Your balance</Text>

                        <FontAwesome5 name="chevron-right" size={14} color={colors.white} />
                    </View>

                    <View className="mt-3">
                        <Text className="text-zinc-400 text-sm">Current balance</Text>
                    </View>

                    <View className="mt-2 mb-4">
                        <Text className="text-white text-base">$16.027</Text>
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
                onPress={() => { }}
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
                        <Text className="text-white text-base">$0</Text>
                    </View>

                    <View className="mt-1 mb-4">
                        <Text className="text-zinc-400 text-sm">Available limit of $1500</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{
                borderStyle: 'solid',
                borderBottomWidth: 1,
                borderColor: colors.zinc[700]
            }}>
            </View>

        </View>
    )
}