<template>
  <v-layout>
    <v-row>
      <v-col>
        <!--				<control-panel-component></control-panel-component>-->
        <!--        <graph-constructor-component></graph-constructor-component>-->
        <Graph
          :style="{
            width: '100%',
            height: '100%',
            border: '1px solid black',
            boxSizing: 'border-box',
          }"
        />
      </v-col>
      <v-col>
        <v-col>
          <graph-input-component></graph-input-component>
        </v-col>
        <v-col>
          <graph-table-component></graph-table-component>
        </v-col>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_GRAPH_LIBRARY } from "@/api/Queries";
import { useGraphStore } from "@/store/graph";
import { toVGraph } from "./network/helper/graph";
import Graph from "@/features/graph/ui/graph/Graph.vue";

export default defineComponent({
  components: {Graph },
  setup() {
    useGraphStore().graphLibrary = [];
    const { onResult } = useQuery(GET_GRAPH_LIBRARY);
    onResult((response) => {
      if (response.data) {
        response.data.getGraphLibrary.forEach(function (graph: any) {
          useGraphStore().graphLibrary.push(toVGraph(graph));
        });
      }
    });
  },
});
</script>
