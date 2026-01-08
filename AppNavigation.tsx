import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; 
import MaterialPrice from './screens/MaterialPrice';
import CalculationScreen from './screens/CalculationScreen';
import StateSSRScreen from './screens/StateSSRScreen';
import UserProfile from './screens/UserProfile';
import NearbySuppliersScreen from './screens/NearbySuppliersScreen';
import SearchSupplierScreen from './screens/SearchSupplierScreen';
import MachineryRatesScreen from './screens/MachineryRatesScreen';
import LabourRatesScreen from './screens/LabourRatesScreen';
import BrandWiseMaterial from './screens/BrandWiseMaterial';
import SSRRates from './screens/SSRRates';
import SearchMaterial from './screens/SearchMaterial';
import ChatbotScreen from './screens/ChatbotScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  MaterialPrice: undefined;
  CalculationScreen: undefined;
  StateSSR: undefined;
  UserProfile: undefined;
  SearchSupplier: undefined;
  NearbySuppliers: undefined;
  MachineryRates: undefined;
  LabourRates: undefined;
  BrandWiseMaterial: undefined;
  SSRRates: undefined;
  SearchMaterial: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MaterialPrice" component={MaterialPrice} />
      <Stack.Screen name="CalculationScreen" component={CalculationScreen} />
      <Stack.Screen name="StateSSR" component={StateSSRScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="SearchSupplier" component={SearchSupplierScreen} />
      <Stack.Screen name="NearbySuppliers" component={NearbySuppliersScreen} />
      <Stack.Screen name="MachineryRates" component={MachineryRatesScreen} />
      <Stack.Screen name="LabourRates" component={LabourRatesScreen} />
      <Stack.Screen name="BrandWiseMaterial" component={BrandWiseMaterial} />
      <Stack.Screen name="SSRRates" component={SSRRates} />
      <Stack.Screen name="SearchMaterial" component={SearchMaterial} />
      <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigation;
