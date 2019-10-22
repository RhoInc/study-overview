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
                const transposed = data
                    .reduce(
                        (acc,cur) => {
                            const denominator = denominators ? denominators[cur.key].numerator : null;
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
                const colNest = nest(data, col);
                const colNestTransposed = transpose(colNest, denominators ? denominators.summary.row : null);

                // summarize by row variable
                const rowNest = row ? nest(data, row, d => d) : null;
                const rowNestTransposed = row
                    ? rowNest
                        .map(row => {
                            const nested = nest(row.values, col);
                            nested.key = row.key;
                            return nested;
                        })
                        .map(row => {
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
                result.data = module.data.slice();
                result.subset.forEach(sub => {
                    result.data = result.data
                        .filter(d => sub.values.includes(d[sub.key]));
                });
                result.summary = summarize(
                    result.data, // data
                    result.by, // row
                    by, // col
                    result.denominator // denominators
                );
            });
            data.summary = module.results
                .map(result => {
                    const summary = [];
                    if (result.summary.row)
                        summary.push({
                            label: result.label,
                            value: result.summary.row._overall_.value,
                            level: 1,
                        });
                    if (result.summary.rows)
                        result.summary.rows.forEach(row => {
                            summary.push({
                                label: row.key,
                                value: row._overall_.value,
                                level: 2,
                            });
                        });
                    return summary;
                })
                .reduce(
                    (acc,cur) => {
                        cur.filter(d => d.label !== '_overall_').forEach(d => acc.push(d));
                        return acc;
                    },
                    []
                );
        } else {
            console.warn(`Data specification [ ${data.spec} ] is invalid.`);
        }
    });
}
