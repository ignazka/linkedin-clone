import { connectToDatabase } from '../../../util/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
    const {
        method,
        query: { id },
    } = req;

    const { db } = await connectToDatabase()

    if (method === 'DELETE') {
        try {
            await db.collection('posts').deleteOne({ _id: new ObjectId(id) })
            res.status(200).json({ message: 'post deleted!' })
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

