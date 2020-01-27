import exportReportToXLSX from './dataExport/exportReportToXLSX';

export default function dataExport() {
    this.wrap.select('.export#report').on('click', () => {
        exportReportToXLSX.call(this);
    });
}
