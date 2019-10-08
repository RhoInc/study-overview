import attachData from './summarizeData/attachData';
import calculateResults from './summarizeData/calculateResults';

export default function summarizeData(by = null) {
    this.data.forEach(data => {
        // Match data spec to module.
        const module = this.settings.modules
            .find(module => module.spec === data.spec);

        // Attach data properties to module.
        if (module) {
            attachData.call(module, data);

            const nest = (data, key, rollup = d => d.length) => {
                const nested = d3.nest()
                    .key(d => d[key])
                    .rollup(rollup)
                    .entries(data)
                    .sort((a,b) => a.key < b.key ? -1 : 1);

                return nested;
            };

            const transpose = (data) => {
                const transposed = data
                    .reduce(
                        (acc,cur) => {
                            acc[cur.key] = cur.values;
                            return acc;
                        },
                        {}
                    );

                return transposed;
            };

            const summarize = (data, row = null, col = null) => {
                const keys = [row,col]
                    .filter(key => key !== null && data[0].hasOwnProperty(key));
                console.log('----------------------------------------------------------------------------------------------------');

                if (row) console.log(`row: ${row}`);
                const rowNest = row ? nest(data, row, d => d) : null;
                const rowNestTransposed = row
                    ? rowNest
                        .map(row => nest(row.values, col))
                        .map(row => transpose(row))
                    : null;
                console.table(rowNestTransposed);

                if (col) console.log(`col: ${col}`);
                const colNest = col ? nest(data, col) : null;
                const colNestTransposed = col
                    ? transpose(colNest)
                    : null;
                console.table(colNestTransposed);

                //console.log(colNestTransposed);
                //console.log(rowNestTransposed);
                //const tabulated = [...colNestTransposed, ...rowNestTransposed]
                //console.log(tabulated);

                //return tabulated;
            };

            module.results.forEach(result => {
                result.data = module.data.slice();
                result.subset.forEach(sub => {
                    result.data = result.data
                        .filter(d => sub.values.includes(d[sub.key]));
                });
                result.summary = summarize(
                    result.data,
                    result.by,
                    by
                );
                //console.log(result.summary);
            });
            //module.by = {
            //    key: by,
            //    values: module.variables.includes(by)
            //        ? d3.set(data.data.map(d => d[by]))
            //            .values()
            //            .sort()
            //            .map(value => {
            //                return {
            //                    value,
            //                };
            //            }).concat({ value: 'Total'})
            //        : [{ value: 'Total' }],
            //};
            //calculateResults.call(module);
        } else {
            console.warn(`Data specification [ ${data.spec} ] is invalid.`);
        }
    });
}
