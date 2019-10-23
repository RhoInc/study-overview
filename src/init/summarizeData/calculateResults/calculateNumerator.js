export default function calculateNumerator(result) {
    result.n = result.data.length;
    result.by.values.forEach(value => {
        value.n = value.data.length;
    });
}
