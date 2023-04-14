import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist, TodolistsType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = "All" | "Active" | "Completed"

type TaskStateType = {
    [key: string]: TasksType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ]
    })

    const changeTaskTitle = (taskId: string, todolistId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=>el.id === taskId ? {...el, title: newTitle}: el)})
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists([...todolists.map(el=>el.id === todolistId ? {...el, title: newTitle} : el)])
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodoList = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el=>el.id !== todolistId))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el=> el.id !== taskId)})
    }

    const addTask = (newTitle: string, todolistId: string) => {
        let task = {
            id: v1(),
            title: newTitle,
            isDone: true
        }
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string,todolistId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=>el.id === taskId ? {...el, isDone: newIsDone}:el)})
    }



    const changeTodolistFilter = (value: FilterValueType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(el => {

                let allTodolistTasks = tasks[el.id]
                let tasksForTodolist = allTodolistTasks

                if (el.filter === "Active") {
                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                }
                if (el.filter === "Completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                }

                return (
                    <Todolist key={el.id}
                              todolistId={el.id}
                              title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeTodolistFilter={changeTodolistFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={el.filter}
                              removeTodolist={removeTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
            {/*<Todolist title={"What to learn"}*/}
            {/*          tasks={tasksForTodolist}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeTodolistFilter={changeTodolistFilter}*/}
            {/*          addTask={addTask}*/}
            {/*          changeTaskStatus={changeTaskStatus}*/}
            {/*          filter={filter}*/}
            {/*/>*/}
        </div>
    );
}


export default App;
