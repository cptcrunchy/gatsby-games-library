import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  getUserProfile({userId, onSnapshot}) {
    return this.db.collection('publicProfiles').where('userId', '==', userId).onSnapshot(onSnapshot)
  }

  async register({email, password, username}) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile')

    return createProfileCallable({username})
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
