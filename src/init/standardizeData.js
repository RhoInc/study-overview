import standardizeVariable from './standardizeData/standardizeVariable';

export default function standardizeData() {
    const dataMappings = Object.keys(this.settings)
        .filter(key => /col$/.test(key))
        .map(key => {
            return {
                setting: key,
                variable: `_${key.replace(/_col$/, '')}_`.replace(/^_id_$/, '_participant_'),
            };
        });

    this.data.forEach(data => {
        // Capture available variables.
        const variables = Object.keys(data.data[0]);

        // Standardize variables.
        dataMappings.forEach(dataMapping => {
            data[dataMapping.setting] = standardizeVariable.call(this, dataMapping.setting, variables);
        });

        // Attach variable with standard name to data array.
        data.data.forEach((d,i) => {
            dataMappings.forEach((dataMapping,j) => {
                d[dataMapping.variable] = d[data[dataMapping.setting]];
            });
        });

        // Attach available variables to data object.
        data.variables = Object.keys(data.data[0]);
    });
}
