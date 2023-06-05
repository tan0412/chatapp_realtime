import messaging from '@react-native-firebase/messaging';

export const getFCMToken = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().getToken()
    }catch(err) {
        console.error(err);
    }
}

export const NotificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      
      });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Received background message', remoteMessage);
      
        // Xử lý tin nhắn nền tại đây
      
        return Promise.resolve();
      
      })
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            }
          })
}