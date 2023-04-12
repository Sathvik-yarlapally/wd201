const todoList = require('../todo')

describe('TodoList-Test-Suite', () => {
  let todos
  const Today1 = new Date()
  const OneDay2 = 60 * 60 * 24 * 1000
  const Yesterday3 = new Date(Today1.getTime() - 1 * OneDay2)
  const Tomorrow4 = new Date(Today1.getTime() + 1 * OneDay2)

  beforeEach(() => {
    todos = todoList()
  })

  test('Should-add-new-todo', () => {
    const initialCount = todos.all.length
    todos.add({ title: 'New-Todo', dueDate: Tomorrow4.toISOString().slice(0, 10), completed: false })
    expect(todos.all.length).toBe(initialCount + 1)
  })

  test('Should-mark-a-todo-as-completed', () => {
    const todo = { title: 'New-Todo', dueDate: Tomorrow4.toISOString().slice(0, 10), completed: false }
    todos.add(todo)
    const index = todos.all.findIndex(item => item === todo)
    todos.markAsComplete(index)
    expect(todos.all[index].completed).toBe(true)
  })

  test('Should-retrieve-overdue-items', () => {
    todos.add({ title: 'Overdue-Todo', dueDate: Yesterday3.toISOString().slice(0, 10), completed: false })
    todos.add({ title: 'Due-Today-Todo', dueDate: Today1.toISOString().slice(0, 10), completed: false })
    const overdueCount = todos.overdue().length
    todos.add({ title: 'Overdue-Todo 2', dueDate: Yesterday3.toISOString().slice(0, 10), completed: false })
    expect(todos.overdue().length).toBe(overdueCount + 1)
  })

  test('Should-retrieve-due-today-items', () => {
    todos.add({ title: 'Overdue-Todo', dueDate: Yesterday3.toISOString().slice(0, 10), completed: false })
    todos.add({ title: 'Due-Today-Todo', dueDate: Today1.toISOString().slice(0, 10), completed: false })
    const dueTodayCount = todos.dueToday().length
    todos.add({ title: 'Due-Today-Todo 2', dueDate: Today1.toISOString().slice(0, 10), completed: false })
    expect(todos.dueToday().length).toBe(dueTodayCount + 1)
  })

  test('Should-retrieve-due-later-items', () => {
    todos.add({ title: 'Overdue-Todo', dueDate: Yesterday3.toISOString().slice(0, 10), completed: false })
    todos.add({ title: 'Due-Today-Todo', dueDate: Today1.toISOString().slice(0, 10), completed: false })
    todos.add({ title: 'Due-Later-Todo', dueDate: Tomorrow4.toISOString().slice(0, 10), completed: false })
    const dueLaterCount = todos.dueLater().length
    todos.add({ title: 'Due-Later-Todo 2', dueDate: Tomorrow4.toISOString().slice(0, 10), completed: false })
    expect(todos.dueLater().length).toBe(dueLaterCount + 1)
  })
})