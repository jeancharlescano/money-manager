import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  SafeAreaView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import dayjs from "dayjs";
import { createTx } from "../utilities/transaction";

export const AddTransaction = ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [txType, setTxType] = useState(false);

  const insertTx = async () => {
    const date = dayjs().format("DD/MM/YYYY");
    let transaction = {
      amount: amount,
      isEarning: txType,
      paymentType: type.toLowerCase(),
      description: description,
      date: date,
    };
    try {
      await createTx(transaction);
      navigation.navigate("Home");
    } catch (error) {
      console.log("🚀 ~ file: AddTransaction.js:36 ~ insertTx ~ error", error);
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
            onChangeText={(value) => {
              setAmount(value);
              console.log(
                "🚀 ~ file: AddTransaction.js:43 ~ AddTransaction ~ amount",
                amount
              );
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.montantForm}>
          <Text style={styles.formTxt}>Type :</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Saisir type de paiement"
            onChangeText={(value) => {
              setType(value);
              console.log(
                "🚀 ~ file: AddTransaction.js:55 ~ AddTransaction ~ type",
                type
              );
            }}
          />
        </View>
        <View style={styles.montantForm}>
          <Text style={styles.formTxt}>Description :</Text>
          <TextInput
            style={styles.formInputDes}
            placeholder="Saisir la description"
            multiline
            blurOnSubmit
            onChangeText={(value) => {
              setDescription(value);
              console.log(
                "🚀 ~ file: AddTransaction.js:66 ~ AddTransaction ~ Description",
                description
              );
            }}
          />
        </View>
        <View style={styles.txTypeForm}>
          <View style={styles.txTypeBtn}>
            <Pressable onPress={() => setTxType(false)}>
              <Text style={styles.txTypeText}>Achat</Text>
            </Pressable>
            <RadioButton
              value="toto"
              status={txType === false ? "checked" : "unchecked"}
              onPress={() => {
                setTxType(false);
                console.log(
                  "🚀 ~ file: AddTransaction.js:85 ~ AddTransaction ~ txType",
                  txType
                );
              }}
            />
          </View>
          <View style={styles.txTypeBtn}>
            <Text style={styles.txTypeText} onPress={() => setTxType(true)}>
              Gain
            </Text>
            <RadioButton
              value="1"
              status={txType === true ? "checked" : "unchecked"}
              onPress={() => {
                setTxType(true);
                console.log(
                  "🚀 ~ file: AddTransaction.js:97 ~ AddTransaction ~ txType",
                  txType
                );
              }}
            />
          </View>
        </View>
      </View>
      <View>
        <Pressable style={styles.btnField} onPress={insertTx}>
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

  montantForm: {
    marginBottom: 10,
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
    padding: 8,
  },

  txTypeForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 8,
    width: 350,
  },

  txTypeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  txTypeText: {
    fontWeight: "bold",
    color: "#0093FE",
    fontSize: 15,
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
