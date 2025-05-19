
import { useState, useEffect } from "react";
import { TaskForm } from "@/components/TaskForm";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  assignedTo: {
    name: string;
    avatar?: string;
  };
  status: "todo" | "in-progress" | "completed";
}

export default function TaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = taskId !== undefined;
  
  // Get tasks from location state or use empty array
  const [tasks, setTasks] = useState<Task[]>(
    location.state?.tasks || []
  );
  
  const [task, setTask] = useState(
    isEditMode && tasks.length 
      ? tasks.find(t => t.id === taskId)
      : undefined
  );

  useEffect(() => {
    if (isEditMode && !task) {
      // Task not found
      toast({
        title: "Task not found",
        description: "The requested task could not be found.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [isEditMode, task, navigate]);

  const handleSubmit = (data: any) => {
    let updatedTasks: Task[];
    
    if (isEditMode && task) {
      // Update existing task
      updatedTasks = tasks.map(t => 
        t.id === taskId ? { ...data, id: taskId } : t
      );
    } else {
      // Create new task with unique ID
      const newTask = { ...data, id: uuidv4() };
      updatedTasks = [...tasks, newTask];
    }
    
    // Show success toast
    toast({
      title: isEditMode ? "Task updated" : "Task created",
      description: `${data.title} has been ${isEditMode ? "updated" : "created"} successfully.`
    });
    
    // Navigate back with updated tasks
    navigate("/", { 
      state: { updatedTasks } 
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Task" : "Create New Task"}
        </h1>
        
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
