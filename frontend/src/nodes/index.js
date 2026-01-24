import InputNode from './InputNode';
import OutputNode from './OutputNode';
import TextNode from './TextNode';
import LLMNode from './LLMNode';
import FilterNode from './FilterNode';
import TransformNode from './TransformNode';
import MergeNode from './MergeNode';
import ConditionalNode from './ConditionalNode';
import LoopNode from './LoopNode';

export const nodeTypes = {
  InputNode: InputNode,
  OutputNode: OutputNode,
  TextNode: TextNode,
  LLMNode: LLMNode,
  FilterNode: FilterNode,
  TransformNode: TransformNode,
  MergeNode: MergeNode,
  ConditionalNode: ConditionalNode,
  LoopNode: LoopNode,
};

export {
  InputNode,
  OutputNode,
  TextNode,
  LLMNode,
  FilterNode,
  TransformNode,
  MergeNode,
  ConditionalNode,
  LoopNode,
};
