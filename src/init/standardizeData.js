import standardizeVariable from './standardizeData/standardizeVariable';

export default function standardizeData() {
    const cols = Object.keys(this.settings)
        .filter(key => /col$/.test(key));
    const variables = cols
        .map(col => `_${col.replace(/_col$/, '')}_`.replace(/^_id_$/, '_participant_'));

    this.data.forEach(data => {
        // Capture available variables.
        data.variables = Object.keys(data.data[0]);

        // Standardize variables.
        cols.forEach(col => {
            data[col] = standardizeVariable.call(this, col, data.variables);
        });

        // Attach variable with standard name to data array.
        data.data.forEach((d,i) => {
            cols.forEach((col,j) => {
                const variable = variables[j];
                d[variable] = d[data[col]];
            });
        });
    });
}
