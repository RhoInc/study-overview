export default function transpose(data, denominators) {
    const transposed = data.reduce((acc, cur) => {
        const denominator = denominators ? denominators[cur.key].numerator : null;
        acc[cur.key] = {
            numerator: cur.values,
            denominator: denominator,
            value: denominator
                ? `${d3.format('6,d')(cur.values)} (${d3.format('2%')(cur.values / denominator)})`
                : d3.format('6,d')(cur.values)
        };

        return acc;
    }, {});

    return transposed;
}
