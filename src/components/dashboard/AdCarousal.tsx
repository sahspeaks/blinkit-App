import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Carousel from 'react-native-reanimated-carousel'
import ScalePress from '@components/ui/ScalePress'

const AdCarousal: React.FC<{ adData: any }> = ({ adData }) => {
    const progressValue = useSharedValue(0)
    const baseOptions = {
        vertical: false,
        width: Math.round(screenWidth),
        height: Math.round(screenWidth * 0.5),
    }
    const width = Dimensions.get('window').width;

    return (
        <View style={{ left: -20, marginVertical: 20 }}>
            <Carousel
                loop
                {...baseOptions}
                pagingEnabled
                autoPlay={true}
                snapEnabled
                autoPlayInterval={3000}
                // mode='parallax'
                data={adData}
                // modeConfig={{
                //     parallaxScrollingScale: 0.94,
                //     parallaxScrollingOffset: 0,
                // }}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => {
                    progressValue.value = index
                }}
                renderItem={({ item, index }: any) => (
                    <ScalePress style={styles.imageContainer}>
                        <Image
                            source={item}
                            style={styles.img}
                        />
                    </ScalePress>
                )}
            />
        </View>
    )
}

export default AdCarousal

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: "100%",
        paddingHorizontal: 10,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    }
})

