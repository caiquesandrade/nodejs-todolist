const fs = require('fs')
const chalk = require('chalk')

const addTask = (name, description) => {

    debugger

    const tasks = loadAllTasks()
    console.log(tasks)

    const duplicatedTask = tasks.find((tasks) => tasks.name === name)

    if(!duplicatedTask){
        const newTask = {
            name,
            description,
            status: 'BACKLOG' 
        }
    
        tasks.push(newTask)
        saveTasks(tasks)
        console.log(chalk.green.bold('Task created!'))
    }else{
        console.log(chalk.red.bold(`Task with name [${name}] already taken!`))
    }


}

const saveTasks = (task) => {
    const tasksJSON = JSON.stringify(task)
    fs.writeFileSync('tasks.json', tasksJSON)
}

const loadAllTasks = () => {
    // Ler todas as tarefas
    try{
    const tasksBuffer = fs.readFileSync('tasks.json')
        return JSON.parse(tasksBuffer.toString())

    } catch(error){
        return[]
    }
}

const removeTask = (name) => {
    const tasks = loadAllTasks()

    const tasksToKeep = tasks.filter((task) => task.name !== name)

    saveTasks(tasksToKeep)

    console.log(chalk.green.bold(`Task with name [${name}] has been removed!`))
}

const findTask = (name) => {
    const tasks = loadAllTasks()

    const taskFound = tasks.find((task) => task.name === name)

        if(taskFound !== undefined){
            return taskFound
        }else{
            return {}
        }
        

        }
   
    const updateTasks = (name, status) => {
        const tasks = loadAllTasks()
     
        tasks.find((task) => {
            if(task.name == name){
                tasks.status = status
            }
        })

        saveTasks(tasks)

        console.log(chalk.green.bold(`Task status with name [${name}] has been updated!`))
    }


module.exports = {
    addTask,
    removeTask,
    loadAllTasks,
    findTask,
    updateTasks
}