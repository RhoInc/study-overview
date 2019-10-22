import groupBy from './createControls/groupBy';
import generateExport from './createControls/generateExport';

export default function createControls() {
    groupBy.call(this);
    generateExport.call(this);
}
