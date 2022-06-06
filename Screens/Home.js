import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/core";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";

import { Transaction } from "../components/Transaction";
import { db } from "../config/database";

export const Home = ({ navigation }) => {
  const [operations, setOperations] = useState([]);
  const balance = "999,99";

  const goToAddTransaction = () => {
    console.log("travelling");
    navigation.navigate("Transaction");
  };

  const getTx = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT amount, type, description, date FROM transactions ORDER BY id DESC`,
        null,
        (sqlTx, res) => {
          console.log("transactions retrived successfully");
          const results = [];
          const len = res.rows.length;
          for (let i = 0; i < len; i++) {
            const item = res.rows.item(i);
            results.push({
              amount: item.amount,
              type: item.type,
              description: item.description,
              date: item.date,
            });
          }
          setOperations(results);
          console.log(operations);
        },
        (sqlTx, error) => console.log("error: ", error)
      );
    });
  };

  useFocusEffect(() => {
    getTx();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{balance} €</Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[{ backgroundColor: "#e5e5e5" }, styles.transaction]}
          onPress={() => {
            goToAddTransaction();
          }}
        >
          <Text style={styles.txtTransaction}>transaction</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.list}>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </ScrollView>
    </SafeAreaView>
  );
};

const size = {
  fullHeight: Dimensions.get("screen").height,
  fullWidth: Dimensions.get("screen").width,
};

const styles = StyleSheet.create({
  container: {
    height: size.fullHeight,
    width: size.fullWidth,
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    paddingTop: 10,
  },

  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: size.fullWidth,
    height: 200,
    backgroundColor: "#0093FE",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.45,
    shadowRadius: 6.27,
    elevation: 10,
    marginBottom: -26,
  },

  balance: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },

  btnContainer: {
    width: 300,
    height: "auto",
    alignItems: "center",
    marginBottom: 30,
  },

  transaction: {
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.45,
    shadowRadius: 6.27,
    elevation: 10,
  },

  txtTransaction: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },

  list: {
    height: "auto",
    width: "auto",
    paddingRight: 5,
  },
});
