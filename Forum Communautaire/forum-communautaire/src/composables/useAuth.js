import { ref, computed } from 'vue'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './useFirestore'

export function useAuth() {
  const auth = getAuth()
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Écouter les changements d'authentification
  auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      user.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      }
      
      // Récupérer les données supplémentaires depuis Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
      if (userDoc.exists()) {
        user.value = { ...user.value, ...userDoc.data() }
      }
    } else {
      user.value = null
    }
  })

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function register(email, password, displayName) {
    loading.value = true
    error.value = null
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Mettre à jour le profil
      await updateProfile(userCredential.user, { displayName })
      
      // Créer le document utilisateur dans Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        displayName,
        createdAt: new Date().toISOString(),
        role: 'user'
      })
      
      user.value = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
        role: 'user'
      }
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function login(email, password) {
    loading.value = true
    error.value = null
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    error.value = null
    
    try {
      await signOut(auth)
      user.value = null
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(email) {
    loading.value = true
    error.value = null
    
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function updateUserProfile(data) {
    loading.value = true
    error.value = null
    
    try {
      await updateProfile(auth.currentUser, data)
      
      // Mettre à jour dans Firestore
      if (user.value?.uid) {
        await setDoc(doc(db, 'users', user.value.uid), {
          ...data,
          updatedAt: new Date().toISOString()
        }, { merge: true })
      }
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout,
    resetPassword,
    updateUserProfile
  }
}