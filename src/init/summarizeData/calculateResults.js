import filterData from './calculateResults/filterData';
import calculateNumerator from './calculateResults/calculateNumerator';
import calculateDenominator from './calculateResults/calculateDenominator';
import stratifyRowWise from './calculateResults/stratifyRowWise';
import stratifyColWise from './calculateResults/stratifyColWise';

export default function calculateResults() {
    // Summarize data with module results specifications.
    this.results.forEach(result => {
        result.data = this.data;
        filterData.call(this, result);
        calculateNumerator.call(this, result);
        calculateDenominator.call(this, result);
        stratifyRowWise.call(this, result);
        //stratifyColWise.call(this, result);
    });
}
