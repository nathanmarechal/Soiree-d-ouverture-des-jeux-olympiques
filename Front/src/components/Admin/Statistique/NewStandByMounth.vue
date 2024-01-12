<template>
  <div>
    <h4>{{translate("newStandStats_1")}}</h4>
    <svg ref="svg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { getNewStandByMonth } from '@/services/statistiques.service';
import {translate} from "../../../lang/translationService";
import {mapGetters} from "vuex";

export default {
  name: 'CumulativeLineChart',
  data() {
    return {
      chartData: [], // Les données seront stockées ici après leur récupération
      width: 800,
      height: 500
    };
  },

  computed: {
    ...mapGetters('user', ['getSessionId'])
  },

  async mounted() {
    try {
      const dataFromService = await getNewStandByMonth(this.getSessionId);
      this.chartData = dataFromService.map(d => ({
        mois: d.mois,
        nombre_stands: parseInt(d.nombre_stands)
      }));
      this.createCumulativeBarChart();
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  },
  methods: {
    translate,
    createCumulativeBarChart() {
      const svg = d3.select(this.$refs.svg);
      const margin = {top: 20, right: 20, bottom: 30, left: 50};
      const chartWidth = this.width - margin.left - margin.right;
      const chartHeight = this.height - margin.top - margin.bottom;

      const cumulativeData = this.calculateCumulativeData();

      // Échelle pour l'axe X
      const xScale = d3.scaleBand()
          .domain(cumulativeData.map(d => d.date))
          .range([0, chartWidth])
          .padding(0.2);

      // Échelle pour l'axe Y
      const yScale = d3.scaleLinear()
          .domain([0, d3.max(cumulativeData, d => d.total)])
          .range([chartHeight, 0]);

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      // Axe X
      g.append('g')
          .attr('transform', `translate(0,${chartHeight})`)
          .call(d3.axisBottom(xScale)); // Utiliser les noms de mois tels quels

      // Axe Y
      g.append('g')
          .call(d3.axisLeft(yScale));

      // Création des barres
      g.selectAll('.bar')
          .data(cumulativeData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => xScale(d.date))
          .attr('y', d => yScale(d.total))
          .attr('width', xScale.bandwidth())
          .attr('height', d => chartHeight - yScale(d.total))
          .attr('fill', 'steelblue');
    },
    calculateCumulativeData() {
      let cumulativeTotal = 0;
      return this.chartData.map(d => {
        cumulativeTotal += d.nombre_stands;
        return {date: d.mois, total: cumulativeTotal};
      });
    }
  }
}
</script>

<style>
/* CSS for your chart */
</style>
