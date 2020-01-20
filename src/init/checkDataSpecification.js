export default function checkDataSpecification(data) {
    let datasets;

    if (Array.isArray(data) && !data[0].hasOwnProperty('data')) datasets = [{ data }];
    else datasets = data;

    datasets.forEach(dataset => {
        dataset.variables = Object.keys(dataset.data[0]);
        if (dataset.hasOwnProperty('spec'))
            dataset.module = this.settings.modules.find(module => module.spec === dataset.spec);
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
            dataset.module = matches.find(
                match => match.proportion === d3.max(matches, match => match.proportion)
            );
            dataset.spec = dataset.module ? dataset.module.spec : null;
        }
    });

    this.settings.datasets = datasets.map(dataset => dataset.spec);
    this.settings.modules = this.settings.modules.filter(module =>
        this.settings.datasets.includes(module.spec)
    );

    return datasets;
}
