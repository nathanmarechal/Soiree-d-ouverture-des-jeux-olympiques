<template>
  <div>
      <h4>{{translate("statistiquesPrestataire_1")}}</h4>
    <div ref="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters } from 'vuex';
import { getNbPrestationHeure } from '@/services/statistiques.service';
import {translate} from "../../../lang/translationService";


export default {
  name: 'BarChart',
  data() {
    return {
      prestations: []
    };
  },
  computed: {
    //...mapGetters(['getCurrentUser']),
    ...mapGetters('user', ['getCurrentUser'])
  },
  async mounted() {
    await this.loadPrestationData();
    this.drawChart();
  },
  methods: {
    translate,
    async loadPrestationData() {
      try {
        console.log('test')
        this.prestations = await getNbPrestationHeure(this.getCurrentUser.id_stand);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    drawChart() {
      const data = this.prestations;
      const svgWidth = 500, svgHeight = 400;
      const margin = { top: 20, right: 20, bottom: 70, left: 50 };
      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;

      const svg = d3.select(this.$refs.chart)
          .append('svg')
          .attr('width', svgWidth)
          .attr('height', svgHeight)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(data.map(d => d.heure_creneau));

      const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(data, d => d.nb_prestation_par_heure)]);

      // Add the X Axis
      svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x))
          .selectAll('text')
          .style('text-anchor', 'end')
          .attr('dx', '-.8em')
          .attr('dy', '.15em')
          .attr('transform', 'rotate(-65)');

      // Add the Y Axis
      svg.append('g')
          .call(d3.axisLeft(y));

      // Add the bars
      svg.selectAll('.bar')
          .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.heure_creneau))
          .attr('width', x.bandwidth())
          .attr('y', d => y(d.nb_prestation_par_heure))
          .attr('height', d => height - y(d.nb_prestation_par_heure))
          .attr('fill', '#4e79a7');

      // Optional: Add tooltips or transitions here if needed
    }

  }
}
</script>
