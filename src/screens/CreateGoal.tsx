import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { Alert, FlatList, ListRenderItemInfo, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "tailwindcss/colors";
import { ColorSelect } from "../components/ColorSelect";
import { SavingsCard } from "../components/SavingsCard";
import { TitleScreen } from "../components/TItleScreen";
import { FormatNumber } from "../utils/format-number";

interface Goal {
    name: string;
    money: number;
    goal: number;
    color: string;
    progressColor: string;
}

interface Color {
    color: string;
    progressColor: string;
}

interface HomeData {
    balance: number;
}

interface ColorData {
    colors: Color[];
}

export function CreateGoal() {
    const homeData: HomeData = require('../data/home.json');
    const colorData: ColorData = require('../data/colors.json');
    const [newData, setNewData] = useState<Goal | null>(null)
    const [name, setName] = useState('');
    const [money, setMoney] = useState(0);
    const [goal, setGoal] = useState(0);
    const [color, setColor] = useState('');
    const [progressColor, setProgressColor] = useState('');
    const [visibleModal, setVisibleModal] = useState(false);

    function renderItem({ item }: ListRenderItemInfo<Color>) {
        return (
            <ColorSelect
                color={item.color}
                selectedColor={color}
                setColor={setColor}
                progressColor={item.progressColor}
                setProgressColor={setProgressColor}
            />
        )
    }

    function HandleConfirm() {
        try {
            if (!money || !goal) {
                Alert.alert('Sorry', 'Make sure you entered the data correctly. Do not use commas or spaces in cash amounts.')
                return;
            } else {
                if (money > goal) {
                    Alert.alert('Sorry', 'The balance cannot be greater than the goal.')
                    return;
                } else {
                    if (money > homeData.balance) {
                        Alert.alert('Sorry', `Your current balance is $${FormatNumber(homeData.balance)}. You cannot add more money than your current balance.`)
                        return;
                    } else {
                        if (name !== '' && color !== '' && progressColor !== '') {
                            setNewData({
                                name: name,
                                money: money,
                                goal: goal,
                                color: color,
                                progressColor: progressColor
                            })
                        } else {
                            Alert.alert('Sorry', 'Fill in the fields correctly.')
                        }
                    }
                }
            }
        } catch (error) {
            Alert.alert('Sorry', 'There was an error registering this goal. Please try again.')
        }
    }

    useEffect(() => {
        if (newData) {
            setVisibleModal(true)
        }
    }, [newData])

    return (
        <View className="flex-1 bg-background">

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                <TitleScreen title="New goal" />

                <View className="justify-center h-14 mt-10 mx-7 px-3 border-2 rounded-2xl border-zinc-600 focus:border-[#303453]">
                    <TextInput
                        className="flex-1 text-white"
                        placeholder="Goal name"
                        placeholderTextColor={colors.zinc[400]}
                        onChange={(event) => setName(event.nativeEvent.text.trim())}
                        maxLength={20}
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
                        onChange={(event) => setMoney(Number(Number(event.nativeEvent.text).toFixed(0)))}
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
                        onChange={(event) => setGoal(Number(Number(event.nativeEvent.text).toFixed(0)))}
                        clearButtonMode="always"
                    />
                </View>

                <View className="mx-8 mt-7">
                    <Text className="text-white text-base font-semibold">Choose a color</Text>
                </View>

                <FlatList
                    className="mx-7 mt-8 mb-5"
                    keyExtractor={(item, index) => item.color + index}
                    data={colorData.colors}
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

            </ScrollView>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={HandleConfirm}
                className="bottom-0 w-full"
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#303551', '#342d46']}
                    className="mx-7 h-12 px-5 items-center justify-center rounded-2xl"
                >
                    <Text className="text-[#facad0] text-base font-semibold">Create new goal</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Modal
                visible={visibleModal}
                transparent={true}
                animationType={"slide"}
                onRequestClose={() => setVisibleModal(false)}
            >
                <ModalCreateGoal
                    handleClose={() => setVisibleModal(false)}
                    newData={newData!}
                />
            </Modal>

        </View>
    )
}

interface Props {
    handleClose: any;
    newData: Goal;
}

export function ModalCreateGoal({ handleClose, newData }: Props) {
    const { navigate } = useNavigation();

    return (
        <View className="flex-1">

            <TouchableOpacity activeOpacity={0.7} className="flex-1 z-20 bg-background opacity-70" onPress={handleClose}></TouchableOpacity>

            <View className="bg-background z-30" style={{ borderTopWidth: 1, borderColor: colors.zinc[500] }}>
                <View className="m-5">
                    <Text className="text-white text-xl font-semibold">Are you sure you want to create this goal?</Text>

                    <View className="mt-8 mb-8 justify-center items-center">
                        <SavingsCard item={newData} />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigate('savings', { newData: newData })}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#303551', '#342d46']}
                            className="h-12 px-5 mb-5 items-center justify-center rounded-2xl"
                        >
                            <Text className="text-[#facad0] text-base font-semibold">Confirm</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleClose}
                    >
                        <View
                            className="bg-[#303551] h-12 px-5 items-center justify-center rounded-2xl"
                        >
                            <Text className="text-red-600 text-base font-semibold">Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}