const files = [
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/adam/adsl.csv',
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/visits.csv',
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/forms.csv',
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/queries.csv',
].map(file => {
    return {
        url: file,
        spec: file.split('/').pop().split('.')[0].replace('adsl', 'participants'),
        response: fetch(file).then(response => response.text()),
    };
});

Promise
    .all(files.map(file => file.response))
    .then(texts => {
        const datasets = texts
            .map((text,i) => {
                return {
                    data: d3.csv.parse(text),
                    spec: files[i].spec,
                };
            });
        const age_cutoffs = [14, 28, 56, 112];
        const ageRanges = age_cutoffs.map((d, i) =>
            i > 0 ? [age_cutoffs[i - 1], d] : [0, d]
        );
        ageRanges.push([age_cutoffs[age_cutoffs.length - 1], null]);
        const ageRangeCategories = age_cutoffs.every(age_range => age_range % 7 === 0)
            ? ageRanges.map((ageRange, i) =>
                i < ageRanges.length - 1
                    ? `${ageRange.map(days => days / 7).join('-')} wks`
                    : `>${ageRange[0] / 7} wks`
            )
            : ageRanges.map((ageRange, i) =>
                i < ageRanges.length - 1
                    ? `${ageRange.join('-')} days`
                    : `>${ageRange[0]} days`
            );
        const queries = datasets
            .find(dataset => dataset.spec === 'queries');
        queries.data
            .forEach(d => {
                const age = +d.odays;
                ageRanges.forEach((ageRange, i) => {
                    if (i === 0 && ageRange[0] <= age && age <= ageRange[1])
                        d.queryage = ageRangeCategories[i];
                    else if (i === ageRanges.length - 1 && ageRange[0] < age)
                        d.queryage = ageRangeCategories[i];
                    else if (ageRange[0] < age && age <= ageRange[1])
                        d.queryage = ageRangeCategories[i];
                });
            });
        const instance = studyOverview(
            '#container',
            {
            }
        );
        instance.init(datasets);
    });
