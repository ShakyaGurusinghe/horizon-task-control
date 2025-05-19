import { useState, useEffect } from "react";
import { TaskForm } from "@/components/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock task data
const MOCK_TASKS = [
  {
    id: "1",
    title: "Redesign homepage",
    description: "Update the homepage with new brand guidelines and improve user experience.",
    deadline: new Date(2025, 5, 25),
    assignedTo: "1",
    status: "in-progress" as const
  },
  {
    id: "2",
    title: "Fix navigation bug",
    description: "Navigation menu doesn't work correctly on mobile devices.",
    deadline: new Date(2025, 5, 20),
    assignedTo: "2",
    status: "todo" as const
  },
  {
    id: "3",
    title: "Update API documentation",
    description: "Document new endpoints and update existing examples.",
    deadline: new Date(2025, 5, 18),
    assignedTo: "3",
    status: "completed" as const
  },
  {
    id: "4",
    title: "Setup testing environment",
    description: "Configure Jest and Cypress for automated testing.",
    deadline: new Date(2025, 5, 30),
    assignedTo: "4",
    status: "todo" as const
  },
  {
    id: "5",
    title: "Create onboarding flow",
    description: "Design and implement onboarding experience for new users.",
    deadline: new Date(2025, 6, 5),
    assignedTo: "5",
    status: "todo" as const
  }
];

export default function TaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const isEditMode = taskId !== undefined;
  
  const [task, setTask] = useState(
    isEditMode 
      ? MOCK_TASKS.find(t => t.id === taskId)
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
    console.log("Task data:", data);
    
    // Here we would typically make an API call to save the task
    // For now, we'll just show a success toast
    
    toast({
      title: isEditMode ? "Task updated" : "Task created",
      description: `${data.title} has been ${isEditMode ? "updated" : "created"} successfully.`
    });
    
    navigate("/");
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
