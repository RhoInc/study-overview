import headerStyle from './defineXLSX/headerStyle';
import bodyStyle from './defineXLSX/bodyStyle';
import workBook from './defineXLSX/workBook';
import addCell from './defineXLSX/addCell';
import clone from '../../../util/clone';

export default function defineXLSX() {
    const wb = new workBook();
    const wbOptions = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    };

    this.data.forEach(data => {
        const columns = data.byValues
            ? ['label', ...data.byValues, 'value']
            : ['label', 'value'];
        const headers = data.byValues
            ? ['', ...data.byValues, 'Overall']
            : null;

        const name = data.spec;
        const ws = {};
        const cols = columns
            .map((column,i) => {
                return {
                    wpx: i === 0 ? 250 : 100
                };
            });
        const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };

        // Header row
        if (data.byValues)
            headers.forEach((header, col) => {
                addCell(
                    wb,
                    ws,
                    header,
                    'c',
                    clone(headerStyle),
                    range,
                    0,
                    col
                );
            });

        // Data rows
        data.summary.forEach((d, row) => {
            columns.forEach((variable, col) => {
                const cellStyle = clone(bodyStyle);

                addCell(
                    wb,
                    ws,
                    col === 0
                        ? `${'-'.repeat(d.level - 1)} ${d[variable]}`
                        : d[variable] || '',
                    'c',
                    cellStyle,
                    range,
                    row + (!!data.byValues),
                    col
                );
            });
        });

        ws['!ref'] = XLSX.utils.encode_range(range);
        ws['!cols'] = cols;

        //const filterRange =
        //    'A1:' + String.fromCharCode(64 + columns.length) + (data.summary.length + (!!data.byValues));
        //ws['!autofilter'] = {
        //    ref: filterRange
        //};
        //ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'B2', activePane: 'bottomRight', state: 'frozen' };

        wb.SheetNames.push(name);
        wb.Sheets[name] = ws;
    });

    this.XLSX = XLSX.write(wb, wbOptions);
}
