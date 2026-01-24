from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
import networkx as nx

app = FastAPI(
    title="Pipeline Flow API",
    description="Backend API for analyzing pipeline graphs",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[dict] = None
    data: Optional[dict] = None


class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


@app.get("/")
def read_root():
    return {"message": "Pipeline Flow API is running!", "status": "healthy"}


@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):

    # Directed graph using NetworkX for analysing DAG
    graph = nx.DiGraph()
    
    for node in pipeline.nodes:
        graph.add_node(node.id, **node.model_dump())
    
    for edge in pipeline.edges:
        graph.add_edge(edge.source, edge.target)
    
    num_nodes = graph.number_of_nodes()
    num_edges = graph.number_of_edges()
    is_dag = nx.is_directed_acyclic_graph(graph)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )


@app.get("/health")
def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
