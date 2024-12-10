import { View, Text, StyleSheet, Image, Alert, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Logo from "@assets/images/splash_logo.jpeg"
import Geolocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { jwtDecode } from 'jwt-decode'
import { refetchUser, refreshAccessToken } from '@service/auth/authService'

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    locationProvider: 'auto',
    enableBackgroundLocationUpdates: true,
})

interface DecodedToken {
    exp: number;
}

const SplashScreen = () => {


    const { user, setUser } = useAuthStore();

    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken') as string;
        const refreshToken = tokenStorage.getString('refreshToken') as string;
        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)
            const currentTime = Date.now() / 1000
            if (decodedRefreshToken.exp < currentTime) {
                resetAndNavigate('CustomerLogin')
                Alert.alert("Your session has expired, please login again")
                return false
            }
            if (decodedAccessToken.exp < currentTime) {
                try {
                    refreshAccessToken()
                    await refetchUser(setUser)
                } catch (error) {
                    console.log(error)
                    Alert.alert("Erroor refreshing token, please login again")
                    return false
                }
            }

            if (user?.role === 'customer') {
                resetAndNavigate('ProductDashboard')
            } else {
                resetAndNavigate('DeliveryDashboard')
            }

            return true
        }
        resetAndNavigate('CustomerLogin')
        return false
    }

    React.useEffect(() => {
        const fetchLocation = async () => {
            try {
                Geolocation.requestAuthorization();
                tokenCheck()

            } catch (error) {
                Alert.alert("Sorry we are unable to get your location")
            }
        }
        const timeoutId = setTimeout(fetchLocation, 1000)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <Image source={Logo} style={styles.logo} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    logo: {
        width: screenWidth * 0.7,
        height: screenHeight * 0.7,
        resizeMode: 'contain',
    }
})
export default SplashScreen