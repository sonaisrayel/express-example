import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://agbu:cX7hVLBaWgOckIrq@cluster0.w5tklqg.mongodb.net/';

const dbName = 'todo';

async function connectToMongoDB() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export async function get(collection,email= false) {
    try {
        const db = await connectToMongoDB();
        const coll = db.collection(collection);
       return email ? await coll.findOne({ email } ) : await coll.find({}).toArray();
     } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
    }
}


export async function create(collection, user){
    try{
        const db = await connectToMongoDB();
        const coll = db.collection('users');
        return await coll.insertOne(user);
    } catch (e) {
        console.log("error in createUsers",e.message)
        throw new Error(e.message)
    }

}

export async function update(collection,user,update){
    try {
        const db = await connectToMongoDB(user);
        const coll = db.collection(collection);
       return  await coll.updateOne(user, { $set: update });
    } catch (e) {
      throw new Error(e.message)
    }
}

export async function del(collection, email){
    try {
        const db = await connectToMongoDB();
        const coll = db.collection(collection);
        return await coll.deleteMany({ email } );
    } catch (e) {
        throw new Error(e.message)
    }
}












