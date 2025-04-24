import { hashPassword } from 'utils/hash'; // your utility function
import { db } from 'scripts/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try{
    if (req.method !== 'POST') return res.status(405).end();
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const userRef = collection(db, 'Authentication');
    const lookup = query(userRef, where('email', '==', email));
    const userSnap = await getDocs(lookup);

    if (userSnap.empty) {
      return res.status(401).json({ error: 'User not found' });
    }

    const userData = userSnap.docs[0].data();
    const hashed = hashPassword(password);

    if (hashed !== userData.password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  }
  catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(200).json({ success: true });
}