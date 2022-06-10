import React, { useEffect, useState } from "react";
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
    let txResult;
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT amount, type, description, date FROM transactions ORDER BY id DESC`,
        null,
        (sqlTx, { rows }) => {
          txResult = JSON.stringify(rows._array);
          console.log("🚀 ~ file: Home.js ~ line 36 ~ db.transaction ~ txResult", txResult)
          setOperations(txResult);
        },
        // (sqlTx, { rows: { _array } }) => {
        //   console.log("transactions retrived successfully");
        //   results = { data: { _array } };
        //   console.log("query result : ", results.data._array[0]);
        //   return results
        // },
        (sqlTx, error) => console.log("error: ", error)
      );
    });
  };

  const deleteTx = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM transactions"),
        (req, res) => {
          const results = res.rows;
          setOperations(results);
          console.log(operations);
        },
        (error) => console.log(error);
    });
  };

  const transaction = () => {};

  useFocusEffect(
    React.useCallback(() => {
      getTx();
      console.log(operations);
    }, [])
  );

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
      <ScrollView style={styles.list}>{transaction()}</ScrollView>
    </SafeAreaView>
  );
};
  console.log("🚀 ~ file: Home.js ~ line 89 ~ Home ~ txResult", txResult)

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
