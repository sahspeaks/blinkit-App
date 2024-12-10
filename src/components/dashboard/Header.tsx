import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAuthStore } from '@state/authStore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'



const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
    const { user, setUser } = useAuthStore();
    return (
        <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={0.8}>
                <CustomText fontFamily={Fonts.Bold} variant='h7' style={styles.text}>Delivery in</CustomText>
                <View style={styles.flexRowGap}>
                    <CustomText fontFamily={Fonts.Bold} variant='h2' style={styles.text}>
                        10 minutes
                    </CustomText>
                    <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                        <CustomText
                            fontSize={RFValue(7)}
                            fontFamily={Fonts.SemiBold}
                            style={{ color: '#3b4886' }}
                        > ⛈️ Rain</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.flexRow}>
                    <CustomText
                        variant='h6'
                        noOfLines={1}
                        fontFamily={Fonts.SemiBold}
                        style={styles.text2}
                    >
                        {user?.name || "Update Your Name"} - {user?.address || "Update Your Address"}
                    </CustomText>
                    <Icon name='menu-down' color='#fff' size={RFValue(20)} style={{ bottom: -1 }} />
                </View>

            </TouchableOpacity>
            <TouchableOpacity>
                <Icon2 name='user-circle' size={RFValue(28)} color='#fff' />
            </TouchableOpacity>
        </View>

    )
}

export default Header

const styles = StyleSheet.create({
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        // paddingTop: Platform.OS === 'android' ? 10 : 5,
        justifyContent: "space-between"
    },
    text: {
        color: '#fff'
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5

    },
    noticeBtn: {
        backgroundColor: '#e8eaf5',
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        bottom: -2
    },
    flexRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        width: '80%'
    },
    text2: {
        color: "#fff",
        width: '90%',
        textAlign: "center"
    }
})