import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface Props {
    color: string;
    progressColor: string;
}

export function ColorSelect({color, progressColor}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => { }}
        >
            <LinearGradient
                start={{ x: 0, y: 0.25 }}
                end={{ x: 0.5, y: 1 }}
                colors={[color, color, progressColor]}
                className="h-14 w-14 rounded-2xl"
            >
            </LinearGradient>
        </TouchableOpacity>
    )
}