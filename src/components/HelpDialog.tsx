import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HelpTextSection } from "@/data/helpTexts";

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sections: HelpTextSection[];
  title?: string;
}

export const HelpDialog = ({ isOpen, onClose, sections, title = "Input Help" }: HelpDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(80vh-120px)]">
          <div className="space-y-6 pr-4">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  {section.description && (
                    <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                  )}
                </div>
                
                <div className="space-y-3">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="border-l-4 border-primary/20 pl-4">
                      <h4 className="font-medium text-foreground">{field.field}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
                    </div>
                  ))}
                </div>
                
                {sectionIndex < sections.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};