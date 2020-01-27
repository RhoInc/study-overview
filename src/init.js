import checkDataSpecification from './init/checkDataSpecification';
import standardizeData from './init/standardizeData';
import mergeData from './init/mergeData';

import createControls from './init/createControls';

import summarizeData from './init/summarizeData'; // TODO: rename summarizeDataset
import attachContainers from './init/attachContainers';
import createTable from './init/createTable';
import createCodebook from './init/createCodebook';

// TODO: group data functions together in a seperate function
// TODO: group dataset-level functions together in a separate function
export default function init(data) {
    // data functions
    this.data = checkDataSpecification.call(this, data);
    standardizeData.call(this);
    mergeData.call(this);

    // uniquely identify each dataset, even when multiple datasets match the same spec
    d3.nest()
        .key(d => d.spec)
        .rollup(d => {
            d.forEach((dataset, i) => {
                dataset.id = `${dataset.spec || 'unknown'}-${i}`;
            });

            return d;
        })
        .entries(this.data);

    // add list of available datasets to settings - not sure this is needed
    this.settings.datasets = this.data.map(dataset => dataset.spec);

    // filter modules on datasets with matching specs - not sure this is needed - better to attach modules to matching datasets
    this.settings.modules = this.settings.modules.filter(module =>
        this.settings.datasets.includes(module.spec)
    );

    createControls.call(this);

    // dataset-level functions
    attachContainers.call(this);
    summarizeData.call(this, '_site_');
    createTable.call(this, '_site_');
    createCodebook.call(this, '_site_');

    // hide modules without matching datasets
    this.containers.cards.style('display', d =>
        this.settings.datasets.includes(d.spec) ? 'inline-block' : 'none'
    );
}
