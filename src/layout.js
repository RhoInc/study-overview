export default function layout() {
    this.containers = {
        main: d3.select(this.element)
            .append('div')
            .datum(this)
            .classed('study-overview', true)
            .attr('id', `study-overview${document.querySelectorAll('.study-overview').length}`),
    };
}
