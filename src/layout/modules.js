import tableIcon from './table-icon';
import codebookIcon from './codebook-icon';
import infoIcon from './info-icon';

export default function modules(modules) {
    this.containers.cards = this.containers.main
        .selectAll('div.so-card')
        .data(modules)
        .enter()
        .append('div')
        .classed('so-card', true);
    this.containers.headers = this.containers.cards
        .append('div')
        .append('h4')
        .classed('so-card__header', true)
        .text(d => d.title);
    this.containers.icons = this.containers.cards
        .selectAll('span')
        .data([
            {
                label: 'table',
                icon: tableIcon.join('\n')
            },
            {
                label: 'codebook',
                icon: codebookIcon.join('\n')
            },
            {
                label: 'info',
                icon: infoIcon.join('\n')
            }
        ])
        .enter()
        .append('span')
        .attr({
            class: d => `so-card__icon so-card__icon--${d.label}`,
            title: d => `View ${d.label}`
        })
        .html(d => d.icon);
    this.containers.tables = this.containers.cards
        .append('div')
        .append('table')
        .classed('so-card__table', true);
    this.containers.codebooks = this.containers.cards
        .append('div')
        .classed('so-card__codebook', true);
}
