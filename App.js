import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
} from "react-native";

import { AddTransaction } from "./screens/AddTransaction";
import { Home } from "./screens/Home";
import { db } from "./config/database";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const createTable = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, type VARCHAR(50), description VARCHAR(255), date TEXT)"
        );
        console.log("✔ Table Created ✔");
      });
    } catch (error) {
      console.log(error);
    }
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
