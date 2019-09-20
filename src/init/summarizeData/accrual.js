export default function accrual(data, by = null) {
    const summary = [];

    // overall
    const nSubjects = {
        key: '# Subjects Total',
        data: d3.set(data.data.map(d => d.subjid)).values().sort(), // TODO: use settings or data spec here
    };
    nSubjects.values = nSubjects.data.length;
    summary.push(nSubjects);

    // by population
    const populations = d3.nest()
        .key(d => d.population)
        .rollup(d => {
            const nSubjects = {
                data: d3.set(d.map(di => di.subjid)).values().sort(),
            };
            nSubjects.values = nSubjects.data.length;

            return nSubjects;
        })
        .entries(data.data);
    populations.forEach(population => {
        population.data = population.values.data;
        population.values = population.values.values;
        summary.push(population);
    });

    return summary;
}
