import {
  doc,
  deleteDoc,
} from "firebase/firestore";
import {db} from "../config/firebase";

// export const handleQuizEdit = async (id) => {
//   prompt("handleQuizEdit");
// }

export const handleQuizDelete = async (id) => {
  const yesNo = prompt("Type yes(y) to delete permanently. You can't undo this action.");
  if (yesNo === "yes" || yesNo === "y") {
    const quizDocRef = doc(db, "quizzes", id);
    await deleteDoc(quizDocRef);
  }
}