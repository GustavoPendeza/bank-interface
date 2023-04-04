import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Deal {
    store: string;
    logo: string;
    discount: number;
}

interface Props {
    item: Deal;
}

export default function DealCard({ item }: Props) {
    return (
        <View className='mx-5 px-4 py-3 border-2 border-[#303453] rounded-2xl'>

            <View className='flex-row items-center mb-4'>
                <Image
                    source={{ uri: `${item.logo}` }}
                    className="h-16 w-16 rounded-xl"
                />

                <View className='ml-5'>
                    <Text className='text-white text-lg'>{item.store}</Text>

                    <View className='flex-row mt-1'>
                        <Text className='text-zinc-400 text-base'>
                            Up to
                            <Text className='text-white text-base'> {item.discount}% </Text>
                            off
                        </Text>

                    </View>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#303551', '#342d46']}
                    className="h-12 px-5 items-center justify-center rounded-2xl"
                >
                    <Text className="text-[#facad0] text-base font-semibold">Continue to the store</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}