import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let counter = 1;
    let questionOne = await inquirer.prompt([
        {
            name: 'todo',
            type: 'input',
            message: "What do you want to add to your todos?"
        },
        {
            name: 'addMore',
            type: 'confirm',
            message: "Do you want to add more?",
            default: 'true'
        },
        {
            name: 'showTodos',
            type: 'confirm',
            message: "Do you want to show your todos?",
            default: 'false'
        }
    ]);
    if (questionOne.showTodos) {
        console.log('Your Todos:');
        todos.forEach(todo => {
            console.log(`${counter++}. ${todo}`);
        });
    }
    todos.push(questionOne.todo);
    console.log(todos);
    todos.forEach(todo => {
        console.log(`${counter++}. ${todo}`);
    });
    const { deleteTodo } = await inquirer.prompt([
        {
            name: 'deleteTodo',
            type: 'confirm',
            message: "Do you want to delete a todo item?",
            default: 'false'
        }
    ]);
    if (deleteTodo) {
        const { todoNumber } = await inquirer.prompt([
            {
                name: 'todoNumber',
                type: 'input',
                message: "Enter the number of the todo item you want to delete:"
            }
        ]);
        const index = parseInt(todoNumber) - 1;
        if (!isNaN(index) && index >= 0 && index < todos.length) {
            todos.splice(index, 1);
            console.log('Todo item deleted successfully.');
        }
        else {
            console.log('Invalid todo number.');
        }
    }
    condition = questionOne.addMore;
}
