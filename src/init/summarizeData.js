export default function summarizeData() {
    this.data.forEach(data => {
        data.variables = Object.keys(data.data[0]);
        const module = this.settings.modules.find(module => module.spec === data.spec);

        // Attach data properties to module.
        if (module) {
            for (const property in data)
                if (!Object.keys(module).includes(property))
                    module[property] = data[property];

            // Summarize data with module results specifications.
            module.results.forEach(result => {
                result.data = module.data;
                result.subset.forEach(sub => {
                    result.data = result.data
                        .filter(d => sub.values.includes(d[sub.key]));
                });
                result.n = result.data.length;

                // handle denominators
                if (result.denominator) {
                    const denominator = module.results.find(result1 => result1.label === result.denominator);
                    if (denominator) {
                        result.num = result.n;
                        result.den = denominator.value;
                        result.pct = result.num/result.den;
                        result.value = `${d3.format(' 6d')(result.num)} (${d3.format('2%')(result.pct)})`;
                    } else {
                        result.value = d3.format(' 6d')(result.n);
                    }
                } else {
                    result.value = d3.format(' 6d')(result.n);
                }

                // handle stratification
                if (result.by) {
                    result.byValues = d3.nest()
                        .key(d => d[result.by])
                        .rollup(d => d.length)
                        .entries(result.data)
                        .sort((a,b) => a.key < b.key ? 1 : -1)
                        .map(d => {
                            d.label = d.key;
                            d.num = d.values;
                            d.den = result.n;
                            d.pct = d.num/d.den;
                            d.value = `${d3.format(' 6d')(d.num)} (${d3.format('2%')(d.pct)})`;

                            return d;
                        });
                }
            });
        }
    });
}
