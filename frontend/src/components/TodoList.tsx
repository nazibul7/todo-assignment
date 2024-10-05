import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "./ui/input"
import { MdEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md";
import { SaveIcon } from "lucide-react";
import { useDeleteTodo, useGetTodo, useUpdateTodod } from "@/api/TodoApi";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "@/context/TodoContext";

interface TodoType {
    id?: number;
    todo?: string,
    checked?: boolean
}
const TodoList = () => {
    const { todos,setTodos,toogleChecked } = useContext(TodoContext)
    const { fetchTodos, error, isLoading } = useGetTodo()
    const { updateTodoBE } = useUpdateTodod()
    const { deleteTodo } = useDeleteTodo()
    const [todoEditableId, setTodoEditableId] = useState<number | null>(null)
    const [todoEditableText, setTodoEditableText] = useState<string>('')

    const todoCheckedHandler = async (id: number, todo: TodoType) => {
        await updateTodoBE({ id, todo })
        toogleChecked(id)
    }
    const saveUpdatedTodo = async (id: number, todo: TodoType) => {
        if (!todo.checked) {
            setTodoEditableId(null)
            // updateTodo(id, { ...todo, todo: todoEditableText })
            await updateTodoBE({ id, todo: { ...todo, todo: todoEditableText } })
        }
        else return
    }
    const editTodo = (todo: TodoType) => {
        if (todo.checked) return
        setTodoEditableId(todo.id as number)
        setTodoEditableText(todo.todo || '')
    }
    const deleteTodoHandler = (id: number, todo: TodoType) => {
        if (todo.checked) {
            deleteTodo(id)
        }
        else return
    }
    useEffect(()=>{
        setTodos(fetchTodos)
    },[fetchTodos])
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error fetching todos</p>
    return (
        <>
            {todos?.map(todo => {
                return <div key={todo.id || '00'} className="relative flex items-center space-x-2 py-3">
                    {/* <Checkbox onChange={()=>console.log("Checked")} className="flex-shrink-0 absolute top-1/2 transform -translate-y-1/2 left-3 ml-3" /> */}
                    <Checkbox checked={todo.checked}
                        // This is controlled, ensure `todo.checked` is properly initialized
                        onClick={() => todoCheckedHandler(todo.id as number, { ...todo, checked: !todo.checked })}

                        className="flex-shrink-0 absolute top-1/2 transform -translate-y-1/2 left-3 ml-3"
                    />

                    <Input
                        value={todoEditableId == todo.id ? todoEditableText : todo.todo}
                        readOnly={todoEditableId != todo.id}
                        onChange={(e) => setTodoEditableText(e.target.value)}
                        className="border border-transparent outline-none  py-6 px-10 border-black" />
                    {todoEditableId == todo.id ? (
                        <SaveIcon
                            onClick={() => saveUpdatedTodo(todo.id as number, todo)}
                            className="w-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-10 text-xl" />
                    ) : (
                        <MdEdit
                            onClick={() => editTodo(todo)}
                            className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-10 text-xl" />
                    )}
                    <MdDelete onClick={()=>deleteTodoHandler(todo.id as number,todo)} className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3 text-xl" />
                </div>
            })}
        </>
    )
}

export default TodoList