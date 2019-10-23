export default function calculateDenominator(result) {
    console.log(result);
    if (result.denominator) {
        const denominator = this.results
            .find(result1 => result1.label === result.denominator);

        if (denominator) {
            result.num = result.n;
            result.den = denominator.value;
            result.pct = result.num/result.den;
            result.value = `${d3.format(' 6d')(result.num)} (${d3.format('2%')(result.pct)})`;

            result.by.values.forEach(value => {
                value.num = value.n;
                value.den = denominator.by.values
                    .find(value1 => value1.value === value.value);
                value.pct = result.num/result.den;
                value.value = `${d3.format(' 6d')(result.num)} (${d3.format('2%')(result.pct)})`;
            });
        } else {
            result.value = d3.format(' 6d')(result.n);

            result.by.values.forEach(value => {
                value.value = d3.format(' 6d')(value.n);
            });
        }
    } else {
        result.value = d3.format(' 6d')(result.n);

        result.by.values.forEach(value => {
            value.value = d3.format(' 6d')(value.n);
        });
    }
}
