// initialize firebase persistence
import "./app/firebase";
// initialize ui tree
import "./app/app-root.ts";
//initialize global sytling/theming
import "./index.scss";

//TODO richtiges USermanagement
import { AuthService } from "./app/services/AuthService";
AuthService.login("martin.sb@outlook.de", "testpassword");
