import { FlatList, ListRenderItemInfo, ScrollView, Text, View } from 'react-native';
import DealCard from '../components/DealCard';

interface Deal {
    store: string;
    logo: string;
    discount: number;
}

interface Data {
    deals: Deal[];
}

export function Deals() {
    const data: Data = require('../data/deals.json');

    function renderItem({ item }: ListRenderItemInfo<Deal>) {
        return <DealCard item={item} />
    }

    return (
        <View className='flex-1 bg-background'>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View className='mt-12 items-center justify-center'>
                    <Text className="text-white text-xl">Deals</Text>
                </View>

                <Text className="mt-7 mx-7 text-white text-lg">
                    Deals of the week
                </Text>

                <FlatList
                    className='mt-5 mb-24'
                    keyExtractor={(item, index) => item.store + index}
                    data={data.deals}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => {
                        return <View className='mt-5'></View>
                    }}
                />

            </ScrollView>

        </View>
    )
}