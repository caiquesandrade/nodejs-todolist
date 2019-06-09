const chalk = require('chalk')
const yargs = require('yargs')
const task = require('./task')

// alterando a versão do CLI
yargs.version('1.0.1')


// name: limpar a casa
// description: limpar o sofá, limpar a cozinha ....
// status: BACKLOG | IN_PROGRESS | DONE

// Adicionar no builder -> Description
// Descrição do novo campo
// Adicionar o tipo
// Imprimir no console.log

// add -> adicionar uma nova task
yargs.command({
    command: 'add',
    describe: 'Add a new task into the ToDo list',
    builder: {
        name: {
            describe: 'Task name',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Describe a task',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const info = chalk.green.bold.inverse('Creating a new task: ')
        console.log(info)
        task.addTask(argv.name, argv.description)
        // console.log(`Name: ${argv.name}`)
        // console.log(`Description: ${argv.description}`)
        }
})

// remove -> remover a task

yargs.command({
    command: 'remove',
    describe: 'Remove a task into the ToDo list',
    builder: {
        name: {
            describe: 'Task name to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.red.inverse('Removing a existing task'))
        task.removeTask(argv.name)
    }
})

// list -> listar todas as tasks

yargs.command({
    command: 'list',
    describe: 'List all tasks',
    handler: () => {
        console.log(chalk.yellow.inverse('Listing out all tasks'))
        const allTasks = task.loadAllTasks()
        const allTasksJSON = JSON.stringify(allTasks, null, 2)
        console.log(allTasksJSON)
    }
})

// read -> ler uma task

yargs.command({
    command: 'read',
    describe: 'Read a new task into the ToDo list',
    builder: {
        name: {
            describe: 'Task to find',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.blue.inverse.bold('Reading a new task'))
        const taskFound = task.findTask(argv.name)
        console.log(JSON.stringify(taskFound, null, 2))
    }
})

yargs.command({
    command: 'update',
    describe: 'Update a task',
    builder: {
        name: {
            describe: 'Task to update',
            demandOption: true,
            type: 'string'
        },
        status: {
            describe: 'Status to update the task',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.white.inverse.bold('Updating a task'))
        task.updateTasks(argv.name, argv.status)
    }
})

yargs.parse()


