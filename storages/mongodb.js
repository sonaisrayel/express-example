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

export async function getUsers() {
    try {
        const db = await connectToMongoDB();
        const coll = db.collection('users');
        return await coll.find({}).toArray();
     } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
    }
}


export async function getUser(user){
    try {
        const db = await connectToMongoDB();
        const coll = db.collection('users');
        return  await coll.findOne(user);
    } catch (e) {
        throw new Error(e.message)
    }
}

export async function createUsers(user){
    try{
        const db = await connectToMongoDB();
        const coll = db.collection('users');
        return await coll.insertOne(user);
    } catch (e) {
        console.log("error in createUsers",e.message)
        throw new Error(e.message)
    }

}

export async function updateUser(user,update){
    try {
        const db = await connectToMongoDB(user);
        const coll = db.collection('users');
       // const updatedUser = await coll.updateOne({ a: 3 }, { $set: { b: 1 } });
       return  await coll.updateOne(user, { $set: update });
    } catch (e) {
      throw new Error(e.message)
    }
}

export async function deleteUser(user){
    try {
        const db = await connectToMongoDB(user);
        const coll = db.collection('users');
        return await coll.deleteMany(user);
    } catch (e) {
        throw new Error(e.message)
    }
}








