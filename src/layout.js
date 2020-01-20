export default function layout() {
    this.containers = {
        main: d3
            .select(this.element)
            .append('div')
            .datum(this)
            .classed('study-overview', true)
            .attr('id', `study-overview${document.querySelectorAll('.study-overview').length}`)
    };
    this.containers.controls = this.containers.main.append('div').classed('so-controls', true);
    this.containers.cards = this.containers.main
        .selectAll('div.so-card')
        .data(this.settings.modules)
        .enter()
        .append('div')
        .classed('so-card', true);
    this.containers.headers = this.containers.cards
        .append('div')
        .append('h4')
        .classed('so-card__header', true)
        .text(d => d.title);
    this.containers.tables = this.containers.cards
        .append('div')
        .append('table')
        .classed('so-card__table', true);
}
