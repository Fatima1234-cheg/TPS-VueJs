export function getPost(id) {
  return fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .catch(err => {
      console.log("Erreur :", err);
      return null; // un seul post, pas un tableau
    });
}
