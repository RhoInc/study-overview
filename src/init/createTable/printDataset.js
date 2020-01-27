export default function printDataset(dataset, by) {
    dataset.containers = {
        card: this.containers.main
            .append('div')
            .datum(null)
            .classed('so-card so-card--unidentified', true)
    };
    dataset.containers.header = dataset.containers.card
        .append('div')
        .append('h4')
        .classed('so-card__header', true)
        .text(
            `Unidentified dataset (${dataset.data.length} obs. of ${
                Object.keys(dataset.data[0]).length
            } variables)`
        );
    dataset.containers.info = dataset.containers.card
        .append('span')
        .classed('so-card__info', true)
        .html('&#9432;');
    const id = `so-card__table--codebook-${d3.selectAll('.so-card__table--codebook').size() + 1}`;
    dataset.containers.table = dataset.containers.card
        .append('div')
        .classed('so-card__table so-card__table--codebook', true)
        .attr('id', id);
    dataset.codebook = new webcodebook.createCodebook(`#${id}`, {});
    dataset.codebook.init(
        dataset.data.map(d => {
            const datum = {};
            for (const variable in d)
                if (
                    ![
                        '_site_',
                        '_participant_',
                        '_visit_',
                        '_visit_order_',
                        '_form_',
                        '_form_order_'
                    ].includes(variable)
                )
                    datum[variable] = d[variable];
            return datum;
        })
    );
}
