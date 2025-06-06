
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Edit as EditIcon, 
  Trash as TrashIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const statusColors = {
    "todo": "bg-muted text-muted-foreground",
    "in-progress": "bg-blue-100 text-blue-800",
    "completed": "bg-green-100 text-green-800"
  };
  
  const statusLabels = {
    "todo": "To Do",
    "in-progress": "In Progress",
    "completed": "Completed"
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Card className="overflow-hidden border rounded-lg">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
          <Badge className={cn(statusColors[task.status])}>
            {statusLabels[task.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
            <AvatarFallback>
              {task.assignedTo.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600">{task.assignedTo.name}</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(task.id)} 
            className="text-gray-500 hover:text-blue-500 transition-colors"
          >
            <EditIcon className="h-4 w-4" />
          </button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-gray-500 hover:text-red-500 transition-colors">
                <TrashIcon className="h-4 w-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to delete this task? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
