const { onCall } = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const logger = require("firebase-functions/logger");

admin.initializeApp();

exports.addAdminRole = onCall(({data, ...context}) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    }).then(() => {
      return {
        message: `Success! ${data.email} has been made an admin!!`
      };
    }).catch(err => {
      console.log(err);
      return 'error';
    })
})
