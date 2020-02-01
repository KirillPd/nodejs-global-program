import express from "express";

import { UserController } from "./controllers/user";
import { DataBase } from "./database";
import { schema, validate } from "./validation";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("db-host", process.env.DB_HOST || "localhost");
app.set("db-port", process.env.DB_PORT || "5432");
app.set("db-user", process.env.DB_USER || "kyrylopiddubnyi");
app.set("db-password", process.env.DB_PASSWORD || "");
app.set("db-users-table-name", process.env.DB_USER_TABLE_NAME || "users");
app.use(express.json());

const db = new DataBase();

db.init({
  config: {
    host: app.get("db-host"),
    port: app.get("db-port"),
    username: app.get("db-user"),
    dialect: "postgres"
  },
  tableName: app.get("db-users-table-name")
});

const userController = new UserController(db);

app.post("/users", validate(schema), userController.addUser);
app.patch("/users/:id", validate(schema), userController.updateUser);
app.get("/users", userController.getAutoSuggestUsers);
app.get("/users/:id", userController.getUser);
app.delete("/users/:id", userController.deleteUser);

export default app;
