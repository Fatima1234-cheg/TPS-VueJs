<template>
  <div class="auth-card">
    <h2>Connexion Étudiant</h2>
    <p>Connectez-vous avec votre compte Google universitaire</p>

    <button class="btn-google" @click="loginWithGoogle">
      
      Se connecter avec Google
    </button>

    <p v-if="message" :class="{'error-msg': isError, 'success-msg': !isError}">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth, googleProvider } from "../Firebase/config2";
import { signInWithPopup } from "firebase/auth";

const message = ref("");
const isError = ref(false);

const loginWithGoogle = async () => {
  message.value = "";
  isError.value = false;
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    message.value = `Connecté avec Google : ${user.displayName} (${user.email})`;
  } catch (err) {
    message.value = err.message;
    isError.value = true;
  }
};
</script>

<style scoped>
.auth-card {
  max-width: 400px;
  margin: 120px auto;
  padding: 40px;
  border-radius: 15px;
  background: #F5F9FF; /* bleu clair */
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.auth-card h2 {
  color: #2C3E50; /* bleu foncé */
  margin-bottom: 10px;
}

.auth-card p {
  color: #2C3E50;
  font-size: 14px;
}

.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background-color: #4285F4; /* Google bleu */
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-google img {
  width: 20px;
  height: 20px;
}

.btn-google:hover {
  background-color: #357AE8;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.error-msg {
  color: #FF4C4C;
  font-weight: bold;
}

.success-msg {
  color: #2C3E50;
  font-weight: bold;
}
</style>
