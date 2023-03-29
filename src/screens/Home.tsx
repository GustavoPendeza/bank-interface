import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from 'tailwindcss/colors';
import { Services } from "../components/Services";
import { Transactions } from "../components/Transactions";
import { FormatNumber } from "../utils/format-number";

interface Service {
    name: string;
    icon: string;
    color: string;
    route: any;
}

interface Transaction {
    icon: string;
    color: string;
    name: string;
    date: string;
    cost: boolean;
    money: number;
}

interface Data {
    id: number;
    user: string;
    balance: number;
    services: Service[];
    transactions: Transaction[];
}

interface Params {
    total: number;
    credit: number;
}

export function Home() {
    const data: Data = require('../data/home.json');
    const route = useRoute();
    const [refresh, setRefresh] = useState(false);
    const [invoice, setInvoice] = useState(0);

    function renderService({ item }: ListRenderItemInfo<Service>) {
        return <Services item={item} balance={data.balance} invoice={invoice} />
    }

    function renderTransaction({ item }: ListRenderItemInfo<Transaction>) {
        return <Transactions item={item} />
    }

    useEffect(() => {
        if (route.params) {
            let { total, credit } = route.params as Params;

            data.balance = data.balance - total;

            setInvoice(credit);

            total = 0;
            credit = 0;

            setRefresh(true);
        }
    }, [route.params])

    useEffect(() => {
        setRefresh(false)
    }, [refresh])

    return (
        <View className="flex-1 bg-background">

            <ScrollView showsVerticalScrollIndicator={false} className="pt-12">

                <View className="flex-row justify-between px-5">
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: 'https://avatars.githubusercontent.com/u/53589614?v=4' }}
                            className="h-14 w-14 rounded-full"
                        />
                        <View className="pl-3 gap-2">
                            <Text className="text-white text-base font-semibold">{data.user}</Text>
                            <Text className="text-zinc-500">ID: {data.id}</Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => { }}
                        >
                            <Ionicons name="barcode-outline" size={24} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => { }}
                        >
                            <View>
                                <Ionicons name="notifications" size={22} color={colors.white} />
                                <View className="absolute bg-red-600 h-2.5 w-2.5 rounded-full top-0.5 right-0.5"></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-5">
                    <View className="w-full bg-[#2a2c3e] mt-8 mb-6 py-5 items-center justify-center rounded-3xl overflow-hidden">
                        <View className="absolute h-16 w-16 -left-7 bg-[#f5e4ea] rounded-full"></View>
                        <View className="absolute h-28 w-28 -right-9 -bottom-9 bg-[#f5e4ea] opacity-30 rounded-full"></View>
                        <View className="absolute h-2.5 w-2.5 left-16 top-10 bg-[#f5e4ea] rounded-full"></View>
                        <View className="absolute h-2 w-2 left-24 bottom-14 bg-[#f5e4ea] opacity-20 rounded-full"></View>
                        <View className="absolute h-4 w-4 right-16 top-4 bg-[#f5e4ea] opacity-30 rounded-full"></View>
                        <View className="absolute h-10 w-10 right-10 bottom-8 bg-[#f5e4ea] rounded-full"></View>

                        <Text className="text-zinc-500 text-base">Your balance</Text>

                        <Text className="text-white text-4xl font-semibold mt-3 mb-5">
                            ${FormatNumber(data.balance)}
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => { }}
                        >
                            <Ionicons name="add-circle" size={48} color='#facad0' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row px-5 justify-between items-center">
                    <Text className="text-white text-xl font-semibold mb-4">
                        Services
                    </Text>

                    <MaterialIcons name="navigate-next" size={20} color={colors.white} />
                </View>

                <FlatList
                    keyExtractor={(item, index) => item.name + index}
                    data={data.services}
                    renderItem={renderService}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <View className="flex-row mt-10 px-5 justify-between items-center">
                    <Text className="text-white text-xl font-semibold mb-4">
                        Today transactions
                    </Text>

                    <MaterialIcons name="navigate-next" size={20} color={colors.white} />
                </View>

                <FlatList
                    className="mb-32"
                    keyExtractor={(item, index) => item.name + index}
                    data={data.transactions}
                    renderItem={renderTransaction}
                    scrollEnabled={false}
                    horizontal={false}
                />

            </ScrollView>

        </View>
    )
}