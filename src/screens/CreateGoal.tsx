import { useState } from "react";
import { FlatList, ListRenderItemInfo, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { ColorSelect } from "../components/ColorSelect";

interface Color {
    color: string;
    progressColor: string;
}

interface Data {
    colors: Color[];
}

export function CreateGoal() {
    const data: Data = require('../data/colors.json');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [goal, setGoal] = useState('');

    function renderItem({ item }: ListRenderItemInfo<Color>) {
        return <ColorSelect color={item.color} progressColor={item.progressColor} />
    }

    return (
        <View className="flex-1 bg-background">

            <View className="flex-row mt-12 px-5 items-center justify-center">
                <BackButton />
                <Text className="text-white text-xl">New goal</Text>
            </View>

            <View className="flex-row items-center h-14 mt-10 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                <TextInput
                    className="flex-1 text-white"
                    placeholder="Goal name"
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setName}
                    value={name}
                    clearButtonMode="always"
                />
            </View>

            <View className="flex-row items-center h-14 mt-8 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                <MaterialIcons name="attach-money" size={20} color={colors.zinc[400]} />

                <TextInput
                    className="flex-1 text-white"
                    placeholder="Opening balance"
                    placeholderTextColor={colors.zinc[400]}
                    keyboardType="number-pad"
                    onChangeText={setBalance}
                    value={balance}
                    clearButtonMode="always"
                />
            </View>

            <View className="flex-row items-center h-14 mt-8 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                <MaterialIcons name="attach-money" size={20} color={colors.zinc[400]} />

                <TextInput
                    className="flex-1 text-white"
                    placeholder="Your goal"
                    placeholderTextColor={colors.zinc[400]}
                    keyboardType="number-pad"
                    onChangeText={setGoal}
                    value={goal}
                    clearButtonMode="always"
                />
            </View>

            <FlatList
                className="mx-7 mt-10"
                keyExtractor={(item, index) => item.color + index}
                data={data.colors}
                renderItem={renderItem}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: "space-evenly" }}
                scrollEnabled={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View className="h-7"></View>
                    )
                }}
            />

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