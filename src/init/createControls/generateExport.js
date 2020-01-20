import defineXLSX from './generateExport/defineXLSX';
import exportXLSX from './generateExport/exportXLSX';

export default function generateExport() {
    this.containers.export = {
        main: this.containers.controls
            .append('div')
            .classed('so-control-group so-control-group--export', true)
    };
    this.containers.export.xlsx = this.containers.export.main
        .append('span')
        .classed('so-control-group__label', true)
        .text('Export');
    //this.containers.export.xlsx = this.containers.export.main
    //    .append('span')
    //    .classed('so-control-group__label', true)
    //    .text('PDF');
    this.containers.export.xlsx.on('click', () => {
        defineXLSX.call(this);
        exportXLSX.call(this);
    });
}
