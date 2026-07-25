import { useReactFlow } from 'reactflow';
import {
  Send,
  Loader2,
  GitBranch,
  Share2,
  Variable,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const analyzePipeline = (nodes, edges) => {
  const adjacency = new Map();
  const indegree = new Map();

  for (const node of nodes) {
    adjacency.set(node.id, []);
    indegree.set(node.id, 0);
  }

  for (const edge of edges) {
    const source = edge.source;
    const target = edge.target;

    if (!adjacency.has(source)) adjacency.set(source, []);
    if (!adjacency.has(target)) adjacency.set(target, []);

    if (!indegree.has(source)) indegree.set(source, 0);
    if (!indegree.has(target)) indegree.set(target, 0);

    adjacency.get(source).push(target);
    indegree.set(target, indegree.get(target) + 1);
  }

  const queue = [];
  for (const [nodeId, degree] of indegree.entries()) {
    if (degree === 0) queue.push(nodeId);
  }

  let visitedCount = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    visitedCount++;

    for (const neighbor of adjacency.get(current) || []) {
      indegree.set(neighbor, indegree.get(neighbor) - 1);
      if (indegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return {
    num_nodes: nodes.length,
    num_edges: edges.length,
    is_dag: visitedCount === indegree.size,
  };
};

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
      const analysis = analyzePipeline(nodes, edges);
      setResult(analysis);
      setDialogOpen(true);
    } catch (err) {
      console.error('Error analyzing pipeline:', err);
      setError('Could not analyze the pipeline on the client side.');
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
                  Analysis Error
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
                      <span className="text-2xl font-bold text-foreground">
                        {result.num_nodes}
                      </span>
                      <span className="text-xs text-muted-foreground">Nodes</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 min-w-[100px]">
                      <Share2 className="h-6 w-6 text-blue-500 mb-2" />
                      <span className="text-2xl font-bold text-foreground">
                        {result.num_edges}
                      </span>
                      <span className="text-xs text-muted-foreground">Edges</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 min-w-[100px]">
                      <Variable className="h-6 w-6 text-amber-500 mb-2" />
                      <span className="text-2xl font-bold text-foreground">
                        {result.is_dag ? 'Yes' : 'No'}
                      </span>
                      <span className="text-xs text-muted-foreground">Is DAG?</span>
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