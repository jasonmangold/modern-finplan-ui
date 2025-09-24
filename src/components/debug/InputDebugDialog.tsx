import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InputDebugInfo {
  backendName?: string;
  label?: string;
  xtype?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  htmlType?: string;
  currentValue?: string;
  domId?: string;
  className?: string;
}

interface InputDebugDialogProps {
  isOpen: boolean;
  onClose: () => void;
  debugInfo: InputDebugInfo | null;
}

export const InputDebugDialog = ({ isOpen, onClose, debugInfo }: InputDebugDialogProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Field information copied successfully",
    });
  };

  const getFieldTypeColor = (xtype?: string) => {
    switch (xtype) {
      case 'currency': return 'bg-green-100 text-green-800';
      case 'percentage': return 'bg-blue-100 text-blue-800';
      case 'date': return 'bg-purple-100 text-purple-800';
      case 'number': return 'bg-orange-100 text-orange-800';
      case 'text': return 'bg-gray-100 text-gray-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (!debugInfo) return null;

  const debugData = JSON.stringify(debugInfo, null, 2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Input Field Debug Information
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(debugData)}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Field Identity */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Field Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Backend Name:</span>
                <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                  {debugInfo.backendName || 'N/A'}
                </code>
              </div>
              <div>
                <span className="text-muted-foreground">Label:</span>
                <span className="ml-2 font-medium">{debugInfo.label || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">DOM ID:</span>
                <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                  {debugInfo.domId || 'N/A'}
                </code>
              </div>
              <div>
                <span className="text-muted-foreground">Field Type:</span>
                <Badge variant="secondary" className={`ml-2 ${getFieldTypeColor(debugInfo.xtype)}`}>
                  {debugInfo.xtype || debugInfo.htmlType || 'text'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Validation Rules */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Validation Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Min Length:</span>
                <span className="ml-2">{debugInfo.minLength ?? 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Max Length:</span>
                <span className="ml-2">{debugInfo.maxLength ?? 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Min Value:</span>
                <span className="ml-2">{debugInfo.minValue ?? 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Max Value:</span>
                <span className="ml-2">{debugInfo.maxValue ?? 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Current State */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Current State</h3>
            <div className="text-sm">
              <span className="text-muted-foreground">Current Value:</span>
              <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                {debugInfo.currentValue || '(empty)'}
              </code>
            </div>
          </div>

          {/* DOM Information */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">DOM Information</h3>
            <div className="text-sm">
              <span className="text-muted-foreground">CSS Classes:</span>
              <div className="mt-1 p-2 bg-muted rounded text-xs font-mono break-all">
                {debugInfo.className || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => copyToClipboard(debugData)}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy All Data
          </Button>
          <Button onClick={onClose} variant="default">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};