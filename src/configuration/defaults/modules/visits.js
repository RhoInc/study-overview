export default function visits() {
    return {
        spec: 'visits',
        title: 'Visits',
        unit: 'visit',
        results: [
            {
                label: '# Visits',
                subset: [],
                summary: 'count'
            },
            {
                label: 'Visit Status',
                subset: [
                    {
                        key: 'visit_status',
                        values: ['Completed', 'Expected', 'Overdue', 'Missed']
                    }
                ],
                summary: 'count',
                denominator: '# Visits',
                by: 'visit_status'
            }
        ]
    };
}
