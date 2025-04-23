import { hashPassword } from 'utils/hash'; // your utility function
import { db } from '../../scripts/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
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

  return res.status(200).json({ success: true });
}