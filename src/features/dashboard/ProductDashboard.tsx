import { StyleSheet, Text, View, Animated as RNAnimated, StatusBar, Platform, TouchableOpacity } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation';
import { NoticeHeight, screenHeight } from '@utils/Scaling';
import { SafeAreaView } from 'react-native-safe-area-context';
import Visuals from './Visuals';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, useCollapsibleContext, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchbar from './StickySearchbar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';


const NOTICE_HEIGHT = -(NoticeHeight + 12)

const ProductDashboard: FC = () => {

    const { scrollY, expand } = useCollapsibleContext();
    const previousScrollY = React.useRef<number>(0);
    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingUp = scrollY.value < previousScrollY.current && scrollY.value > 180;
        const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 })
        const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 })

        previousScrollY.current = scrollY.value;
        return {
            opacity,
            transform: [{ translateY }]
        }
    })
    const { top } = useSafeAreaInsets();
    const noticePostion = React.useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current
    const slideUp = () => {
        RNAnimated.timing(noticePostion, {
            toValue: NOTICE_HEIGHT,
            duration: 1200,
            useNativeDriver: false
        }).start()
    }
    const slideDown = () => {
        RNAnimated.timing(noticePostion, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false
        }).start()
    }
    useEffect(() => {
        slideDown()
        const timeoutId = setTimeout(() => {
            slideUp()
        }, 3500)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            < NoticeAnimation noticePostion={noticePostion} >
                <>
                    <Visuals />
                    <SafeAreaView style={{ paddingTop: Platform.OS == 'ios' ? top : top + 12 }} />
                    {/* <View style={{ paddingTop: Platform.OS == 'ios' ? top : top + 12 }}> */}


                    <Animated.View style={[styles.backToTopContainer, backToTopStyle]}>
                        <TouchableOpacity
                            onPress={() => {
                                scrollY.value = 0
                                expand()
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                        >
                            <Icon name='arrow-up-circle-outline' size={RFValue(12)} color="white" />
                            <CustomText variant='h9' style={{ color: 'white' }} fontFamily={Fonts.SemiBold} >Scroll Up</CustomText>
                        </TouchableOpacity>
                    </Animated.View>


                    <CollapsibleContainer style={styles.panelContainer}>
                        <CollapsibleHeaderContainer containerStyle={styles.transparentHeader}>
                            <AnimatedHeader
                                showNotice={() => {
                                    slideDown()
                                    const timeoutId = setTimeout(() => {
                                        slideUp()
                                    }, 3500)
                                    return () => {
                                        clearTimeout(timeoutId)
                                    }
                                }}
                            />
                            <StickySearchbar />
                        </CollapsibleHeaderContainer>
                        <CollapsibleScrollView
                            nestedScrollEnabled
                            style={styles.panelContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <Content />
                            <View style={{ backgroundColor: '#f8f8f8', padding: 20 }}>
                                <CustomText fontSize={RFValue(32)} fontFamily={Fonts.Bold} style={{ opacity: 0.2 }}>
                                    India's Last Minute App  🥭
                                </CustomText>
                                <CustomText fontFamily={Fonts.Bold} style={{ marginTop: 10, marginBottom: 100, opacity: 0.2 }}>
                                    Made with ❤️ by Abhishek
                                </CustomText>
                            </View>
                        </CollapsibleScrollView>

                    </CollapsibleContainer>
                    {/* </View> */}
                </>
            </NoticeAnimation >
        </View>
    )
}
const styles = StyleSheet.create({
    panelContainer: {
        flex: 1,

    },
    transparentHeader: {
        backgroundColor: 'transparent',
    },
    backToTopContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: Platform.OS == 'ios' ? screenHeight * 0.18 : 130,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        zIndex: 1000,
    }
})

export default withCollapsibleContext(ProductDashboard)

