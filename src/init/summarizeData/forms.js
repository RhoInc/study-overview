export default function forms(module) {
    const data = module.data.data;
    const summary = [];

    // overall
    const nForms = {
        key: '# Pages Started',
        data: d3.set(data.map(d => `${d.subjectnameoridentifier}||${d.folderinstancename}||${d.ecrfpagename}`)).values().sort(), // TODO: use settings or data spec here
    };
    nForms.values = nForms.data.length;
    summary.push(nForms);

    // by population
    //const populations = d3.nest()
    //    .key(d => d.population)
    //    .rollup(d => {
    //        const nForms = {
    //            data: d3.set(d.map(di => di.subjid)).values().sort(),
    //        };
    //        nForms.values = nForms.data.length;

    //        return nForms;
    //    })
    //    .entries(data);
    //populations.forEach(population => {
    //    population.data = population.values.data;
    //    population.values = population.values.values;
    //    summary.push(population);
    //});

    return summary;
}
