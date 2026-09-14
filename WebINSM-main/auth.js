import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIlFCbi0z0IfNvaasgvz_paXQeBuRmE_A",
  authDomain: "autenticacion-6d1e2.firebaseapp.com",
  projectId: "autenticacion-6d1e2",
  storageBucket: "autenticacion-6d1e2.firebasestorage.app",
  messagingSenderId: "187192153766",
  appId: "1:187192153766:web:cdb1a3f6105208e3288667",
  measurementId: "G-BRPR34SX27"
};

const auth = getAuth(initializeApp(firebaseConfig));
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const DOMINIO_INSTITUCIONAL = "@institutolamerced.edu.ar";

let currentUser = null;
onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

function validarUsuarioInstitucional(user) {
  const email = (user?.email || "").toLowerCase();

  if (!email.endsWith(DOMINIO_INSTITUCIONAL)) {
    throw new Error("Solo se permiten cuentas institucionales.");
  }

  return user;
}

window.obtenerUsuarioInstitucional = async function () {
  currentUser = null;
  await signOut(auth);

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  try {
    return validarUsuarioInstitucional(user);
  } catch (error) {
    await signOut(auth);
    throw error;
  }
};

window.cerrarSesionInstitucional = async function () {
  currentUser = null;
  await signOut(auth);
};
