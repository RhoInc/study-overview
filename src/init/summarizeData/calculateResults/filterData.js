export default function filterData(result) {
    result.data = this.data;
    result.by = this.by;
    result.subset.forEach(sub => {
        result.data = result.data
            .filter(d => sub.values.includes(d[sub.key]));
    });
    result.by.values.forEach(value => {
        value.data = value.value !== 'Total'
            ? result.data.filter(d => d[result.by.key] === value.value)
            : result.data.slice();
    });
}
