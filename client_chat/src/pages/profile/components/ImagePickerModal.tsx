import React from "react";
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native'
import IconLibrary from '../../../shared/icons/ic_library.svg'
import IconCamera from '../../../shared/icons/icon_camera.svg'

type ImagePickerModalProps = {
    isVisible: boolean,
    onClose: () => void,
    onImageLibrary: () => void,
    onCamera: () => void,

}
const ImagePickerModal = (props: ImagePickerModalProps) => {
    return (
       <Modal 
            visible={props.isVisible}
            onRequestClose={props.onClose}
            style={[styles.modal]}>

            <View style={styles.view}>
            <TouchableOpacity onPress={props.onCamera}>
                <IconCamera />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onImageLibrary}>
                <IconLibrary />
            </TouchableOpacity>

            </View>
            </Modal>
            
       
    )
}

export default ImagePickerModal;

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})

