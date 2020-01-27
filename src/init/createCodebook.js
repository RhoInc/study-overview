export default function createCodebook(by = null) {
    this.data.forEach(dataset => {
        if (!dataset.spec) {
            dataset.containers.tableIcon.classed('so-hidden', true);
            dataset.containers.codebookIcon.classed('so-card__icon--active', true);
            dataset.containers.table.classed('so-hidden', true);
            dataset.containers.codebook.classed('so-hidden', false);

            if (!dataset.containers.codebook.classed('so-initialized')) {
                dataset.containers.codebook.classed('so-initialized', true);
                dataset.codebook = new webcodebook.createCodebook(
                    `.so-card--${dataset.element_id} .so-card__codebook`,
                    {}
                );

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
        }

        dataset.containers.codebookIcon.on('click', () => {
            dataset.containers.tableIcon.classed('so-card__icon--active', false);
            dataset.containers.codebookIcon.classed('so-card__icon--active', true);
            dataset.containers.table.classed('so-hidden', true);
            dataset.containers.codebook.classed('so-hidden', false);

            if (!dataset.containers.codebook.classed('so-initialized')) {
                dataset.containers.codebook.classed('so-initialized', true);
                dataset.codebook = new webcodebook.createCodebook(
                    `.so-card--${dataset.element_id} .so-card__codebook`,
                    {}
                );

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
        });
    });
}
