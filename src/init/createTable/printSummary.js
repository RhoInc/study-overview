export default function printSummary(dataset, by) {
    const module = dataset.module;

    module.containers = {
        card: this.containers.cards.filter(d => d.spec === module.spec),
        header: this.containers.headers.filter(d => d.spec === module.spec),
        table: this.containers.tables.filter(d => d.spec === module.spec)
    };

    if (by) {
        module.containers.header = module.containers.table
            .append('thead')
            .classed('so-card__table__header', true)
            .append('tr')
            .selectAll('th')
            .data([...[''], ...(module.byValues || []), ...['Overall']])
            .enter()
            .append('th')
            .classed('so-card__table__header__cell', true)
            .text(d => d);
    }

    if (module.results) {
        module.containers.body = module.containers.table.append('tbody');
        module.containers.rows = module.containers.body
            .selectAll('tr')
            .data(module.results)
            .enter()
            .append('tr')
            .classed('so-card__table__row', true);
        module.containers.rows.each(function(d) {
            //console.log(d);
            const row = d3.select(this);
            row.selectAll('td')
                .data(
                    d3.merge([
                        [{ value: d.label }],
                        [...(module.byValues || []), ...['_overall_']].map(
                            cell => d.summary.row[cell] || { numerator: null, value: null }
                        )
                    ])
                )
                .enter()
                .append('td')
                .attr(
                    'class',
                    (d, i) =>
                        `so-card__table__row__cell ${
                            i === 0
                                ? 'so-card__table__row__cell-key'
                                : 'so-card__table__row__cell-value'
                        }`
                )
                .text(di => di.value || '');

            if (d.summary.rows) {
                row.classed('so-card__table__row--by-group', true);
                d.summary.rows
                    .filter(row => row.key !== '_overall_')
                    .reverse()
                    .forEach(row => {
                        const el = document.createElement('tr');
                        this.parentNode.insertBefore(el, this.nextSibling);
                        const byRow = d3
                            .select(el)
                            .classed('so-card__table__row so-card__table__row--by-value', true);
                        byRow
                            .selectAll('td')
                            .data(
                                d3.merge([
                                    [{ value: row.key }],
                                    [...(module.byValues || []), ...['_overall_']].map(
                                        cell => row[cell] || { numerator: null, value: null }
                                    )
                                ])
                            )
                            .enter()
                            .append('td')
                            .attr(
                                'class',
                                (di, i) =>
                                    `so-card__table__row__cell ${
                                        i === 0
                                            ? 'so-card__table__row__cell-key'
                                            : 'so-card__table__row__cell-value'
                                    }`
                            )
                            .text(di => di.value || '');
                    });
            }
        });
    }
}
