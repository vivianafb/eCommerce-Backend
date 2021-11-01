import admin from 'firebase-admin';
import serviceAccount from '../../firebase.json'
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

export const ProductoDB = db.collection('productos');
export const CarritoDB = db.collection('carrito');