import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  getDocs,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// إضافة مهمة جديدة للمستخدم
export const addTask = async (userId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...taskData,
      userId,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// تحديث بيانات مهمة معينة
export const updateTask = async (taskId, updates) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};

// حذف مهمة
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    throw error;
  }
};

// تبديل حالة إكمال المهمة (مكتملة/غير مكتملة)
export const toggleTaskComplete = async (taskId, completed) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      completed: !completed,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};

// جلب جميع المهام الخاصة بالمستخدم
export const getTasks = async (userId) => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  } catch (error) {
    throw error;
  }
};
