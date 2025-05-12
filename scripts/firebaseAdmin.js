import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { cert } from 'firebase-admin/app';
import serviceAccount from './service.json' with { type: 'json' };


if (!(getApps().length)) {
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_D_ENDPOINT
});
}
else {
    console.log('Firebase app already initialized');
}

const createUser = async ({ email, password }) => {
  const auth = getAuth();
  return await auth.createUser({ email, password });
};

const setCustomUserClaims = async (uid, claims) => {
  const auth = getAuth();
  await auth.setCustomUserClaims(uid, claims);
};

export default { createUser, setCustomUserClaims };