import { getFirestore,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    onSnapshot,
    doc,
    query,
    orderBy as order,
    limit as numberOfResults,
    serverTimestamp,
    arrayUnion,
    arrayRemove } from 'firebase/firestore';

import { app } from './FirestoreApp';

export class Fetcher {
    constructor(){
        this.db = getFirestore(app);
    }

    currentTimestamp(){
        return serverTimestamp()
    }

    getCollectionRef(collectionPath){
        if(typeof collectionPath === 'string'){
            return collection(this.db, collectionPath);
        }
        if(Array.isArray(collectionPath)){
            if(typeof collectionPath[0] === 'string') return collection(this.db, ...collectionPath);
            return collection(...collectionPath);
        }
        return collectionPath;
        }

    setSnapshotListener({
        collectionPath,
        orderBy = null,
        orderDirection = null,
        limit = 100}, callback){
            const q = orderBy?
            query(this.getCollectionRef(collectionPath), order(orderBy, orderDirection), numberOfResults(limit))
            :
            query(this.getCollectionRef(collectionPath), numberOfResults(limit));

            try{
                const unsubscribe = onSnapshot(q, callback)
                return unsubscribe
            } catch(err) {
                console.log(err)
            }
            
    }    

    getDocumentRef(collectionPath, documentId = undefined){
        if(documentId){
            if(typeof collectionPath === 'string'){
                return doc(this.db, collectionPath, documentId)
                }
            if(Array.isArray(collectionPath)){
                return doc(this.db, ...collectionPath, documentId)
                }
        } else {
            if(Array.isArray(collectionPath)){
                return doc(this.db, ...collectionPath)
                }
            return collectionPath;
        }
        
    };

    // Creates new doc with google-generated ID
    async createDoc(collectionPath, document) {
        try{
            const newRef = await addDoc(this.getCollectionRef(collectionPath), document);
            return newRef;
        } catch(err){
            console.error(err)
        };
        
    };

    // Creates new doc with custom ID
    async createDocWithID(collectionPath, documentId, document) {
        try{
            const newRef = await setDoc(this.getDocumentRef(collectionPath, documentId), document);
            return newRef;
        } catch(err){
            console.error(err)
        };
        
    };


    /**
     * @name getDocsFromCollection
     * @description Single function to gather any group of documents from a collection.
     * 
     * @returns {Promise<Array>} getDocsFromCollection
     */
    async getDocsFromCollection({
        collectionPath,
        orderBy = null,
        orderDirection = null,
        limit = 100}){
        const q = orderBy?
        query(this.getCollectionRef(collectionPath), order(orderBy, orderDirection), numberOfResults(limit))
        :
        query(this.getCollectionRef(collectionPath), numberOfResults(limit));

        try{
            const snap = await getDocs(q)
            const docsFromQuery = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return docsFromQuery;
        } catch(err) {
            console.error(err)
        };
        
    };

    /**
     * @name getSingleDocument
     * @description Function to retrieve a single document from a specific collection.
     * 
     * @returns {Promise<Object>} getSingleDocument
     */
    async getSingleDocument({collectionPath, documentId}){
        try{
            const snap = await getDoc(this.getDocumentRef(collectionPath, documentId));
            return { id: snap.id, ...snap.data() };
        } catch(err) {
            console.log(err)
            return
        }
        
    };

    async addField(documentPath, fieldName, value){
        try{
            await setDoc(this.getDocumentRef((documentPath)), {
            [fieldName]: value
        }, { merge: true});
        } catch(err){
            console.warn(err)
        }

    }

    async updateSingleDocument(documentPath, fieldName, value){
        console.log(value)
        try{
            await updateDoc(this.getDocumentRef(documentPath), {
            [`${fieldName}`]: value
            });
        } catch(err) {
            console.log(err)
        }
    };

    async appendToField(documentPath, fieldName, value){
        try{
            await updateDoc(this.getDocumentRef(documentPath), {
                [fieldName]: arrayUnion(value)
            });
        } catch(err) {
            console.log(err)
        }
    };

    async removeFromField(documentPath, fieldName, value){
        try{
            await updateDoc(this.getDocumentRef(documentPath), {
                [fieldName]: arrayRemove(value)
            });
        } catch(err) {
            console.log(err)
        }
    };

}