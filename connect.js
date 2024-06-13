import mysql from "mysql2/promise";

export default async function connection() {
    if (global.conexao && global.conexao.status != "disconected") {
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host: "mysql",
        user: "user",
        password: "14725836",
        database: "trabalho_4",
    });

    global.conexao = conexao;
    return conexao;
}
