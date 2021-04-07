const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.CERT_URL,
};
console.log(serviceAccount)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = {
  sendNotification: (title, body, deviceId) => {
    console.log(`sending notification to ${deviceId}`);
    const message = {
      // topic: 'tolo',
      token: deviceId,
      notification: {
        title,
        body,
      },
      data: {
        title,
        body,
        extraData: JSON.stringify({ title, body }),
      },
    };

    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  },
};
