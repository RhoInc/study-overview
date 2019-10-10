import standardizeData from './init/standardizeData';
import summarizeData from './init/summarizeData';
import createTable from './init/createTable';

export default function init(data) {
    this.data = data;
    standardizeData.call(this);
    summarizeData.call(this);//, '_site_');
    //createTable.call(this);
}
