<template>
  <div>
    <h4>{{ translate("newStandStats_1") }}</h4>
    <svg ref="svg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { getNewStandByMonth } from '@/services/statistiques.service';
import { translate } from "../../../lang/translationService";
import { mapGetters } from "vuex";

export default {
  name: 'CumulativeLineChart',
  data() {
    return {
      chartData: [],
      width: 900, // Ajusté pour plus d'espace
      height: 500
    };
  },
  computed: {
    ...mapGetters('user', ['getSessionId'])
  },
  async mounted() {
    await this.loadData();
    this.createCumulativeLineChart();
  },
  methods: {
    translate,
    async loadData() {
      try {
        const dataFromService = await getNewStandByMonth();
        this.chartData = dataFromService.map(d => ({
          mois: d.mois,
          nombre_stands: parseInt(d.nombre_stands)
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données: ", error);
      }
    },
    createCumulativeLineChart() {
      const svg = d3.select(this.$refs.svg);
      const margin = {top: 40, right: 50, bottom: 80, left: 60}; // Ajusté pour éviter le tronçage
      const chartWidth = this.width - margin.left - margin.right;
      const chartHeight = this.height - margin.top - margin.bottom;

      const cumulativeData = this.calculateCumulativeData();

      const xScale = d3.scalePoint()
          .domain(cumulativeData.map(d => d.date))
          .range([0, chartWidth]);

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(cumulativeData, d => d.total)])
          .range([chartHeight, 0]);

      const lineGenerator = d3.line()
          .x(d => xScale(d.date))
          .y(d => yScale(d.total));

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      // Dessin de la ligne
      g.append("path")
          .datum(cumulativeData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", lineGenerator);

      // Axe X
      g.append('g')
          .attr('transform', `translate(0,${chartHeight})`)
          .call(d3.axisBottom(xScale))
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-40)"); // Rotation pour meilleure lisibilité

      // Axe Y
      g.append('g').call(d3.axisLeft(yScale));
    },
    calculateCumulativeData() {
      let cumulativeTotal = 0;
      return this.chartData.map(d => {
        cumulativeTotal += d.nombre_stands;
        return {date: d.mois, total: cumulativeTotal};
      });
    }
  }
};
</script>

<style>
/* Style adapté si nécessaire */
</style>
