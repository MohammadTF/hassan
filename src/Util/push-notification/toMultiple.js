const admin = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: 'dnms-4dc12',
  private_key_id: 'ab8dc9bfce26eb2005bfbdac08024387e2e8f036',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQVkyerKZSbWmH\nQxHRKWaXPf2iv+D3hKijvfaY6youvDFDvrxiXBg16Ev61GtQluhw/2C4BeKhVSbX\nvzTUfmWAnqb62x7ASthVTSse5wyukBw6oVbxSaUaKKioK1i9SXbljW9ktVMx/9s6\nC9N5tnmowszNfcchOBZT8HePRcHRncfyH5yjVu8pB332lkQ1Va+ZMlWZUrCswJs6\n3P40ITASk7fpGnHeB1q2n5Zu4UKhA2z2e9l7Z76kAJWIiF2EQemNS1GGpnxSdg0O\nEcK2Vp2ViQ9jA15dk/Pca8uNtp3oHTuFIHxCmIG6mHwsYXeQw5OzDEdLXjLDBA3c\nhBi0uQPBAgMBAAECggEARgqNbdcbf6C7FrdsuQYTMIutxtZ9epmF3K7Txeth3h50\n7ZKlYOgXV6BGUwixH4HsmXix+ow3+gdXrLbiuwHXfBtahgG+3+UJv/vWoGgLMnDO\nnMN7KFmbASVkNk2EYvbc2yXmqlPvqWKcQHKTYVsAocUD953uoXNqxkOU3n0UQTUP\n7Vm9bp++5MzzE7vs2TDxnY2fSrpH6s92H6vTAoL46waLkJzMyZdmTXXW3mmsmgP8\ne8kG2OJWHPAoAXB5qoHmajZJoVT7pf9G1elSd9zUAQwpYpW2Qakg5Z+oggG351cD\n37CxzIiq9Y0QH0q8u1sXF9V48o70e2JHpODLgE0flQKBgQDz0ABGdRodaPe1fjHI\nHtE1Pnp2N3Q3r0LswVg63NpNSlv32cTqD1QmEENp+t6RmsVwjRxbGAaM2IcQXwCf\nKcePmes66tgF0KqXZEJMPnT90zxNV8CNRHZgYEzOu1VosRAl8vHOX89QH83QUAAe\nB+72Dg/tUK7TYkSg9L4lEAA8GwKBgQDawFRnIN+tCihM6w9Mrm0FhSvL56eH4nX9\nliL7Vx1L9OwLx1bE4jS/FFfe7b9WHB0fMJLgfOeCallQKU3MeHuqS1iDvPK8yklC\ngMJFV149GqL9GyGfkumQMxbvI3otkbD9dxST0mvIjilhjbu7sK9/7JM22tazwya6\noltMD/sFUwKBgECzwl7wVK3ZXWNcyflBtGNc4ULeFIlyiWArLy7vzT8VrLJpqEg1\nKS+wwTMu0EHzwNHNoOjLx3E5RR6jF5clj0AcqMBJ8moYpizm/nEdYg66MBaWYxMa\nSA/rfnaeYFwYISDxCBqscmfhCM1vbZiKom/J65AfCUYvnebZDFzpkiZhAoGAB0DL\nS6QWZolorqw4lKVP7hftTNSAhIvot6DLxiOsUAFt9jIE2YBamV9WToj5iCRkfs1A\ngXsCvhtCnNrRvo7cIthetfeE4OegKDlWt6/e6w3AC75jjgP0BJj9EK7PdUVYZf8V\nypT2h+7WxmpJqD6Cgy5X70CwT8OPvC538nyxKQsCgYEAw8XjO/1tqa0u4eif/7Fg\nOAKlqRblOgQRrn4DzpIxehTsDAye+4ZbNPy0QLdFwUQFFiZar/SbbPZzYcMcPN7b\nqgILh4j0a0Bd3aiKJwyyHJwfjQo10Ecx+0VrJHFH8cXJWLRo1tIsjmdllqehra9w\nRLtW30A1Tz3e5W6nHcKCpf4=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-akswb@dnms-4dc12.iam.gserviceaccount.com',
  client_id: '109876078478270842265',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-akswb%40dnms-4dc12.iam.gserviceaccount.com',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = {
  sendNotification: (title, body, data = '', type = 'notice', deviceId) => {
    const message = {

      token: deviceId,
      notification: {
        title,
        body,
      },
      data: {
        title,
        body,
        extraData: data,
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
