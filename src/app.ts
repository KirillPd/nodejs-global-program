import express from "express";

import {
  addUser,
  deleteUser,
  getAutoSuggestUsers,
  getUser,
  updateUser
} from "./controllers/user";
import { schema, validate } from "./validation";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());

app.post("/users", validate(schema), addUser);
app.patch("/users/:id", validate(schema), updateUser);
app.get("/users", getAutoSuggestUsers);
app.get("/users/:id", getUser);
app.delete("/users/:id", deleteUser);

export default app;
