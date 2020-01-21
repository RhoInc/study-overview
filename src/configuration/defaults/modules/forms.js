export default function forms() {
    return {
        spec: 'forms',
        title: 'Forms',
        unit: 'form',
        results: [
            {
                label: '# Forms',
                subset: [
                    {
                        key: 'is_partial_entry',
                        values: ['1']
                    }
                ],
                summary: 'count'
            },
            {
                label: 'Verified',
                subset: [
                    {
                        key: 'is_verified',
                        values: ['1']
                    }
                ],
                summary: 'count',
                denominator: '# Forms'
            },
            {
                label: 'Needs Verification',
                subset: [
                    {
                        key: 'needs_verification',
                        values: ['1']
                    }
                ],
                summary: 'count',
                denominator: '# Forms'
            },
            {
                label: 'Signed',
                subset: [
                    {
                        key: 'is_signed',
                        values: ['1']
                    }
                ],
                summary: 'count',
                denominator: '# Forms'
            },
            {
                label: 'Needs Signature',
                subset: [
                    {
                        key: 'needs_signature',
                        values: ['1']
                    }
                ],
                summary: 'count',
                denominator: '# Forms'
            },
            {
                label: 'Frozen',
                subset: [
                    {
                        key: 'is_frozen',
                        values: ['1']
                    }
                ],
                summary: 'count',
                denominator: '# Forms'
            },
            {
                label: 'Ready for Freeze',
                subset: [
                    {
                        key: 'ready_for_freeze',
                        values: ['1']
                    }
                ],
                summary: 'count',
                denominator: '# Forms'
            },
            {
                label: 'Locked',
                subset: [
                    {
                        key: 'is_locked',
                        values: ['1']
                    }
                ],
                summary: 'count',
                denominator: '# Forms'
            }
        ]
    };
}
