import React, { useRef } from "react"
import "./styles.css"

// Passing props to component
// Định nghĩa interface Props để xác định kiểu dữ liệu của các props mà component nhận
interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void // Passing function as props
}

// Khai báo một functional component InputFeild với React.FC<Props> type
// const InputFeild = ({todo, setTodo}: Props) => {
const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  // Tạo một ref cho input để có thể truy cập trực tiếp đến DOM của nó
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur()  // blur ô nhập liệu sau khi form được submit (mất focus)
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  )
}

export default InputFeild
