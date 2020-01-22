import printSummary from './createTable/printSummary';
import printDataset from './createTable/printDataset';

export default function createTable(by = null) {
    this.data.forEach(dataset => {
        if (dataset.module) printSummary.call(this, dataset, by);
        else printDataset.call(this, dataset, by);
    });
}
