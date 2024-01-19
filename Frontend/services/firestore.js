import { FIREBASE_DB } from "./firebase";

const db = FIREBASE_DB;

export const addPost = async (topicId, post) => {
  await db()
    .collection("topics")
    .doc(topicId)
    .collection("posts")
    .add(post);
};

export const getPosts = async (topicId) => {
  const snapshot = await db()
    .collection("topics")
    .doc(topicId)
    .collection("posts")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
