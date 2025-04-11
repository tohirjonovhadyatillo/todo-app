import { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle2, Calendar, Clock, AlertCircle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        description: description.trim(),
        completed: false,
        dueDate: dueDate,
        priority: priority,
        createdAt: new Date().toISOString()
      }]);
      setNewTodo('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setIsFormOpen(false);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Enhanced Todo List
          </h1>
          
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full mb-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Todo
          </button>

          {isFormOpen && (
            <form onSubmit={addTodo} className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Enter todo title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Add Todo
              </button>
            </form>
          )}

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors duration-200 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 ${todo.completed ? 'text-green-500' : 'text-gray-400'}`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        todo.completed
                          ? 'text-gray-400 line-through'
                          : 'text-gray-700'
                      }`}>
                        {todo.text}
                      </h3>
                      {todo.description && (
                        <p className="text-gray-500 text-sm mt-1">{todo.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {todo.dueDate ? formatDate(todo.dueDate) : 'No date'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Created: {formatDate(todo.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertCircle className={`w-4 h-4 ${getPriorityColor(todo.priority)}`} />
                      <span className="capitalize">{todo.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No todos yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;