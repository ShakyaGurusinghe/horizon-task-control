
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock team members data
const teamMembers = [
  { id: "1", name: "John Doe", avatar: "" },
  { id: "2", name: "Jane Smith", avatar: "" },
  { id: "3", name: "Alex Johnson", avatar: "" },
  { id: "4", name: "Sarah Williams", avatar: "" },
  { id: "5", name: "Michael Brown", avatar: "" }
];

interface TaskFormData {
  id?: string;
  title: string;
  description: string;
  deadline: Date;
  assignedTo: {
    name: string;
    avatar?: string;
  };
  status: "todo" | "in-progress" | "completed";
}

export function TaskForm({ 
  initialData,
  onSubmit,
  onCancel
}: {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [deadline, setDeadline] = useState<Date | undefined>(initialData?.deadline || undefined);
  const [assignedToId, setAssignedToId] = useState(initialData?.assignedTo ? "1" : "");
  const [status, setStatus] = useState<"todo" | "in-progress" | "completed">(initialData?.status || "todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find the selected team member
    const selectedMember = teamMembers.find(m => m.id === assignedToId) || teamMembers[0];
    
    onSubmit({
      id: initialData?.id,
      title,
      description,
      deadline: deadline || new Date(),
      assignedTo: {
        name: selectedMember.name,
        avatar: selectedMember.avatar
      },
      status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task title" 
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task description" 
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !deadline && "text-muted-foreground"
                )}
              >
                {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={(date) => date && setDeadline(date)}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Select
            value={assignedToId}
            onValueChange={setAssignedToId}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value: "todo" | "in-progress" | "completed") => setStatus(value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData?.id ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
