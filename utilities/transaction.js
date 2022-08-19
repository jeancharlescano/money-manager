import { db } from "../config/database";

export const getTx = async () => {
  let result;
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM transactions ORDER BY id DESC`,
          [],
          (sqlTx, { rows }) => {
            result = rows._array;
            resolve(result);
          }
        );
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
  // return result;
};

