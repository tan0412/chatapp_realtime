import { StyleSheet } from 'react-native';
import { Text, View} from 'react-native'
import { Avatar } from 'react-native-elements';
import { normalize } from '../../../utils/responsive';

type AvatarHeaderProps = {
    name: string;
    picture: string;
    isAction: string;
}
const AvatarHeader = (props : AvatarHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                rounded
                size={'small'}
                source={{ uri: `data:image/png;base64,${props.picture}` }}
                containerStyle={{ marginHorizontal: normalize(20) }}
              >
                {props.isAction === 'online' && (
                    <View style={styles.active}/>
                )}
              </Avatar>
               
              <Text style={styles.text}>
                {props.name}
              </Text>
            </View>
      </View>
    );
  };

  export default AvatarHeader

  const styles = StyleSheet.create({
    container: {
        height: normalize(50),
        backgroundColor: '#fff',
        justifyContent:'center',
        
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    active: {
      position: 'absolute',
      top: 0,
      right: normalize(0),
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: '#4CAF50'
  }
  })