import React from "react";
import {Image, StyleSheet, TouchableOpacity} from 'react-native'

type ImagePickerAvatarProps = {
    uri: string | undefined,
    onPress: () => void,
    picture: string
}
const ImagePickerAvatar = (props: ImagePickerAvatarProps) => {
    return (
        <TouchableOpacity style={styles.avt} onPress={props.onPress}>
        <Image source={{uri:props.uri ? props.uri:  props.picture }} style={styles.avt} />
      </TouchableOpacity>
    )
}

export default ImagePickerAvatar;

const styles = StyleSheet.create({
    avt: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf:'center'
    }
})

