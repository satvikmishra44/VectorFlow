
import { useReactFlow } from 'reactflow';
import { Send, Loader2, GitBranch, Share2, Variable, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const API_URL = 'http://localhost:8000/pipelines/parse';

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setDialogOpen(true);
    } catch (err) {
      console.error('Error submitting pipeline:', err);
      setError(`Could not connect to backend.\nMake sure the FastAPI server is running at:\n${API_URL}`);
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg shadow-md hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} />
        )}
        {isLoading ? 'Analyzing...' : 'Analyze Pipeline'}
      </button>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-card border-border max-w-md w-full">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-foreground mb-2">
              {error ? (
                <>
                  <XCircle className="h-5 w-5 text-destructive" />
                  Connection Error
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Pipeline Analysis Complete
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              {error ? (
                <div className="text-muted-foreground whitespace-pre-line mt-2">
                  {error}
                </div>
              ) : result ? (
                <div className="space-y-4 mt-4 w-full">
                  <div className="flex w-full items-center justify-between gap-4">
                    
                    <div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-primary/10 border border-primary/20 min-w-[100px]">
                      <GitBranch className="h-6 w-6 text-primary mb-2" />
                      <span className="text-2xl font-bold text-foreground">{result.num_nodes}</span>
                      <span className="text-xs text-muted-foreground">Nodes</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 min-w-[100px]">
                      <Share2 className="h-6 w-6 text-blue-500 mb-2" />
                      <span className="text-2xl font-bold text-foreground">{result.num_edges}</span>
                      <span className="text-xs text-muted-foreground">Edges</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 min-w-[100px]">
                      <Variable className="h-6 w-6 text-amber-500 mb-2" />
                      <span className="text-2xl font-bold text-foreground">
                        {result.is_dag ? 'Yes' : 'No'}
                      </span>
                      <span className="text-xs text-muted-foreground">Is DAG</span>
                    </div>

                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    {result.is_dag 
                      ? '✓ Valid directed acyclic graph - no cycles detected'
                      : '⚠ Cycles detected in the graph structure'}
                  </p>
                </div>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubmitButton;