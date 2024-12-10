import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native'
import React from 'react'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { deliveryLogin } from '@service/auth/authService'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import { screenHeight } from '@utils/Scaling'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CustomInput from '@components/ui/CustomInput'
import Icon from 'react-native-vector-icons/Ionicons'
import Flash from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomButton from '@components/ui/CustomButton'

interface LoginResponse {
    success: boolean;
    message?: string;
}
const DeliveryLogin = () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [secureEntry, setSecureEntry] = React.useState(true);


    const handleLogin = async () => {
        setLoading(true)
        try {

            await deliveryLogin(email, password)
                .then((res: LoginResponse) => {
                    if (res.success)
                        resetAndNavigate("DeliveryDashboard")
                    else
                        Alert.alert(res.message || "Something went wrong")
                }).catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <CustomSafeAreaView>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode='on-drag'
                >
                    <View style={styles.container}>
                        <View style={styles.lottieContainer}>
                            <LottieView autoPlay loop source={require('@assets/animations/delivery_man.json')} style={styles.lottie} />
                        </View>
                        <CustomText variant='h3' fontFamily={Fonts.Bold} style={styles.text}>
                            Delivery Partner Login
                        </CustomText>
                        <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.text}>
                            Faster than Flash
                            <Flash name='lightning-bolt' size={RFValue(18)} color='#f8890e' style={{ marginLeft: 10 }} />
                        </CustomText>

                        <CustomInput
                            onChangeText={setEmail}
                            value={email}
                            left={<Icon name='mail' size={RFValue(18)} color='#f8890e' style={{ marginLeft: 10 }} />}
                            placeholder='Enter Your Email'
                            inputMode='email'
                            right={false}
                        />
                        <CustomInput
                            onChangeText={setPassword}
                            value={password}
                            left={<Icon name='lock-open' size={RFValue(18)} color='#f8890e' style={{ marginLeft: 10 }} />}
                            placeholder='Enter Your Passwword'
                            secureTextEntry={secureEntry}
                            right={password && <TouchableOpacity style={{ marginRight: 10 }}
                                onPress={() => {
                                    setSecureEntry((prev: any) => !prev);
                                }}>
                                <Icon
                                    name='eye'
                                    size={22}
                                    color='#f8890e'
                                />
                            </TouchableOpacity>}
                        />
                        <CustomButton
                            disabled={email.length < 1 || password.length < 6}
                            onPress={handleLogin}
                            loading={loading}
                            title='Login'

                        />


                    </View>

                </ScrollView>
            </CustomSafeAreaView>
        </View>
    )
}

export default DeliveryLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    lottie: {
        marginTop: 20,
        height: '100%',
        width: '100%',
    },
    lottieContainer: {
        height: screenHeight * 0.12,
        width: '100%',
        marginBottom: 20,
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8,
        color: 'black'
    }
})