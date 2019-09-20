import summarizeData from './init/summarizeData';
import createTable from './init/createTable';

export default function init(data) {
    this.data = data;
    summarizeData.call(this);
    createTable.call(this);
}
