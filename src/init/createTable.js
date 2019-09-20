export default function createTable() {
    this.settings.modules.forEach(module => {
        module.containers = {
            card: this.containers.cards.filter(d => d.spec === module.spec),
            header: this.containers.headers.filter(d => d.spec === module.spec),
            table: this.containers.tables.filter(d => d.spec === module.spec),
        };
        if (module.summary) {
            module.containers.rows = module.containers.table
                .selectAll('tr')
                    .data(module.summary)
                    .enter()
                .append('tr')
                .classed('so-card__table__row', true);
            module.containers.rows.each(function(d) {
                const row = d3.select(this);
                row.append('td')
                    .classed('so-card__table__row__cell so-card__table__row__cell-key', true)
                    .text(d.key);
                row.append('td')
                    .classed('so-card__table__row__cell so-card__table__row__cell-value', true)
                    .text(d.values);
            });
        }
    });

        //containers: {
        //    card: this.containers.cards.filter(d => d.spec === data.spec),
        //    cardHeader: this.containers.cardHeaders.filter(d => d.spec === data.spec),
        //    cardTable: this.containers.cardTables.filter(d => d.spec === data.spec),
        //},
}
