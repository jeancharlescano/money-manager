import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

import { AddTransaction } from "./screens/AddTransaction";
import { Home } from "./screens/Home";

const Stack = createNativeStackNavigator();


export default function App({ navigation }) {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Transaction" component={AddTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
