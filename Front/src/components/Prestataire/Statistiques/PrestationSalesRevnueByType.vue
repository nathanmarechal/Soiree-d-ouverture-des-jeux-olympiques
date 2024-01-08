<template>
  <div>
    <h4>Revenue des Ventes par Type</h4>
    <div ref="circleChart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters } from 'vuex';
import { getSalesRevnueByTypeByStand } from '@/services/statistiques.service';

export default {
  name: 'CircleChart',
  data() {
    return {
      salesData: []
    };
  },
  computed: {
    ...mapGetters(['getCurrentUser'])
  },
  async mounted() {
    await this.loadSalesData();
    this.drawCircleChart();
  },
  methods: {
    async loadSalesData() {
      try {
        this.salesData = await getSalesRevnueByTypeByStand(this.getCurrentUser.id_stand);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    drawCircleChart() {
      const data = this.salesData;
      const svgWidth = 500, svgHeight = 400;
      const radius = Math.min(svgWidth, svgHeight) / 2;
      const svg = d3.select(this.$refs.circleChart)
          .append('svg')
          .attr('width', svgWidth)
          .attr('height', svgHeight)
          .append('g')
          .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie()
          .value(d => d.sales_revenue_by_type);

      const path = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      const label = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);

      const arc = svg.selectAll('.arc')
          .data(pie(data))
          .enter().append('g')
          .attr('class', 'arc');

      arc.append('path')
          .attr('d', path)
          .attr('fill', d => color(d.data.libelle));

      arc.append('text')
          .attr('transform', d => `translate(${label.centroid(d)})`)
          .attr('dy', '0.35em')
          .text(d => d.data.libelle);

      // Optional: Add tooltips or transitions here if needed
    }
  }
}
</script>

<style scoped>
.arc text {
  font-size: 14px;
  text-anchor: middle;
}
.arc path {
  stroke: #fff;
}
</style>
