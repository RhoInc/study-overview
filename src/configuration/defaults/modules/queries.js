export default function queries() {
    return {
        spec: 'queries',
        title: 'Queries',
        unit: 'query',
        results: [
            {
                label: '# Queries',
                subset: [],
                summary: 'count'
            },
            {
                label: 'Open Queries by Age Category',
                subset: [
                    {
                        key: 'querystatus',
                        values: ['Open']
                    }
                ],
                summary: 'count',
                denominator: '# Queries',
                by: 'queryage'
            },
            {
                label: 'Answered Queries by Marking Group',
                subset: [
                    {
                        key: 'querystatus',
                        values: ['Answered']
                    }
                ],
                summary: 'count',
                denominator: '# Queries',
                by: 'markinggroup'
            }
        ]
    };
}
