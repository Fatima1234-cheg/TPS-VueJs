import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, orderBy, limit } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBQGUWhDLya5fV3tqro_LHqC8NEPTeVsmg",
  authDomain: "forum-communautaire-b79bd.firebaseapp.com",
  projectId: "forum-communautaire-b79bd",
  storageBucket: "forum-communautaire-b79bd.firebasestorage.app",
  messagingSenderId: "876778222272",
  appId: "1:876778222272:web:da61f035822e556b773325",
  measurementId: "G-848C8BY3P6"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export function useFirestore() {
  const loading = ref(false)
  const error = ref(null)

  // Discussions
  async function createDiscussion(data) {
    loading.value = true
    error.value = null
    
    try {
      const docRef = await addDoc(collection(db, 'discussions'), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewCount: 0,
        responseCount: 0
      })
      return { success: true, id: docRef.id }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function getDiscussions(filters = {}) {
    loading.value = true
    error.value = null
    
    try {
      let q = query(collection(db, 'discussions'))
      
      if (filters.category) {
        q = query(q, where('category', '==', filters.category))
      }
      
      if (filters.orderBy) {
        q = query(q, orderBy(filters.orderBy, filters.orderDirection || 'desc'))
      }
      
      if (filters.limit) {
        q = query(q, limit(filters.limit))
      }
      
      const querySnapshot = await getDocs(q)
      const discussions = []
      
      querySnapshot.forEach((doc) => {
        discussions.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      return { success: true, data: discussions }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function getDiscussion(id) {
    loading.value = true
    error.value = null
    
    try {
      const docRef = doc(db, 'discussions', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } }
      } else {
        return { success: false, error: 'Discussion non trouvée' }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function updateDiscussion(id, data) {
    loading.value = true
    error.value = null
    
    try {
      const docRef = doc(db, 'discussions', id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      })
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function deleteDiscussion(id) {
    loading.value = true
    error.value = null
    
    try {
      await deleteDoc(doc(db, 'discussions', id))
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Réponses
  async function createResponse(discussionId, data) {
    loading.value = true
    error.value = null
    
    try {
      const docRef = await addDoc(collection(db, 'responses'), {
        ...data,
        discussionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      // Mettre à jour le compteur de réponses
      const discussionRef = doc(db, 'discussions', discussionId)
      const discussionDoc = await getDoc(discussionRef)
      
      if (discussionDoc.exists()) {
        const currentCount = discussionDoc.data().responseCount || 0
        await updateDoc(discussionRef, {
          responseCount: currentCount + 1
        })
      }
      
      return { success: true, id: docRef.id }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function getResponses(discussionId) {
    loading.value = true
    error.value = null
    
    try {
      const q = query(
        collection(db, 'responses'),
        where('discussionId', '==', discussionId),
        orderBy('createdAt', 'asc')
      )
      
      const querySnapshot = await getDocs(q)
      const responses = []
      
      querySnapshot.forEach((doc) => {
        responses.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      return { success: true, data: responses }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function updateResponse(id, data) {
    loading.value = true
    error.value = null
    
    try {
      const docRef = doc(db, 'responses', id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      })
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  async function deleteResponse(id, discussionId) {
    loading.value = true
    error.value = null
    
    try {
      await deleteDoc(doc(db, 'responses', id))
      
      // Mettre à jour le compteur de réponses
      const discussionRef = doc(db, 'discussions', discussionId)
      const discussionDoc = await getDoc(discussionRef)
      
      if (discussionDoc.exists()) {
        const currentCount = discussionDoc.data().responseCount || 0
        await updateDoc(discussionRef, {
          responseCount: Math.max(0, currentCount - 1)
        })
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
    loading,
    error,
    createDiscussion,
    getDiscussions,
    getDiscussion,
    updateDiscussion,
    deleteDiscussion,
    createResponse,
    getResponses,
    updateResponse,
    deleteResponse
  }
}