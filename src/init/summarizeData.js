import attachData from './summarizeData/attachData';
import calculateResults from './summarizeData/calculateResults';

export default function summarizeData(by = null) {
    const byValues = [];
    this.data.forEach(data => {
        // Match data spec to module.
        const module = this.settings.modules
            .find(module => module.spec === data.spec);

        // Attach data properties to module.
        if (module) {
            attachData.call(module, data);

            if (by) {
                module.byValues = d3.set(data.data.map(d => d[by]))
                    .values()
                    .sort();
            }

            // nest by key variable
            const nest = (data, key, rollup = d => d.length) => {
                const overall = data
                    .map(d => {
                        const datum = Object.assign({}, d);
                        datum[key] = '_overall_';

                        return datum;
                    });
                const nested = d3.nest()
                    .key(d => d[key])
                    .rollup(rollup)
                    .entries(key ? data.concat(overall) : overall)
                    .sort((a,b) => a.key < b.key ? -1 : 1);

                return nested;
            };

            // transpose key values
            const transpose = (data, denominators) => {
                //console.log(denominators);
                const transposed = data
                    .reduce(
                        (acc,cur) => {
                            //console.log(cur.key);
                            const denominator = denominators ? denominators[cur.key].numerator : null;
                            //console.log(denominator);
                            acc[cur.key] = {
                                numerator: cur.values,
                                denominator: denominator,
                                value: denominator
                                    ? `${d3.format('6,d')(cur.values)} (${d3.format('2%')(cur.values/denominator)})`
                                    : d3.format('6,d')(cur.values),
                            };
                            return acc;
                        },
                        {}
                    );

                return transposed;
            };

            const summarize = (data, row = null, col = null, denominators = null) => {

                // summarize by col variable
                console.log(`col: ${col}`);
                const colNest = nest(data, col);
                //console.log(data);
                const colNestTransposed = transpose(colNest, denominators);

                // summarize by row variable
                console.log(`row: ${row}`);
                const rowNest = row ? nest(data, row, d => d) : null;
                if (row) console.log(colNestTransposed);
                const rowNestTransposed = row
                    ? rowNest
                        .map(row => {
                            //console.log(row);
                            const nested = nest(row.values, col);
                            nested.key = row.key;
                            return nested;
                        })
                        .map(row => {
                            console.log(row);
                            const transposed = transpose(row, colNestTransposed);
                            transposed.key = row.key;
                            return transposed;
                        })
                    : null;

                return {
                    row: colNestTransposed,
                    rows: rowNestTransposed,
                };
            };

            module.results.forEach(result => {
                console.log('----------------------------------------------------------------------------------------------------');
                console.log(result.label);
                result.data = module.data.slice();
                result.subset.forEach(sub => {
                    result.data = result.data
                        .filter(d => sub.values.includes(d[sub.key]));
                });
                result.denominators = result.denominator
                    ? module.results
                        .find(result1 => result1.label === result.denominator)
                        .summary
                        .row
                    : null;
                result.summary = summarize(
                    result.data,
                    result.by,
                    by,
                    result.denominators
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
