import tables from './layout/tables';

export default function layout() {
    this.containers = {
        main: d3.select(this.element)
            .append('div')
            .datum(this)
            .classed('study-overview', true)
            .attr('id', `study-overview${document.querySelectorAll('.study-overview').length}`),
    };
    this.containers.cards = this.containers.main
        .selectAll('div.so-card')
            .data(tables)
            .enter()
        .append('div')
        .classed('so-card', true);
    this.containers.headers = this.containers.cards.append('h4').classed('so-card__header', true).text(d => d.label);
    this.containers.tables = this.containers.cards.append('table').classed('so-card__table', true);
}
