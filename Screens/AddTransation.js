import { useState } from "react";
import * as SQLite from "expo-sqlite";
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  SafeAreaView,
} from "react-native";
import dayjs from "dayjs";
import db from "../App";

export const AddTransaction = ({ navigation }) => {
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const setTransaction = async () => {
    const date = dayjs();
    if (amount.length != 0 && type.length != 0 && description.length != 0) {
      try {
        await db.transaction(async (tx) => {
          await tx.executeSql(
            "INSERT INTO transaction (amount, type, description) VALUES (?, ?, ?, ?);",
            [amount, type, description, date]
          );
        });
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.montantForm}>
          <Text style={styles.formTxt}>Montant :</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Saisir le montant"
            onChangeText={(value) => setAmount(value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.montantForm}>
          <Text style={styles.formTxt}>Type :</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Saisir type de paiement"
            onChangeText={(value) => setType(value)}
          />
        </View>
        <View style={styles.montantForm}>
          <Text style={styles.formTxt}>Description :</Text>
          <TextInput
            style={styles.formInputDes}
            placeholder="Saisir la description"
            multiline
            blurOnSubmit
            onChangeText={(value) => setDescription(value)}
          />
        </View>
      </View>
      <View>
        <Pressable style={styles.btnField} onPress={setTransaction()}>
          <Text style={styles.btnText}>Terminer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },

  form: {
    width: 380,
    alignItems: "center",
  },

  formTxt: {
    fontWeight: "bold",
    color: "#0093FE",
    fontSize: 15,
    marginBottom: 5,
  },

  formInput: {
    width: 350,
    height: 43,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0093FE",
    marginLeft: 10,
    fontSize: 15,
    padding: 8,
  },

  formInputDes: {
    width: 350,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0093FE",
    marginLeft: 10,
    fontSize: 15,
    // textAlignVertical: "top",
  },

  montantForm: {
    marginBottom: 10,
  },

  btnField: {
    width: 200,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#0093FE",
  },

  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
