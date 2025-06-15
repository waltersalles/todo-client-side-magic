
import React, { useState } from 'react';
import { Trash2, Plus, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task: Task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            Lista de Tarefas
          </h1>
          <p className="text-gray-600">Organize suas tarefas de forma simples e eficiente</p>
          {tasks.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              {pendingTasks} de {tasks.length} tarefas pendentes
            </div>
          )}
        </div>

        {/* Add Task Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Digite uma nova tarefa..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
            <Button 
              onClick={addTask}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-6 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Circle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <p className="text-gray-500 text-lg">Nenhuma tarefa adicionada ainda</p>
              <p className="text-gray-400 text-sm">Comece criando sua primeira tarefa acima!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li 
                  key={task.id}
                  className={`bg-white rounded-lg shadow-md border border-gray-100 p-4 transition-all duration-300 hover:shadow-lg ${
                    task.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex-shrink-0 transition-colors duration-200"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 hover:text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 hover:text-blue-400" />
                      )}
                    </button>

                    {/* Task Text */}
                    <span 
                      className={`flex-1 text-base transition-all duration-200 ${
                        task.completed 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-800'
                      }`}
                    >
                      {task.text}
                    </span>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeTask(task.id)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:bg-red-50 rounded-lg"
                      title="Remover tarefa"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-6 bg-white rounded-lg shadow-md px-6 py-3 border border-gray-100">
              <div className="text-sm">
                <span className="font-medium text-blue-600">{tasks.length}</span>
                <span className="text-gray-500 ml-1">Total</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="text-sm">
                <span className="font-medium text-green-600">{tasks.filter(t => t.completed).length}</span>
                <span className="text-gray-500 ml-1">Concluídas</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="text-sm">
                <span className="font-medium text-orange-600">{pendingTasks}</span>
                <span className="text-gray-500 ml-1">Pendentes</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
