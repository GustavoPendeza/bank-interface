import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface Props {
    color: string;
    selectedColor: string | null;
    setColor: (arg: string) => void;
    progressColor: string;
    setProgressColor: (arg: string) => void;
}

export function ColorSelect({ color, selectedColor, setColor, progressColor, setProgressColor }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                setColor(color)
                setProgressColor(progressColor)
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 0.25 }}
                end={{ x: 0.5, y: 1 }}
                colors={[color, color, progressColor]}
                className={`h-14 w-14 rounded-2xl ${selectedColor === color ? 'border-2 border-blue-400' : null}`}
            >
            </LinearGradient>
        </TouchableOpacity>
    )
}