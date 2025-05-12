import auth from 'scripts/firebaseAdmin';

export default async function handle_new_user(req, res) {
    if (req.method == 'POST') {
        const { email, password, role } = req.body;

        try {
            const registeredUser = await auth.createUser({ email, password });
            await auth.setCustomUserClaims(registeredUser.uid, { role });

            res.status(201).json({ uid: registeredUser.uid });
        } catch(error) {
            res.status(500).json({ error: "Caught error: " + error.message });
        }
    }

    else {
            res.status(405).json({ error: 'Something went wrong, please try again.' });
        }
}