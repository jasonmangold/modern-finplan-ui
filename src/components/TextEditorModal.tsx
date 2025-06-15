
import React, { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, X } from "lucide-react";

interface TextEditorModalProps {
  open: boolean;
  title: string;
  initialValue: string;
  onSave: (value: string) => void;
  onClose: () => void;
}

const TOOLBAR_BUTTONS = [
  { cmd: "bold", icon: <Bold className="w-4 h-4" />, label: "Bold" },
  { cmd: "italic", icon: <Italic className="w-4 h-4" />, label: "Italic" },
  { cmd: "underline", icon: <Underline className="w-4 h-4" />, label: "Underline" },
  { cmd: "insertUnorderedList", icon: <List className="w-4 h-4" />, label: "Bulleted List" },
  { cmd: "insertOrderedList", icon: <ListOrdered className="w-4 h-4" />, label: "Numbered List" },
  { cmd: "justifyLeft", icon: <AlignLeft className="w-4 h-4" />, label: "Left" },
  { cmd: "justifyCenter", icon: <AlignCenter className="w-4 h-4" />, label: "Center" },
  { cmd: "justifyRight", icon: <AlignRight className="w-4 h-4" />, label: "Right" }
];

export const TextEditorModal: React.FC<TextEditorModalProps> = ({
  open,
  title,
  initialValue,
  onSave,
  onClose
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && editorRef.current) {
      editorRef.current.innerHTML = initialValue;
      editorRef.current.focus();
    }
  }, [initialValue, open]);

  const handleCommand = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  const handleSave = () => {
    if (editorRef.current) {
      onSave(editorRef.current.innerHTML);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-between items-center">
            {title}
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="ml-auto"><X className="w-5 h-5" /></Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex gap-2 mb-2 border rounded px-2 py-1 bg-gray-50">
            {TOOLBAR_BUTTONS.map(btn => (
              <Button
                key={btn.cmd}
                type="button"
                variant="ghost"
                size="icon"
                title={btn.label}
                onMouseDown={e => { e.preventDefault(); handleCommand(btn.cmd); }}
                tabIndex={-1}
              >{btn.icon}</Button>
            ))}
          </div>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            className="border rounded px-3 py-2 min-h-[120px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Text editor"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
