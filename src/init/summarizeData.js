import attachData from './summarizeData/attachData';
import summarize from './summarizeData/summarize';
//import defineTableData from './summarizeData/defineTableData';

export default function summarizeData(by = null) {
    this.data.forEach(dataset => {
        // Match data spec to module.
        const module = dataset.module; // TODO: maintain a 1-to-1 module-to-dataset relationship?

        // Attach data properties to module.
        if (module) {
            attachData.call(module, dataset);

            if (by) {
                module.byValues = d3
                    .set(dataset.data.map(d => d[by]))
                    .values()
                    .sort();
                dataset.byValues = module.byValues.slice();
            } else {
                delete module.byValues;
                delete dataset.byValues;
            }

            module.results.forEach(result => {
                result.data = module.data.slice();
                result.subset.forEach(sub => {
                    result.data = result.data.filter(d => sub.values.includes(d[sub.key]));
                });
                result.summary = summarize(
                    result.data, // data
                    result.by, // row
                    by, // col
                    result.denominator // denominators
                );
            });

            //defineTableData.call(this, module, by);
        } else {
            console.warn(`Data specification [ ${dataset.spec} ] is invalid.`);
        }
    });
}
