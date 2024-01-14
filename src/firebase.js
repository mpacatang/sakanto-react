import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAY67rxcj32PgVKWPJSfut3_KhakXolPaQ",
  authDomain: "sakanto.firebaseapp.com",
  projectId: "sakanto",
  storageBucket: "sakanto.appspot.com",
  messagingSenderId: "2652182511",
  appId: "1:2652182511:web:0530ccb5afae57ab5dc81a",
  measurementId: "G-FYWZ8GC3BQ"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BGfO5pf85MgXfYICD-JKgQ40F455XdmZWRQjCUZIvqpj1k894dYL7YZjiNBXpPd7DUYA72HZJKBusFTYChanU2E",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
