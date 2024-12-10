import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useMemo } from 'react'
import { imageData } from '@utils/dummyData'
import AutoScroll from '@homielab/react-native-auto-scroll'
import { screenHeight, screenWidth } from '@utils/Scaling'

const ProductSlider = () => {


    const rows = useMemo(() => {
        const result = []
        for (let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i, i + 4))
        }
        return result
    }, [])

    return (
        <View pointerEvents='none'>
            <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
                <View style={styles.gridContainer}>
                    {rows.map((row, index) => (
                        <MemoizedRow key={index} row={row} rowIndex={index} />
                    ))}
                </View>
            </AutoScroll>
        </View>
    )
}


const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
    return (
        <View style={styles.row}>
            {row.map((image, index) => {
                const horizontalShift = (rowIndex % 2 === 0) ? -18 : 18
                return (
                    <View key={index} style={[styles.itemContainer, { transform: [{ translateX: horizontalShift }] }]}>
                        <Image source={image} style={styles.image} />
                    </View>
                )
            })}
        </View>
    )
}

const MemoizedRow = React.memo(Row);

export default ProductSlider

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 12,
        marginHorizontal: 10,
        width: screenWidth * 0.25,
        height: screenHeight * 0.15,
        backgroundColor: '#e9f7f8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    autoScroll: {
        position: 'absolute',
        zIndex: -2
    },
    gridContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'visible',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    }
})