export default function captureRequiredVariables() {
    this.settings.modules.forEach(module => {
        module.variables = [];
        module.results.forEach(result => {
            // subset variables
            if (result.subset)
                result.subset.forEach(subset => {
                    if (!module.variables.includes(subset.key)) module.variables.push(subset.key);
                });

            // row-wise by variables
            if (result.by)
                if (!module.variables.includes(result.by)) module.variables.push(result.by);
        });
    });
}
