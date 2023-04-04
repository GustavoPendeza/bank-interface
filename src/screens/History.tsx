import { FlatList, ListRenderItemInfo, ScrollView, Text, View } from 'react-native';
import { Transactions } from '../components/Transactions';

interface History {
    icon: string;
    color: string;
    name: string;
    date: string;
    cost: boolean;
    money: number;
}

interface Data {
    today: History[];
    yesterday: History[];
    september: History[];
}

export function History() {
    const data: Data = require('../data/history.json');

    function renderItem({ item }: ListRenderItemInfo<History>) {
        return <Transactions item={item} />
    }

    return (
        <View className='flex-1 bg-background'>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View className='mt-12 items-center justify-center'>
                    <Text className="text-white text-xl">Your history</Text>
                </View>

                <Text className="mt-7 mx-7 text-white text-lg">
                    Today
                </Text>

                <FlatList
                    className='flex-initial mt-5 mb-10'
                    keyExtractor={(item, index) => item.date + index}
                    data={data.today}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />

                <Text className="mx-7 text-white text-lg">
                    Yesterday
                </Text>

                <FlatList
                    className='flex-initial mt-5 mb-10'
                    keyExtractor={(item, index) => item.date + index}
                    data={data.yesterday}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />

                <Text className="mx-7 text-white text-lg">
                    September
                </Text>

                <FlatList
                    className='flex-initial mt-5 mb-20'
                    keyExtractor={(item, index) => item.date + index}
                    data={data.september}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />

        </ScrollView>

        </View>
    )
}