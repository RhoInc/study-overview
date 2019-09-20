export default function visits(data) {
    const summary = [];

    // overall
    const nVisits = {
        key: '# Visits',
        data: d3.set(data.data.map(d => `${d.subjectnameoridentifier}||${d.folderinstancename}||${d.ecrfpagename}`)).values().sort(), // TODO: use settings or data spec here
    };
    nVisits.values = nVisits.data.length;
    summary.push(nVisits);

    // by population
    //const populations = d3.nest()
    //    .key(d => d.population)
    //    .rollup(d => {
    //        const nVisits = {
    //            data: d3.set(d.map(di => di.subjid)).values().sort(),
    //        };
    //        nVisits.values = nVisits.data.length;

    //        return nVisits;
    //    })
    //    .entries(data.data);
    //populations.forEach(population => {
    //    population.data = population.values.data;
    //    population.values = population.values.values;
    //    summary.push(population);
    //});

    return summary;
}
