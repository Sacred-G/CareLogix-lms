
import * as React from "react";
import { ToastContext, toast, ToasterToast } from "@/hooks/use-toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<{ toasts: ToasterToast[] }>({ toasts: [] });

  React.useEffect(() => {
    const listeners: Array<(state: { toasts: ToasterToast[] }) => void> = [];
    
    listeners.push(setState);
    
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const contextValue = React.useMemo(() => ({
    toasts: state.toasts,
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        // Just triggering the dismiss action
        console.log('Dismissing toast:', toastId);
      }
    }
  }), [state.toasts]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}
