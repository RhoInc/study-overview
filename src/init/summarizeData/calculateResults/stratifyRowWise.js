export default function stratifyRowWise(result) {
    if (result.by) {
        result.byValues = d3
            .nest()
            .key(d => d[result.by])
            .rollup(d => d.length)
            .entries(result.data)
            .sort((a, b) => (a.key < b.key ? 1 : -1))
            .map(d => {
                d.label = d.key;
                d.num = d.values;
                d.den = result.n;
                d.pct = d.num / d.den;
                d.value = `${d3.format(' 6d')(d.num)} (${d3.format('2%')(d.pct)})`;

                return d;
            });
    }
}
