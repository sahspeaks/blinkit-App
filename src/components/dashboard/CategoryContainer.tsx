// import { Image, StyleSheet, Text, View } from 'react-native'
// import React, { FC } from 'react'
// import ScalePress from '@components/ui/ScalePress'
// import { navigate } from '@utils/NavigationUtils'
// import CustomText from '@components/ui/CustomText'
// import { Fonts } from '@utils/Constants'

// const CategoryContainer: FC<{ data: any[] }> = ({ data }) => {


//     const renderItems = (items: any[]) => {
//         return (
//             <>
//                 {
//                     items.map((item, index) => {
//                         return (
//                             <ScalePress key={index} onPress={() => navigate("ProductList", { category: item.name })} style={styles.item}>
//                                 <View style={styles.imageContainer}>
//                                     <Image source={item.image} style={styles.image} />
//                                 </View>
//                                 <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.text}>{item.name}</CustomText>
//                             </ScalePress>
//                         )
//                     }

//                     )
//                 }
//             </>
//         )
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.row}>
//                 {renderItems(data?.slice(0, 4))}
//             </View>
//             <View style={styles.row}>
//                 {renderItems(data?.slice(4))}
//             </View>
//         </View>
//     )
// }

// export default CategoryContainer

// const styles = StyleSheet.create({
//     container: {
//         marginVertical: 15,
//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'baseline',
//         marginBottom: 25,
//     },
//     text: {
//         alignItems: 'center',
//     },
//     item: {
//         width: '22%',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     imageContainer: {
//         width: '100%',
//         height: 80,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         padding: 6,
//         backgroundColor: '#e5f3f3',
//         marginBottom: 8
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'contain'
//     },
// })
import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'

const CategoryContainer: FC<{ data: any[] }> = ({ data }) => {
    const renderItems = (items: any[]) => {
        return items.map((item, index) => (
            <ScalePress
                key={index}
                onPress={() => navigate("ProductList", { category: item.name })}
                style={styles.item}
            >
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <CustomText
                    variant='h8'
                    fontFamily={Fonts.Medium}
                    style={styles.text}
                >
                    {item.name}
                </CustomText>
            </ScalePress>
        ));
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {renderItems(data?.slice(0, 4))}
            </View>
            <View style={styles.row}>
                {renderItems(data?.slice(4))}
            </View>
        </View>
    )
}

export default CategoryContainer

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Changed from 'baseline' to 'center'
        marginBottom: 25,
    },
    text: {
        textAlign: 'center', // Ensure text is centered
        marginTop: 8,
    },
    item: {
        width: '22%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: '#e5f3f3',
        marginBottom: 8
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
})