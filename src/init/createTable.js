export default function createTable() {
    this.settings.modules.forEach(module => {
        module.containers = {
            card: this.containers.cards.filter(d => d.spec === module.spec),
            header: this.containers.headers.filter(d => d.spec === module.spec),
            table: this.containers.tables.filter(d => d.spec === module.spec),
        };
        if (module.results) {
            module.containers.rows = module.containers.table
                .selectAll('tr')
                    .data(module.results)
                    .enter()
                .append('tr')
                .classed('so-card__table__row', true);
            module.containers.rows.each(function(d) {
                const row = d3.select(this);
                row.append('td')
                    .classed('so-card__table__row__cell so-card__table__row__cell-key', true)
                    .text(d.label);
                row.append('td')
                    .classed('so-card__table__row__cell so-card__table__row__cell-value', true)
                    .text(d.value);

                if (d.byValues) {
                    row.classed('so-card__table__row--by-group', true);
                    d.byValues.forEach(byValue => {
                        const el = document.createElement('tr');
                        this.parentNode.insertBefore(el, this.nextSibling);
                        const byRow = d3.select(el)
                            .classed('so-card__table__row so-card__table__row--by-value', true);
                        byRow.append('td')
                            .classed('so-card__table__row__cell so-card__table__row__cell-key', true)
                            .text(byValue.label);
                        byRow.append('td')
                            .classed('so-card__table__row__cell so-card__table__row__cell-value', true)
                            .text(byValue.value);
                    });
                }
            });
        }
    });
}
