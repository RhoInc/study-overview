export default function defineTableData(module, by) {
    const summary = module.results
        .map(result => {
            const summary = [];

            if (result.summary.row) {
                const obj = {
                    label: result.label,
                    value: result.summary.row._overall_.value,
                    level: 1
                };

                if (by)
                    module.byValues.forEach(byValue => {
                        obj[byValue] = result.summary.row[byValue]
                            ? result.summary.row[byValue].value
                            : null;
                    });

                summary.push(obj);
            }

            if (result.summary.rows) {
                result.summary.rows.forEach(row => {
                    const obj = {
                        label: row.key,
                        value: row._overall_.value,
                        level: 2
                    };

                    if (by)
                        module.byValues.forEach(byValue => {
                            obj[byValue] = row[byValue] ? row[byValue].value : null;
                        });

                    summary.push(obj);
                });
            }

            return summary;
        })
        .reduce((acc, cur) => {
            cur.filter(d => d.label !== '_overall_').forEach(d => acc.push(d));
            return acc;
        }, []);

    return summary;
}
