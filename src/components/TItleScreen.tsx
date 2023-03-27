import { Text, View } from "react-native";
import { BackButton } from "./BackButton";

interface Props {
    title: string;
}

export function TitleScreen({ title }: Props) {
    return (
        <View className="flex-row mt-12 px-5 items-center justify-center">
            <BackButton />
            <Text className="text-white text-xl">{title}</Text>
        </View>
    )
}