import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

export async function getOrders() {

const q = query(
collection(db,"orders"),
orderBy("createdAt","desc")
)

const snapshot = await getDocs(q)

return snapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}))

}