import standardizeData from './init/standardizeData';
import mergeData from './init/mergeData';
import createControls from './init/createControls';
import summarizeData from './init/summarizeData';
import createTable from './init/createTable';

export default function init(data) {
    this.data = data;
    standardizeData.call(this);
    mergeData.call(this);
    createControls.call(this);
    //summarizeData.call(this, '_site_');
    //createTable.call(this, '_site_');
    summarizeData.call(this);
    createTable.call(this);
}
