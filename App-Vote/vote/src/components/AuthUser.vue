<template>
  <div class="auth-container">
    <h2>Connexion / Inscription</h2>

    <div class="auth-card">
      <input v-model="email" type="email" placeholder="Email universitaire" />
      <input v-model="password" type="password" placeholder="Mot de passe" />

      <button class="btn-primary" @click="register">S'inscrire</button>
      <button class="btn-secondary" @click="login">Se connecter</button>

      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../Firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

// --- INSCRIPTION ---
const register = async () => {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Inscription réussie !");
  } catch (err) {
    error.value = "Erreur : " + err.message;
  }
};

// --- CONNEXION ---
const login = async () => {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);

    // Redirection vers ListEvent
    router.push("/ListEvent");
  } catch (err) {
    error.value = "Erreur : " + err.message;
  }
};
</script>

<style scoped>
/* --- CONTAINER --- */
.auth-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #2C3E50;
}

/* --- CARD --- */
.auth-card {
  width: 350px;
  padding: 30px;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  text-align: center;
}

/* --- INPUTS --- */
input {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #d0d7e2;
  border-radius: 10px;
  font-size: 15px;
  background: #F5F9FF;
  transition: 0.3s;
}

input:focus {
  border-color: #4A90E2;
  outline: none;
  background: #ffffff;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
}

/* --- BUTTONS --- */
button {
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: 0.3s;
}

.btn-primary {
  background: #4A90E2;
  color: white;
}

.btn-primary:hover {
  background: #357ABD;
}

.btn-secondary {
  background: #2C3E50;
  color: white;
}

.btn-secondary:hover {
  background: #1B2A38;
}

/* --- ERROR MESSAGE --- */
.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}
</style>
