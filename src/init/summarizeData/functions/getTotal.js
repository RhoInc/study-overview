export default function getTotal(data, keys) {
    const total = {
        key: '# Subjects Total',
        data: d3.set(data.map(d => keys.map(key => d[key]).join('||'))).values().sort(), // TODO: use settings or data spec here
    };
    total.values = total.data.length;

    return total;
}
