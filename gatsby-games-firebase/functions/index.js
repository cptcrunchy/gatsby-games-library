const functions = require('firebase-functions');
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.createPublicProfile = functions.https.onCall( async (data, context) => {
    checkAuthentication(context)
    validateData(data, {
        username: 'string'
    })

    const userProfile = await admin.firestore().collection('publicProfiles').where('userId', '==', context.auth.uid).limit(1).get()
    const publicProfile = await admin.firestore().collection('publicProfiles').doc(data.username).get()

    if(!userProfile.empty) throwError('already-exists', 'This user already has a public profile')
    if(publicProfile.empty) throwError('already-exists', 'This username already belongs to an existing user')
    
    return admin.firestore().collection('publicProfiles').doc(data.username).set({userId: context.auth.uid})
})

function validateData(data, validKeys){
    if(Object.keys(data).length !== Object.keys(validKeys).length){
        throwError('invalid-argument', 'Data object contains invalid number of properties')
    }else {
        for(let key in data){
            if(!validKeys[key] || typeof data[key] !== validKeys[key]) throwError('invalid-argument', 'Data object contains invalid properties')
        }
    }
}

function checkAuthentication(context){
    if(!context.auth) throwError('unauthenticated', 'You must be signed in to use this feature')
}

function throwError(errorCode, errorMessage){
    throw new functions.https.HttpsError(errorCode, errorMessage)
}
