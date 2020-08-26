var firebaseConfig = {
    apiKey: "AIzaSyDPqoxKMwmKRjFusS7xP6_VP_wbU42pFPM",
    authDomain: "todo-6d3a8.firebaseapp.com",
    databaseURL: "https://todo-6d3a8.firebaseio.com",
    projectId: "todo-6d3a8",
    storageBucket: "todo-6d3a8.appspot.com",
    messagingSenderId: "430754290545",
    appId: "1:430754290545:web:427033da3fcaea89b934d0",
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  const db = firebase.firestore()

  let tasks = []

  function createDelButton(task){
    const newButton = document.createElement("button")
    newButton.appendChild(document.createTextNode("Excluir"))
    newButton.setAttribute("onclick", `deleteTask("${task.id}")`)
    return newButton
  }

  function renderTasks(){
    const taskList = document.getElementById("taskList")
    taskList.innerHTML=""
    for (task of tasks){
        const newItem = document.createElement("li")
        newItem.appendChild(document.createTextNode(task.title))
        newItem.appendChild(createDelButton(task))
        taskList.appendChild(newItem)
    }
  }

async function readTasks() {
    tasks = []
    const logTasks = await db.collection("tasks").get()
    for (doc of logTasks.docs) {
    tasks.push({
        id: doc.id,
        title: doc.data().title,
        })
    }
    renderTasks()
}

async function addTask(){
  const newTask = document.getElementById("newTask").value
  const date = new Date().toISOString()
  await db.collection("tasks").add({
    title: newTask,
    date: date,
  })
  readTasks()
}
async function deleteTask(id) {
  await db.collection("tasks").doc(id).delete()
  readTasks()
}

readTasks()
