import attachData from './summarizeData/attachData';
import calculateResults from './summarizeData/calculateResults';

export default function summarizeData(by = null) {
    this.data.forEach(data => {
        // Match data spec to module.
        const module = this.settings.modules
            .find(module => module.spec === data.spec);

        // Attach data properties to module.
        if (module) {
            attachData.call(module, data);
            module.by = {
                key: by,
                values: module.variables.includes(by)
                    ? d3.set(data.data.map(d => d[by]))
                        .values()
                        .sort()
                        .map(value => {
                            return {
                                value,
                            };
                        }).concat({ value: 'Total'})
                    : [{ value: 'Total' }],
            };
            calculateResults.call(module);
        } else console.warn(`Data specification [ ${data.spec} ] is invalid.`);
    });
}
