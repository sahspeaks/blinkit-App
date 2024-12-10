import { View, Text, StatusBar } from 'react-native'
import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '@features/auth/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@utils/NavigationUtils'
import CustomerLogin from '@features/auth/CustomerLogin'
import DeliveryLogin from '@features/auth/DeliveryLogin'
import ProductDashboard from '@features/dashboard/ProductDashboard'
import DeliveryDashboard from '@features/delivery/DeliveryDashboard'


const Stack = createNativeStackNavigator()


const Navigation: FC = () => {
    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    initialRouteName='SplashScreen'
                    screenOptions={{
                        headerShown: false,

                    }}
                >
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />

                    <Stack.Screen name="ProductDashboard" component={ProductDashboard} />

                    <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />

                    <Stack.Screen
                        options={{
                            animation: 'fade'
                        }}
                        name="CustomerLogin" component={CustomerLogin}
                    />
                    <Stack.Screen
                        options={{
                            animation: 'fade'
                        }}
                        name="DeliveryLogin" component={DeliveryLogin}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>

    )
}

export default Navigation