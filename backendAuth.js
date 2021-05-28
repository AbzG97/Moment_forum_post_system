const admin = require('firebase-admin')
const serviceAccount = require("./fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const checkAuth = async (req, res, next) => {
    if (req.headers.authtoken) {
      try {
        // get the token
        const decoded = await admin.auth().verifyIdToken(req.headers.authtoken) // tokens are being sent from axios request
        // use the uid in decoded token to get the user
        const user = await admin.auth().getUser(decoded.uid);
        req.user = user;
        next();
      } catch (e) {
        res.status(403).send('Unauthorized')
      }
    } else {
      res.status(500).send({message: 'server error'});
    }
}

module.exports = checkAuth;
