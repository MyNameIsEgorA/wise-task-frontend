import { defineStore } from "pinia";
import type { Node } from "@/features/graph/types/Node";
import type { Edge } from "@vue-flow/core";

interface NodesStoreState {
  nodes: Node[];
  edges: Edge[];
}

export const useNodeStore = defineStore("nodes", {
  state: (): NodesStoreState => ({
    nodes: [
      {
        id: "1",
        position: { x: 250, y: 5 },
        data: { label: "Node 1" },
        type: "special",
      },
    ],
    edges: [],
  }),
  actions: {
    addNode(): void {
      const id: string = Date.now().toString();
      this.nodes.push({
        id: id,
        position: { x: Math.random() * 400, y: Math.random() * 400 }, // Случайная позиция
        type: "special",
        data: { label: "Новая вершина" },
      });
    },
    renameNode(id: string, name: string): void {
      const node = this.nodes.find((x) => x.id === id);
      if (node) {
        node.data.label = name;
      }
    },
  },
});
