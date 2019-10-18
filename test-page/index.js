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
        const data = texts
            .map((text,i) => {
                return {
                    data: d3.csv.parse(text),
                    spec: files[i].spec,
                };
            });
        const instance = studyOverview(
            '#container',
            {
            }
        );
        instance.init(data);
    });
