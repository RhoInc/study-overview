export default function queries(module) {
    const data = module.data.data;
    const summary = [];

    // overall
    const nQueries = {
        key: '# Queries Generated',
        data: d3
            .set(
                data.map(
                    d => `${d.subjectnameoridentifier}||${d.folderinstancename}||${d.ecrfpagename}`
                )
            )
            .values()
            .sort() // TODO: use settings or data spec here
    };
    nQueries.values = nQueries.data.length;
    summary.push(nQueries);

    // by population
    //const populations = d3.nest()
    //    .key(d => d.population)
    //    .rollup(d => {
    //        const nQueries = {
    //            data: d3.set(d.map(di => di.subjid)).values().sort(),
    //        };
    //        nQueries.values = nQueries.data.length;

    //        return nQueries;
    //    })
    //    .entries(data);
    //populations.forEach(population => {
    //    population.data = population.values.data;
    //    population.values = population.values.values;
    //    summary.push(population);
    //});

    return summary;
}
