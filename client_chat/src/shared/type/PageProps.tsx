import { RouteProp } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Action } from '@react-navigation/routers/lib/typescript/src/CommonActions';

export type PageProps = {
  navigation: NativeStackNavigationProp<{}>;
  route: RouteProp<{}>;
}
