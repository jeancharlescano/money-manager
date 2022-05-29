import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
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

import { AddTransaction } from "./screens/AddTransation";
import { Home } from "./screens/Home";

const Stack = createNativeStackNavigator();

export const db = SQLite.openDatabase(
  {
    name: "money-manager",
    location: "default",
  },
  () => {},
  (error) => {
    console.log(error);
  }
);

export default function App({ navigation }) {
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS transaction (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, type VARCHAR(25), description VARCHAR(50), date DATE);"
      );
    });
  };

  useEffect(() => {
    createTable();
  }, []);

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
