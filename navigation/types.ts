import { type NativeStackNavigationProp, type NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Param types for routes within "RootStack" navigator.
 *
 * - `undefined` means none required,
 * - `T | undefined ` means T is optional
 */
export type RootStackParamList = {
  Home: undefined;
  ScanQR: undefined;
};

/**
 * Props types for routes within "RootStack" navigator.
 */
export type RootStackProps<ParamsTypeKey extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  ParamsTypeKey
>;

/**
 * Type of the navigation object within the props for routes within "RootStack" navigator.
 * This can be convenient when passing the navigation object around, e.g. to subcomponents.
 */
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
