
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { collection, addDoc, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

  
  const firebaseConfig = {
    apiKey: "AIzaSyAVebhKQHFKp5Eye2uoTt3S7wj-cjzdNPc",
    authDomain: "practice-23e3c.firebaseapp.com",
    projectId: "practice-23e3c",
    storageBucket: "practice-23e3c.appspot.com",
    messagingSenderId: "11967641301",
    appId: "1:11967641301:web:d99c119ea9533dcf48945c"
  };

 
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const ids = [];

  window.getTodos = (collecName) => {
    list.innerHTML = "";
  
    onSnapshot(collection(db, collecName), (data) => {
    
        data.docChanges().forEach((todo) => {
          console.log(todo)
        ids.unshift(todo.doc.id);
  
        if (todo.type === "removed") {
          let dtodo = document.getElementById(todo.doc.id);
          if (dtodo) {
            dtodo.remove();
          }
        } else if (todo.type === "added") {
          let list = document.getElementById("list");
          list.innerHTML += `
            <li id="${todo.doc.id}">
              <input class="todo-input" type="text" value="${todo.doc.data().value}" disabled>
              ${todo.doc.data().time}
              <button onclick='deleteTodo(${collecName}, ${todo.doc.id}})'>Delete</button>
              <button onclick='editTodo(this,"${todo.doc.id}")'>Edit</button>
            </li>`;
        }
      });
  
     
    });
  };
  

 
  
 



window.create = async(collectionName) => {
 
    try {
       
        const newCollectionRef = collection(db, collectionName);
        await getDocs(newCollectionRef); // This line triggers the creation of the collection
        console.log(`Collection "${collectionName}" created successfully.`);
    } catch (e) {
        console.error("Error creating collection: ", e);
    }






}
window.addTodo = async(pass) => {

    let todo = document.getElementById("todo").value
    let date = new Date();
    try {
      const collectionRef = collection(db, pass);
      const docRef = await addDoc(collectionRef, {
          value: todo,
          time: date.toLocaleString()
      });
      console.log(`Todo added to collection "${pass}" successfully.`);
  } catch (e) {
      console.error("Error adding todo: ", e);
  }
}







  
    

    
  


window.deleteTodo = async(namee, id) => {
  await deleteDoc(doc(db, namee, id));
  console.log("Document successfully deleted!");
   
}

let edit = false;

window.editTodo = async(e, id) => {
    if(edit) {
      await updateDoc(doc(db, "todo", id), {
       value: e.parentNode.childNodes[1].value
      });
        console.log(e.parentNode.childNodes[1].value)
        e.parentNode.childNodes[1].disabled = true;
        e.parentNode.childNodes[1].blur();
        e.parentNode.childNodes[5].innerHTML = "Edit";
        edit = false;
    }   
    else{
        
        e.parentNode.childNodes[1].disabled = false;
        e.parentNode.childNodes[1].focus();
        e.parentNode.childNodes[5].innerHTML = "Update";
        edit = true;
}
}

window.deleteAll = async() => {
  let list = document.getElementById("list");
  list.innerHTML = "";
  let arr = [];
for(let i = 0; i < ids.length; i++) {
  arr.push(await deleteDoc(doc(db, "todo", ids[i])));
}

Promise.all(arr)
 .then((res) => {
  console.log("All documents deleted!");
 })

 .catch((err) => {
  console.error("Error removing document: ", err);
 })

 

} 