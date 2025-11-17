export function getPosts() {
  return fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .catch(err => {
      console.log("Erreur :", err);
      return []; 
    });
}
