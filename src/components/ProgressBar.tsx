import { useEffect } from 'react';
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { generateProgressPercentage } from '../utils/generate-percentage';

interface Props {
    money: number;
    goal: number;
}

export function ProgressBar({ money, goal }: Props) {
    const sharedValue = useSharedValue(generateProgressPercentage(money, goal));

    const style = useAnimatedStyle(() => {
        return {
            width: `${sharedValue.value}%`,
            backgroundColor: '#facad0'
        }
    })

    useEffect(() => {
        sharedValue.value = withTiming(generateProgressPercentage(money, goal))
    }, [money, goal])

    return (
        <View className="w-1/2 h-3 rounded-xl bg-zinc-500 my-3">
            <Animated.View
                className="h-full rounded-xl"
                style={style}
            >
            </Animated.View>
        </View>
    )
}