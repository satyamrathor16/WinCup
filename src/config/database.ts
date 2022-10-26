import SQLite from 'react-native-sqlite-storage';

//new database
let db = SQLite.openDatabase({ name: 'wincup.db', createFromLocation: 2 },
    () => console.log("ok connected"),
    (error) => console.log(error));

const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Bet_History "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Match_ID INTEGER, Home_Team Text, Away_Team Text, Bet_Amount INTEGER, Bet_On INTEGER, Bet_Multiply INTEGER)"
        )
    })
}

const insertDataIntoTable = (Match_ID: number, Home_Team: string, Away_Team: string, Bet_Amount: number, Bet_On: number, Bet_Multiply: number) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO "
            + "Bet_History "
            + "(Match_ID, Home_Team, Away_Team, Bet_Amount, Bet_On, Bet_Multiply) VALUES (?,?,?,?,?,?)"
            , [Match_ID, Home_Team, Away_Team, Bet_Amount, Bet_On, Bet_Multiply]
        )
    })
}

const getData = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM "
                + "Bet_History "
                , []
                , (txn, result) => {
                    console.log('result database__', result)
                    var temp = [];
                    for (let i = 0; i < result.rows.length; ++i) {
                        temp.push(result.rows.item(i));
                    }
                    // console.log('temp', temp);
                    resolve(temp)
                },
                (error) => {
                    reject('faild')
                    console.log('getData Error', error);

                }
            )
        })
    })
}

export default {
    createTable,
    insertDataIntoTable,
    getData
}