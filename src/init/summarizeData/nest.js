export default function nest(data, key, rollup = d => d.length) {
    const overall = data.map(d => {
        const datum = Object.assign({}, d);
        datum[key] = '_overall_';

        return datum;
    });
    const nested = d3
        .nest()
        .key(d => d[key])
        .rollup(rollup)
        .entries(key ? data.concat(overall) : overall)
        .sort((a, b) => (a.key < b.key ? -1 : 1));

    return nested;
}
