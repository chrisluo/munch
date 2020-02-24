import * as firebase from "firebase";
import getEnvVars from "../env";
const { firebaseApiKey } = getEnvVars();

const config = {
  apiKey: firebaseApiKey
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
