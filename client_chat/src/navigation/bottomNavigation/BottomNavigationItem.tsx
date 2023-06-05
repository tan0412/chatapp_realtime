import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconChat from '../../shared/icons/IconChat';
import IconContact from '../../shared/icons/IconContact';
import * as colors from '../../shared/theme/colors';

interface BottomNavigationItemProps {
  isActive: boolean;
  name: String;
}

const BottomNavigationItem = (props: BottomNavigationItemProps) => {
  
  const BottomNavigationIcon = () => {
    if (props.name === 'Chats') {
      return <IconChat isActive={props.isActive} />
    } else if (props.name ==='Contacts') {
      return <IconContact isActive={props.isActive} />
    } else {
      throw Error('Unknown tab');
    }
  };

  return (
    <View style={styles.itemStyle}>
      <BottomNavigationIcon />
      <Text style={[styles.textStyle, props.isActive? [styles.textInActive]: [styles.textNoActive] ]}>{props.name}</Text>
    </View>
  );
};

export default BottomNavigationItem;

const styles = StyleSheet.create({
  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 5,
    fontSize: 12,
  },
  textInActive: {
    color: '#339AF0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textNoActive: {
    color: '#828282'
  }
});
