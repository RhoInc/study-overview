import getTotal from './functions/getTotal';

export default function accrual(module, by = null) {
    const data = module.data.data;
    const summary = [];

    // overall
    const nSubjects = {
        key: '# Subjects Total',
        data: d3.set(data.map(d => d.subjid)).values().sort(), // TODO: use settings or data spec here
    };
    nSubjects.values = nSubjects.data.length;
    summary.push(nSubjects);
    const total = getTotal(data, ['subjid']);
    console.log(nSubjects);
    console.log(total);

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
        .entries(data);
    populations.forEach(population => {
        population.data = population.values.data;
        population.values = population.values.values;
        summary.push(population);
    });

    return summary;
}
