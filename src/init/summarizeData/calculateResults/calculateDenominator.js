export default function calculateDenominator(result) {
    if (result.denominator) {
        const denominator = this.results.find(result1 => result1.label === result.denominator);
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
}
