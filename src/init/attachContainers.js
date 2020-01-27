import modules from '../layout/modules';

import tableIcon from '../layout/table-icon';
import codebookIcon from '../layout/codebook-icon';
import infoIcon from '../layout/info-icon';

export default function attachContainers() {
    //modules.call(this, this.data);
    this.data.forEach((dataset, i) => {
        dataset.element_id = i;
        if (dataset.module && /-0$/.test(dataset.id)) {
            dataset.containers = {
                card: this.containers.cards
                    .filter(d => d.spec === dataset.spec)
                    .classed(`so-card--${dataset.element_id}`, true)
            };
            (dataset.containers.header = dataset.containers.card.selectAll('.so-card__header')),
                (dataset.containers.tableIcon = dataset.containers.card
                    .selectAll('.so-card__icon--table')
                    .classed('so-card__icon--active', true));
            dataset.containers.codebookIcon = dataset.containers.card.selectAll(
                '.so-card__icon--codebook'
            );
            dataset.containers.infoIcon = dataset.containers.card.selectAll('.so-card__icon--info');
            dataset.containers.table = dataset.containers.card.selectAll('.so-card__table');
            dataset.containers.codebook = dataset.containers.card.selectAll('.so-card__codebook');
        }
        // TODO: avoid reproducing the same code here as in ../layout/modules
        else {
            dataset.containers = {
                card: this.containers.main
                    .append('div')
                    .classed('so-card', true)
                    .classed(`so-card--${dataset.element_id}`, true)
            };
            dataset.containers.header = dataset.containers.card
                .append('div')
                .classed('so-card__header', true)
                .text(dataset.module ? dataset.module.title : 'Unidentified dataset');
            dataset.containers.tableIcon = dataset.containers.card
                .append('div')
                .datum({
                    label: 'table',
                    icon: tableIcon.join('\n')
                })
                .classed('so-card__icon so-card__icon--table', true)
                .classed('so-card__icon--active', !!dataset.spec)
                .html(d => d.icon);
            dataset.containers.codebookIcon = dataset.containers.card
                .append('div')
                .datum({
                    label: 'codebook',
                    icon: codebookIcon.join('\n')
                })
                .classed('so-card__icon so-card__icon--codebook', true)
                .classed('so-card__icon--active', !dataset.spec)
                .html(d => d.icon);
            dataset.containers.infoIcon = dataset.containers.card
                .append('div')
                .datum({
                    label: 'info',
                    icon: infoIcon.join('\n')
                })
                .classed('so-card__icon so-card__icon--info', true)
                .html(d => d.icon);
            dataset.containers.table = dataset.containers.card
                .append('div')
                .classed('so-card__table', true);
            dataset.containers.codebook = dataset.containers.card
                .append('div')
                .classed('so-card__codebook', true);
        }

        dataset.containers.header.text(
            `${dataset.containers.header.text()} (${d3.format(',1d')(
                dataset.nObs
            )} obs. of ${d3.format(',1d')(dataset.nVariables)} variables)`
        );
    });
}
