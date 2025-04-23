import { hashPassword } from 'utils/hash'; // your utility function
import { db } from 'scripts/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  try{
    if (req.method !== 'POST') return res.status(405).end();
    console.log(req.body);
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const userRef = doc(db, 'Authentication', email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(401).json({ error: 'User not found' });
    }

    const userData = userSnap.data();
    const hashed = hashPassword(password);

    if (hashed !== userData.passwordHash) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  }
  catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(200).json({ success: true });
}