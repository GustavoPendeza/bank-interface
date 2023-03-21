import { Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { generateProgressPercentage } from '../utils/generate-percentage';
import colors from 'tailwindcss/colors';
import { FormatNumber } from '../utils/format-number';

interface Goal {
    name: string;
    money: number;
    goal: number;
    color: string;
    progressColor: string;
}

interface Props {
    item: Goal;
}

export function SavingsCard({ item }: Props) {
    const percentage = generateProgressPercentage(item.money, item.goal);

    return (
        <View className='h-40 w-40 px-5 py-3 rounded-2xl' style={{ backgroundColor: item.color }}>
            <Text className='text-white text-lg' numberOfLines={1}>{item.name}</Text>

            <Text className="text-zinc-400 text-sm mt-2 mb-4">
                ${FormatNumber(item.money)} /
                ${FormatNumber(item.goal)}
            </Text>

            <CircularProgress
                value={percentage}
                valueSuffix={'%'}
                clockwise={false}
                radius={30}
                progressValueColor={colors.zinc[400]}
                progressValueFontSize={12}
                activeStrokeColor={item.progressColor}
                activeStrokeWidth={5}
                inActiveStrokeColor={colors.zinc[400]}
                inActiveStrokeWidth={3}
                duration={1000}
            />
        </View>
    )
}