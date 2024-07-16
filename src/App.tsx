import React, { useState } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import "./App.css"
import InputFeild from "./components/InputFeild"
import { Todo } from "./model"
import TodoList from "./components/TodoList"

// Khai báo một functional component App với React.FC (Functional Component) type
const App: React.FC = () => {
  // Khai báo state cho todo (một chuỗi) và todos (một mảng các đối tượng Todo)
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]) // cách tạo 1 array type hoặc 1 interface
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  // Event Type in Typescript (event phải định nghĩa ở mọi nơi)
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    console.log("🚀 ~ onDragEnd ~ result:", result)
    const { source, destination } = result

    // Nếu không có destination (đích) thì không làm gì cả
    if (!destination) {
      return
    }

    // Nếu đích và nguồn giống nhau(cả droppableId và index) thì không làm gì cả
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // đặt biến tạm để tránh vô tình thay đổi trạng thái gốc trước khi cập nhật lại
    let add
    let active = [...todos]
    let complete = [...completedTodos]

    // Source Logic (có thể if else thay vì thêm 1 else if)
    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else if (source.droppableId === "TodosRemove") {
      add = complete[source.index]
      complete.splice(source.index, 1)
    } else {
      return // Thêm else để đảm bảo add luôn được gán giá trị hợp lệ
    }

    // Destination Logic
    if (destination.droppableId === "TodosRemove") {
      complete.splice(destination.index, 0, add)
    } else if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      return
    }

    setCompletedTodos(complete)
    setTodos(active)
  }
  // console.log("🚀 ~ todos:", todos)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
