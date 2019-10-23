import summarizeData from '../summarizeData';
import createTable from '../createTable';

export default function groupBy() {
    const studyOverview = this;

    this.containers.groupBy = {
        main: this.containers.controls
            .append('div')
            .classed('so-control-group so-control-group--group-by', true),
    };
    this.containers.groupBy.label = this.containers.groupBy.main
        .append('span')
        .classed('so-control-group__label', true)
        .text('Group by');
    this.containers.groupBy.select = this.containers.groupBy.main
        .append('select')
        .classed('so-control-group__dropdown', true);
    this.containers.groupBy.options = this.containers.groupBy.select
        .selectAll('option')
            .data([{value_col: null, label: 'None'}, ...this.settings.groups])
            .enter()
        .append('option')
        .classed('so-control-group__dropdown__option', true)
        .property('selected', d => d.label === 'Site')
        .text(d => d.label);
    this.containers.groupBy.select.on('change', function() {
        const option = d3.select(this).selectAll('option:checked');
        const datum = option.datum();
        const group = datum.value_col;
        studyOverview.destroy();
        summarizeData.call(studyOverview, group);
        createTable.call(studyOverview, group);
    });
}
