export default function checkDataSpecification(data) {
    let datasets;

    if (Array.isArray(data) && !data[0].hasOwnProperty('data')) datasets = [{ data }];
    else datasets = data;

    datasets.forEach(dataset => {
        dataset.variables = Object.keys(dataset.data[0]);

        // Attach specified module to dataset.
        if (dataset.hasOwnProperty('spec')) {
            dataset.module = this.settings.modules.find(module => module.spec === dataset.spec);
        }
        // Detect module by comparing variables in dataset with variables in module specification.
        else {
            const matches = this.settings.modules.map(module => {
                const match = JSON.parse(JSON.stringify(module));
                match.matching = 0;
                match.total = match.variables.length;
                match.variables.forEach(variable => {
                    match.matching = match.matching + dataset.variables.includes(variable);
                });
                match.proportion = match.matching / match.total;
                return match;
            });

            // Attach module with the most matching variables to dataset.
            dataset.module = this.settings.modules.find(
                module =>
                    module.spec ===
                    matches.find(
                        match => match.proportion === d3.max(matches, match => match.proportion)
                    ).spec
            );

            dataset.spec = dataset.module ? dataset.module.spec : null;
        }
    });

    return datasets;
}
