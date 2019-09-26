import filterData from './filterData';
import calculateNumerator from './calculateNumerator';
import calculateDenominator from './calculateDenominator';
import stratifyRowWise from './stratifyRowWise';

export default function stratifyColWise(result, by, module) {
    if (by) {
        result.by = {
            values: d3.set(result.data.map(d => d[by]))
                .values()
                .sort()
                .map(value => {
                    return {
                        denominator: result.denominator,
                        header: value,
                        label: result.label,
                        subset: [{key: by, values: [value]}, ...result.subset],
                        summary: result.summary,
                    };
                }),
        };
        result.by.values.forEach(byValue => {
            filterData(byValue, module);
            calculateNumerator(byValue);
            calculateDenominator(byValue, module);
            stratifyRowWise(byValue);
        });
    }
}
