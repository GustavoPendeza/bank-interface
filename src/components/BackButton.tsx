import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from "tailwindcss/colors";

export function BackButton() {
    const { goBack } = useNavigation()

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={goBack} className="absolute left-5">
            <MaterialIcons name="keyboard-backspace" size={20} color={colors.white} />
        </TouchableOpacity>
    )
}