export default function dataSpecifications() {
    this.settings.modules.forEach(module => {
        module.variables = Array.from(
            new Set(
                d3.merge(
                    module.results.map(result =>
                        result.subset ? result.subset.map(subset => subset.key) : []
                    )
                )
            )
        );
    });
}
