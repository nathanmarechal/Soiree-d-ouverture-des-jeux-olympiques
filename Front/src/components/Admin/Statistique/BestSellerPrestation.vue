<template>
  <div>
    <h4>{{translate("bestSellerStats_1")}}</h4>
    <svg ref="svg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { getBestSellerPrestation } from '@/services/statistiques.service';
import {translate} from "../../../lang/translationService";

export default {
  name: 'BarChart',
  data() {
    return {
      data: [], // Les données sont maintenant initialisées vides
      width: 800,
      height: 500
    };
  },
  async mounted() {
    await this.loadData();
    this.createBarChart();
  },
  methods: {
    translate,
    async loadData() {
      try {
        const response = await getBestSellerPrestation();
        this.data = response.map(item => ({
          prestation: item.libelle,
          total: +item.prix_total
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des données: ", error);
      }
    },
    createBarChart() {
      const svg = d3.select(this.$refs.svg);
      const margin = {top: 20, right: 30, bottom: 40, left: 90};
      const chartWidth = this.width - margin.left - margin.right;
      const chartHeight = this.height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.total)])
          .range([0, chartWidth]);

      const yScale = d3.scaleBand()
          .domain(this.data.map(d => d.prestation))
          .range([0, chartHeight])
          .padding(0.1);

      const g = svg.append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      g.selectAll(".bar")
          .data(this.data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("y", d => yScale(d.prestation))
          .attr("height", yScale.bandwidth())
          .attr("x", 0)
          .attr("width", d => xScale(d.total));

      g.append("g")
          .call(d3.axisLeft(yScale));

      g.append("g")
          .attr("transform", `translate(0,${chartHeight})`)
          .call(d3.axisBottom(xScale));
    }
  }
};
</script>

<style>
.bar {
  fill: steelblue;
}

.bar:hover {
  fill: orange;
}

.axis-label {
  font-size: 12px;
}
</style>
