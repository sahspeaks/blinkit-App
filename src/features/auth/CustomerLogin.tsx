import { Alert, Animated, Image, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import { resetAndNavigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts, lightColors } from '@utils/Constants'
import CustomInput from '@components/ui/CustomInput'
import CustomButton from '@components/ui/CustomButton'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import { RFValue } from 'react-native-responsive-fontsize'
import { customerLogin } from '@service/auth/authService'
// import LinearGradient from 'react-native-linear-gradient'

// const bottomColor = [...lightColors].reverse()
const CustomerLogin: FC = () => {

    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [gestureSequence, setGestureSequence] = React.useState<string[]>([])
    const keyboardOffsetHeight = useKeyboardOffsetHeight();



    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {

        if (keyboardOffsetHeight == 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.92,
                duration: 500,
                useNativeDriver: true
            }).start()
        }

    }, [keyboardOffsetHeight])

    const handleLogin = async () => {
        Keyboard.dismiss()
        setLoading(true)
        try {
            console.log(phoneNumber)
            const customerData = await customerLogin(phoneNumber)
            if (!customerData.success) {
                Alert.alert(customerData.message)
                return
            }
            console.log("Login success", customerData)
            resetAndNavigate('ProductDashboard')
            //We will implement this otp verifaication later
            // resetAndNavigate('OTPVerification', { phoneNumber })
        } catch (error) {
            Alert.alert("Sorry we are unable to login")
        } finally {
            setLoading(false)
        }
    }

    const handleGesture = ({ nativeEvent }: any) => {
        // console.log(nativeEvent)
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent;
            let direction = ''
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left'
            } else {
                direction = translationY > 0 ? 'down' : 'up'

            }
            console.log(translationX, translationY)
            console.log(direction)
            const newSequence = [...gestureSequence, direction].slice(-5);
            setGestureSequence(newSequence)
            if (newSequence.join(' ') === 'right right down left up') {
                setGestureSequence([])
                resetAndNavigate('DeliveryLogin')
            }
        }

    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <GestureHandlerRootView style={styles.container}>
                <View style={styles.container}>
                    <CustomSafeAreaView >
                        <ProductSlider />
                        <PanGestureHandler onHandlerStateChange={handleGesture}>
                            <Animated.ScrollView
                                bounces={false}
                                keyboardDismissMode='on-drag'
                                keyboardShouldPersistTaps='handled'
                                contentContainerStyle={styles.subContainer}
                                style={{ transform: [{ translateY: animatedValue }] }}
                            >
                                {/* <LinearGradient colors={bottomColor} style={styles.gradient} /> */}
                                <View style={styles.content}>
                                    <Image source={require('@assets/images/logo.png')} style={styles.logo} />
                                    <CustomText variant='h4' fontFamily={Fonts.SemiBold}>India's last minute app</CustomText>
                                    <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>Login to continue</CustomText>
                                    <CustomInput
                                        onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)) }}
                                        onClear={() => setPhoneNumber('')}
                                        value={phoneNumber}
                                        left={
                                            <CustomText
                                                style={styles.phoneText}
                                                variant='h6'
                                                fontFamily={Fonts.SemiBold}
                                            >+ 91
                                            </CustomText>
                                        }
                                        placeholder='Enter your phone number'
                                        inputMode='numeric'
                                    />
                                    <CustomButton title='Continue' onPress={() => handleLogin()} disabled={phoneNumber?.length != 10} loading={loading} />
                                </View>
                            </Animated.ScrollView>
                        </PanGestureHandler>
                    </CustomSafeAreaView>
                    <View style={styles.footer}>
                        <CustomText
                            fontSize={RFValue(6)}
                        >
                            By Continuing, you agree to our Terms of Service & Privacy Policies
                        </CustomText>
                    </View>
                </View>
            </GestureHandlerRootView>
        </View>
    )
}

export default CustomerLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,

    },
    text: {
        marginTop: 10,
        marginBottom: 25,
        opacity: 0.8,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        borderTopColor: Colors.border,
        borderTopWidth: 1,
        borderRightColor: Colors.border,
        borderRightWidth: 1,
        borderLeftColor: Colors.border,
        borderLeftWidth: 1,
    },
    logo: {
        height: 60,
        width: 60,
        borderRadius: 20,
        marginVertical: 10
    },
    phoneText: {
        marginLeft: 10
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 15,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fc',
        width: '100%'
    },
    // gradient: {
    //     paddingTop: 60,
    //     width: '100%'
    // }
})