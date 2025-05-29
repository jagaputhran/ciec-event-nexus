
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LeadershipAssignDialogProps {
  trigger?: React.ReactNode;
}

export function LeadershipAssignDialog({ trigger }: LeadershipAssignDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    leader: "",
    event: "",
    role: "",
    responsibilities: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Assigning leadership:", formData);
    
    toast({
      title: "Leadership Assigned",
      description: "Event responsibilities have been successfully assigned",
    });
    
    setOpen(false);
    setFormData({ leader: "", event: "", role: "", responsibilities: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-enterprise-600 hover:bg-enterprise-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Leadership
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Event Leadership</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Select Leader</Label>
            <Select value={formData.leader} onValueChange={(value) => setFormData({ ...formData, leader: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose leader" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balaji-nadar">Balaji Nadar (VP Technology)</SelectItem>
                <SelectItem value="ravi-krishnan">Ravi Krishnan (Director Engineering)</SelectItem>
                <SelectItem value="priya-sharma">Priya Sharma (Senior Manager Operations)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Event</Label>
            <Select value={formData.event} onValueChange={(value) => setFormData({ ...formData, event: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q4-review">Q4 Leadership Review</SelectItem>
                <SelectItem value="tech-summit">Tech Innovation Summit</SelectItem>
                <SelectItem value="team-workshop">Team Building Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary Owner</SelectItem>
                <SelectItem value="secondary">Secondary Support</SelectItem>
                <SelectItem value="approver">Budget Approver</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Responsibilities</Label>
            <Textarea
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="Define specific responsibilities..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-enterprise-600 hover:bg-enterprise-700">
              Assign Leadership
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
