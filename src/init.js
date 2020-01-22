import checkDataSpecification from './init/checkDataSpecification';
import standardizeData from './init/standardizeData';
import mergeData from './init/mergeData';
import createControls from './init/createControls';
import summarizeData from './init/summarizeData';
import createTable from './init/createTable';

export default function init(data) {
    this.data = checkDataSpecification.call(this, data);

    this.settings.datasets = this.data.map(dataset => dataset.spec);

    this.settings.modules = this.settings.modules.filter(module =>
        this.settings.datasets.includes(module.spec)
    );

    standardizeData.call(this);
    mergeData.call(this);
    createControls.call(this);
    summarizeData.call(this, '_site_');
    createTable.call(this, '_site_');

    this.containers.cards.style('display', d =>
        this.settings.datasets.includes(d.spec) ? 'inline-block' : 'none'
    );
}
