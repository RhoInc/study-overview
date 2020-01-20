function dataManipulation(datasets) {
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
}
