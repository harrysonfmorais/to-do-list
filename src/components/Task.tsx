import { FormEvent, useState } from 'react';

import { Trash, PlusCircle } from 'phosphor-react';

import clipBoard from '../assets/Clipboard.svg';
import VectorImg from '../assets/Vector.svg';
import VectorCompletedImg from '../assets/VectorCompleted.svg';

import styles from './Task.module.css';

interface NewTaskProps {
  id: number;
  title: string;
  isComplete: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState<NewTaskProps[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title: newTaskTitle,
      isComplete: false
    }
    
    if(newTask.title === ''){
      alert('Não é possível adicionar uma tarefa em branco.')
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  function handleTaskCompletation(id: number) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id){
        task.isComplete = !task.isComplete;
      }

      return task
    })

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const result = tasks.filter(task => task.id !== id)
    
    setTasks(result);
  }

  const taskListSize = tasks.length;
  const completeTasks = tasks.filter(task => task.isComplete === true).length;
  
  return (
    <>
      <div className={styles.formTasks}>
        <form onSubmit={handleCreateNewTask}>
          <div className={styles.inputTasks}>
            <input 
              type="text"
              placeholder='Adicione uma nova tarefa'
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit">
              Criar
              <PlusCircle size={20}/>
            </button>
          </div>
        </form>
      </div>

      <main>
        <div className={styles.containerTaskList}>
          <div className={styles.headerTaskList}>
            <strong>Tarefas criadas <span>{taskListSize}</span></strong>
            <strong>Concluídas <span>{completeTasks} de {taskListSize}</span></strong>
          </div>
        </div>
        { taskListSize > 0 ? (
          <div className={styles.taskList}>
          {tasks.map(task => {
            return (
              <li key={task.id}>
                <img 
                  src={task.isComplete ? `${VectorCompletedImg}` : `${VectorImg}`}
                  onClick={() => handleTaskCompletation(task.id)}
                />
                <p className={task.isComplete ? `${styles.completed}` : ''}>
                  {task.title}
                </p>
                <button onClick={() => handleRemoveTask(task.id)}>
                  <Trash size={20} />
                </button>
              </li>
            )})}
          </div>
        ) : (
          <div className={styles.emptyTask}>
            <img src={clipBoard} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}
      </main>
    </>
  )
}