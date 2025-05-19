
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "@/components/TaskList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock task data
const MOCK_TASKS = [
  {
    id: "1",
    title: "Redesign homepage",
    description: "Update the homepage with new brand guidelines and improve user experience.",
    deadline: new Date(2025, 5, 25),
    assignedTo: {
      name: "John Doe",
      avatar: ""
    },
    status: "in-progress" as const
  },
  {
    id: "2",
    title: "Fix navigation bug",
    description: "Navigation menu doesn't work correctly on mobile devices.",
    deadline: new Date(2025, 5, 20),
    assignedTo: {
      name: "Jane Smith",
      avatar: ""
    },
    status: "todo" as const
  },
  {
    id: "3",
    title: "Update API documentation",
    description: "Document new endpoints and update existing examples.",
    deadline: new Date(2025, 5, 18),
    assignedTo: {
      name: "Alex Johnson",
      avatar: ""
    },
    status: "completed" as const
  },
  {
    id: "4",
    title: "Setup testing environment",
    description: "Configure Jest and Cypress for automated testing.",
    deadline: new Date(2025, 5, 30),
    assignedTo: {
      name: "Sarah Williams",
      avatar: ""
    },
    status: "todo" as const
  },
  {
    id: "5",
    title: "Create onboarding flow",
    description: "Design and implement onboarding experience for new users.",
    deadline: new Date(2025, 6, 5),
    assignedTo: {
      name: "Michael Brown",
      avatar: ""
    },
    status: "todo" as const
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(MOCK_TASKS);
  
  const taskStatistics = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === "todo").length,
    inProgress: tasks.filter(task => task.status === "in-progress").length,
    completed: tasks.filter(task => task.status === "completed").length,
  };

  const handleEditTask = (id: string) => {
    navigate(`/edit-task/${id}`);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team's tasks and track progress.
          </p>
        </div>
        <Button onClick={() => navigate("/new-task")}>
          <Plus className="mr-1 h-4 w-4" />
          New Task
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{taskStatistics.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <Badge variant="outline">{taskStatistics.todo}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(taskStatistics.todo / taskStatistics.total * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Badge variant="outline">{taskStatistics.inProgress}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(taskStatistics.inProgress / taskStatistics.total * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Badge variant="outline">{taskStatistics.completed}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(taskStatistics.completed / taskStatistics.total * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
        <TaskList 
          tasks={tasks} 
          onEditTask={handleEditTask} 
          onDeleteTask={handleDeleteTask} 
        />
      </div>
    </div>
  );
}
