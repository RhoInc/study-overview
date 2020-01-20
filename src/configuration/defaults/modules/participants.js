export default function participants() {
    return {
        spec: 'participants',
        title: 'Participants',
        unit: 'participant',
        results: [
            {
                label: 'Screening',
                subset: [
                    {
                        key: 'SBJTSTAT',
                        values: ['Ongoing']
                    },
                    {
                        key: 'RFENDY',
                        values: [
                            '6',
                            '15',
                            '16',
                            '20',
                            '21',
                            '22',
                            '28',
                            '29',
                            '30',
                            '32',
                            '42',
                            '43',
                            '44',
                            '47'
                        ]
                    }
                ],
                summary: 'count',
                denominator: '# Participants'
            },
            {
                label: 'Screen Failed',
                subset: [
                    {
                        key: 'SBJTSTAT',
                        values: ['Screen Failure']
                    }
                ],
                summary: 'count',
                denominator: '# Participants'
            },
            {
                label: 'Enrolled',
                subset: [
                    {
                        key: 'SBJTSTAT',
                        values: ['Ongoing']
                    }
                ],
                summary: 'count',
                denominator: '# Participants'
            },
            {
                label: 'Completed',
                subset: [
                    {
                        key: 'SBJTSTAT',
                        values: ['Completed']
                    }
                ],
                summary: 'count',
                denominator: '# Participants'
            },
            {
                label: 'Early Termination',
                subset: [
                    {
                        key: 'SBJTSTAT',
                        values: ['Early Termination']
                    }
                ],
                summary: 'count',
                denominator: '# Participants'
            }
        ]
    };
}
