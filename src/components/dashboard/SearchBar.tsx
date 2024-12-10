import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors, Fonts } from '@utils/Constants'
import RollingBar from 'react-native-rolling-bar'
import CustomText from '@components/ui/CustomText'

const SearchBar: FC = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Icon name='search' size={RFValue(20)} color={Colors.text} />
            <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search milk</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search butter</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search chips</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search groceries</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search sweets</CustomText>
                <CustomText variant='h6' fontFamily={Fonts.Medium}>Search dal,spicies</CustomText>
            </RollingBar>
            <View style={styles.divider} />
            <Icon name='mic' size={RFValue(20)} color={Colors.text} />
        </TouchableOpacity>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f7',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: Colors.border,
        marginTop: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        overflow: 'hidden',

    },
    textContainer: {
        width: '90%',
        paddingLeft: 10,
        height: 50,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: "#ddd",
        marginHorizontal: 10
    }
})