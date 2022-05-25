import { getAuth,
     onAuthStateChanged,
     GoogleAuthProvider,
     signInAnonymously,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     signInWithPopup,
     signOut } from 'firebase/auth';

import { closeModal } from '../Functions/Functions';
import { app } from './FirestoreApp';
import { Fetcher } from './Fetcher';



export class Authentication{
    constructor(_setUser){
        this.auth = getAuth(app);
        this.fetch = new Fetcher();
        this.setUser = _setUser;
        this.setUser(this.auth.currentUser);
        this.auth.useDeviceLanguage();
        onAuthStateChanged(this.auth, async (user) => {
            if(user){
                try{
                    const updatedUser = await this.fetch.getSingleDocument({ collectionPath: "Users", documentId: user.uid });
                    this.setUser(updatedUser)
                } catch (err){
                    // handle error
                }
            } else {
                this.setUser(user)
            }
        })
    }

    async createAccount(pseudo, email, password){
        try{
            const userSnapshot = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userSnapshot.user;
            const userModel = {
                id: user.uid,
                email: user.email,
                emailVerified: false,
                isAnonymous: false,
                photoUrl: "",
                accessToken: user.accessToken,
                chatsCreated: [],
                inChats: []
                
            }
            await this.fetch.createDocWithID("Users", userModel.id, { nickname: pseudo, ...userModel })
            closeModal();
        } catch(err){
            console.log(`${err.code} --> ${err.message}`);
        }
    }

    async emailSignIn(email, password){
        try{
            await signInWithEmailAndPassword(this.auth, email, password)
            closeModal();
        } catch(err){
            console.log(`${err.code} --> ${err.message}`);
        }
    }

    async googleSignIn(){
        const googleProvider = new GoogleAuthProvider();
        try{
            await signInWithPopup(this.auth, googleProvider)
            closeModal();
        } catch(err){
            console.log(`${err.code} --> ${err.message}`);
        }
    }

    async signOut(){
        try{
            await signOut(this.auth)
        } catch(err){
            console.log(`${err.code} --> ${err.message}`)
        }
        
    }
}


      