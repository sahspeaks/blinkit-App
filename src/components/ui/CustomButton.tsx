import { Colors, Fonts } from "@utils/Constants";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";


interface CustomButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean
}

const CustomButton: FC<CustomButtonProps> = ({
    title,
    onPress,
    disabled,
    loading
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: disabled ? Colors.disabled : Colors.secondary }]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}

        >

            {loading ? <ActivityIndicator size={20} color='white' />
                : <CustomText
                    variant="h6"
                    style={styles.text}
                    fontFamily={Fonts.SemiBold}
                >
                    {title}

                </CustomText>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
        width: '100%'
    },
    text: {
        color: '#fff'
    }
})

export default CustomButton