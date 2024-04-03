<template>
  <div>
    <h4>{{ translate("bestSellerStats_1") }}</h4>
    <svg ref="svg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { getBestSellerPrestation } from '@/services/statistiques.service';
import { translate } from "../../../lang/translationService";
import { mapGetters } from "vuex";

export default {
  name: 'BarChart',
  data() {
    return {
      data: [],
      width: 700, // Ajusté pour plus d'espace
      height: 500
    };
  },
  async mounted() {
    await this.loadData();
    this.createBarChart();
  },
  computed: {
    ...mapGetters('user', ['getSessionId'])
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
      const margin = {top: 40, right: 40, bottom: 70, left: 100}; // Ajusté pour éviter le tronçage
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
          .attr("width", d => xScale(d.total))
          .on('mouseover', function () {
            d3.select(this).transition().duration(300).attr('fill', 'orange');
          })
          .on('mouseout', function () {
            d3.select(this).transition().duration(300).attr('fill', 'steelblue');
          });

      // Ajout des noms de prestations sur les barres
      g.selectAll(".text")
          .data(this.data)
          .enter().append("text")
          .attr("class", "label")
          .attr("y", (d) => yScale(d.prestation) + yScale.bandwidth() / 2 + 4)
          .attr("x", d => xScale(d.total) + 3)
          .text(d => d.total)
          .attr("text-anchor", "start")
          .attr("font-size", "12px");

      // Axe Y
      g.append("g").call(d3.axisLeft(yScale));

      // Axe X avec rotation des labels pour meilleure lisibilité
      g.append("g")
          .attr("transform", `translate(0,${chartHeight})`)
          .call(d3.axisBottom(xScale))
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");
    }
  }
};
</script>

<style>
.bar {
  fill: steelblue;
}

.label {
  fill: black;
}

.axis-label {
  font-size: 12px;
}
</style>
