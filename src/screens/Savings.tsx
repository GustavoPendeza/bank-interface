import { FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "../components/ProgressBar";
import { SavingsCard } from "../components/SavingsCard";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FormatNumber } from "../utils/format-number";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TitleScreen } from "../components/TItleScreen";

interface Params {
    newData: Goal | null;
}

interface Goal {
    name: string;
    money: number;
    goal: number;
    color: string;
    progressColor: string;
}

interface Data {
    goals: Goal[];
}

export function Savings() {
    const data: Data = require('../data/savings.json');
    const route = useRoute();
    let { newData } = route.params as Params;
    const { navigate } = useNavigation();
    const [refresh, setRefresh] = useState(false);
    const plusGoal = true;
    let totalMoney = 0;
    let totalGoal = 0;

    function renderItem({ item }: ListRenderItemInfo<any>) {
        if (item.plusGoal) {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    className='h-40 w-40 items-center justify-center'
                    onPress={() => navigate('createGoal')}
                >
                    <Ionicons name="add-circle" size={48} color='#facad0' />
                    <Text className="text-[#facad0] text-lg mt-1">Add new goal</Text>
                </TouchableOpacity>
            )
        }
        return <SavingsCard item={item} />
    }

    useEffect(() => {
        if (newData) {
            data.goals.push(newData)
            newData = null
        }

        setRefresh(true)
    }, [newData])

    useEffect(() => {
        setRefresh(false)
    }, [refresh])

    return (
        <View className="flex-1 bg-background">

            <TitleScreen title="Savings online" />

            <Text className="mt-7 mx-7 text-zinc-500 text-base">
                Your savings
            </Text>

            <View className="mt-7 items-center">
                <>
                    {
                        data.goals.map((goal) => {
                            totalMoney = totalMoney + goal.money;
                            totalGoal = totalGoal + goal.goal;
                        })
                    }
                </>

                <Text className="text-white text-5xl mx-10" numberOfLines={1}>${FormatNumber(totalGoal)}</Text>

                <ProgressBar money={totalMoney} goal={totalGoal} />

                <Text className="text-zinc-500 text-sm">
                    ${FormatNumber(totalMoney)} /
                    ${FormatNumber(totalGoal)}
                </Text>
            </View>

            <FlatList
                className="mx-6 mt-10"
                keyExtractor={(item: any, index) => item.name + index}
                data={[...data.goals, { plusGoal }]}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View className="h-6"></View>
                    )
                }}
            />

        </View>
    )
}