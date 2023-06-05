import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import ContactCard from './ContactCard';
import { normalize } from '../../utils/responsive';
import { CommonActions } from '@react-navigation/native';
import axiosClient from '../../api/axiosClient';
import getToken from '../../data/AsyncStorage';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';

type Contact = {
  _id: string;
  name: string;
  picture: any;
  phone?: string;
};

type ContactSection = {
  title: string;
  data:Contact[];
};

type ItemProps = {
  title: string;
};

const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ContactScreen = ({navigation}: any) => {
  const [data, setData] = useState<Contact[]>([])
  const [selected, setSelected] = useState<Contact | null>(null);
  const [contact, setContact] = useState<ContactSection[]>([])
  const handleNavMessage = (receiverId: string, picture: string, name: string) => {
    navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_MESSAGE, params: {recipientId : receiverId, picture: picture, name: name}}))
  }
  
  useEffect(() => {
    const fetchApi = async () => {
      try{
      const token = await getToken()
      await axiosClient.get('/user/list-friend', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then((res) => {setData(res)})
    }catch(err) {
      console.error(err)
    }}
    fetchApi()
  },[data])

  useEffect (() => {
    const sortContacts = data?.sort((a,b) => a.name.localeCompare(b.name))
    const initals: string[]= [...new Set(sortContacts?.map((contact) => contact.name.charAt(0)))]
    const groupContacts = initals.map ((inital) => ({
      title: inital.toUpperCase(),
      data: sortContacts?.filter((contact) => contact.name.charAt(0) === inital)
    }))
    setContact(groupContacts)
  }, [data])

  
  const renderItem = ({ item }: { item: Contact }) => 
    <ContactCard _id= {item._id} name= {item.name.toUpperCase()} uriImage={item.picture} action={handleNavMessage}  />  

  const renderSectionHeader = ({ section: { title } }: { section: ContactSection }) => (
    <Item title={title} />
  );

  const handleNavFriend = () => {
    navigation.dispatch(CommonActions.navigate({name: 'FriendRequestScreen'}))
  }

  return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.header} onPress={() => {handleNavFriend()}}>
      <Text style={styles.textFriend}>Lời mời kết bạn</Text>
  </TouchableOpacity>
  <View style={styles.sectionlist}>  
    <SectionList
      sections={contact}
      keyExtractor={(item, index) => item._id + index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
    </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F2F2F2',
    padding: 8,
    marginVertical: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    height: 50,
    backgroundColor: '#F2851E',
    justifyContent:'center',
  },
  textFriend: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: normalize(20)
  }
});

export default ContactScreen