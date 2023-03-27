import { Image, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "tailwindcss/colors";
import { TitleScreen } from "../components/TItleScreen";

export function Transfer() {
    return (
        <View className="flex-1 bg-background">

            <TitleScreen title="Transfer to Monaca" />

            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#5e515c', '#57414e']}
                className="flex-row mt-8 mx-10 h-12 px-5 items-center rounded-2xl"
            >
                <FontAwesome5 name="info-circle" size={15} color={"#c3bcc2"} />
                <Text className="text-[#c3bcc2] text-base ml-3">You have 3 free transfers left.</Text>
            </LinearGradient>

            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#313440', '#372c39']}
                className="flex-row mt-5 mx-10 px-5 py-8 items-center rounded-xl overflow-hidden"
            >
                <View className="gap-y-5 w-full">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-zinc-500 text-sm">Receiver</Text>

                        <Text className="text-zinc-500 text-sm">Monaca</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-zinc-500 text-sm">Content</Text>

                        <Text className="text-zinc-500 text-sm">Gift for you</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-zinc-500 text-sm">Amount</Text>

                        <Text className="text-zinc-500 text-sm">$275</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-zinc-500 text-sm">Fee</Text>

                        <Text className="text-zinc-500 text-sm">$0</Text>
                    </View>

                    <View className="h-14 justify-center">
                        <View className="absolute h-10 w-10 -left-10 bg-background rounded-full"></View>

                        <View style={{
                            borderStyle: 'dashed',
                            borderBottomWidth: 2,
                            borderColor: colors.zinc[600]
                        }}>
                        </View>

                        <View className="absolute h-10 w-10 -right-10 bg-background rounded-full"></View>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-zinc-400 text-base font-semibold">Total</Text>

                        <Text className="text-zinc-400 text-lg font-bold">$100</Text>
                    </View>
                </View>

            </LinearGradient>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { }}
            >

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#222435', '#2a212f']}
                    className="flex-row mt-8 mx-10 h-24 px-5 items-center justify-between rounded-xl"
                >
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: 'https://user-images.githubusercontent.com/53589614/227034583-2742def6-f272-4445-8e88-13eb544c3bb7.png' }}
                            className="h-12 w-12"
                        />
                        <View className="pl-3 gap-1">
                            <Text className="text-white text-base">Mefi Wallet</Text>
                            <Text className="text-zinc-500 text-xs">Balance: 12.067</Text>
                        </View>
                    </View>

                    <Text className="text-[#9b8694] text-xs">Change</Text>
                </LinearGradient>

            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { }}
                className="absolute bottom-0 w-full"
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#303551', '#342d46']}
                    className="mt-8 mx-7 h-12 px-5 items-center justify-center rounded-2xl"
                >
                    <Text className="text-[#facad0] text-base font-semibold">Confirm</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )
}