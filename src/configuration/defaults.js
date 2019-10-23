export default function defaults() {
    return {
        site_col: ['site', 'site_name', 'sitename'],
        id_col: ['usubjid', 'subjid', 'subjectnameoridentifier'],
        visit_col: ['visit', 'avisit', 'visit_name', 'folderinstancename'],
        visit_order_col: ['visitnum', 'avisitn', 'visit_number', 'folder_ordinal'],
        form_col: ['ecrfpagename'],
        form_order_col: ['form_number', 'form_ordinal'],
        groups: [
            {
                value_col: '_site_',
                label: 'Site',
            },
            {
                value_col: 'SEX',
                label: 'Sex',
            },
            {
                value_col: 'RACE',
                label: 'Race',
            },
        ],
        modules: [
            {
                spec: 'participants',
                title: 'Participants',
                unit: 'participant',
                results: [
                    {
                        label: '# Participants',
                        subset: [],
                        summary: 'count',
                    },
                    {
                        label: 'Screening',
                        subset: [
                            {
                                key: 'SBJTSTAT',
                                values: ['Ongoing'],
                            },
                            {
                                key: 'RFENDY',
                                values: ['6', '15', '16', '20', '21', '22', '28', '29', '30', '32', '42', '43', '44', '47'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Participants',
                    },
                    {
                        label: 'Screen Failed',
                        subset: [
                            {
                                key: 'SBJTSTAT',
                                values: ['Screen Failure'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Participants',
                    },
                    {
                        label: 'Enrolled',
                        subset: [
                            {
                                key: 'SBJTSTAT',
                                values: [
                                    'Ongoing'
                                ],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Participants',
                    },
                    {
                        label: 'Completed',
                        subset: [
                            {
                                key: 'SBJTSTAT',
                                values: ['Completed'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Participants',
                    },
                    {
                        label: 'Early Termination',
                        subset: [
                            {
                                key: 'SBJTSTAT',
                                values: ['Early Termination'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Participants',
                    },
                ],
            },
            {
                spec: 'visits',
                title: 'Visits',
                unit: 'visit',
                results: [
                    {
                        label: '# Visits',
                        subset: [],
                        summary: 'count',
                    },
                    {
                        label: 'Visit Status',
                        subset: [
                            {
                                key: 'visit_status',
                                values: ['Completed', 'Expected', 'Overdue', 'Missed'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Visits',
                        by: 'visit_status',
                    },
                ],
            },
            {
                spec: 'forms',
                title: 'Forms',
                unit: 'form',
                results: [
                    {
                        label: '# Forms',
                        subset: [
                            {
                                key: 'is_partial_entry',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                    },
                    {
                        label: 'Verified',
                        subset: [
                            {
                                key: 'is_verified',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Forms',
                    },
                    {
                        label: 'Needs Verification',
                        subset: [
                            {
                                key: 'needs_verification',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Forms',
                    },
                    {
                        label: 'Signed',
                        subset: [
                            {
                                key: 'is_signed',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Forms',
                    },
                    {
                        label: 'Needs Signature',
                        subset: [
                            {
                                key: 'needs_signature',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Forms',
                    },
                    {
                        label: 'Frozen',
                        subset: [
                            {
                                key: 'is_frozen',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Forms',
                    },
                    {
                        label: 'Ready for Freeze',
                        subset: [
                            {
                                key: 'ready_for_freeze',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Forms',
                    },
                    {
                        label: 'Locked',
                        subset: [
                            {
                                key: 'is_locked',
                                values: ['1'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Forms',
                    },
                ],
            },
            {
                spec: 'queries',
                title: 'Queries',
                unit: 'query',
                results: [
                    {
                        label: '# Queries',
                        subset: [],
                        summary: 'count',
                    },
                    {
                        label: 'Open Queries by Age Category',
                        subset: [
                            {
                                key: 'querystatus',
                                values: ['Open'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Queries',
                        by: 'queryage',
                    },
                    {
                        label: 'Answered Queries by Marking Group',
                        subset: [
                            {
                                key: 'querystatus',
                                values: ['Answered'],
                            },
                        ],
                        summary: 'count',
                        denominator: '# Queries',
                        by: 'markinggroup',
                    },
                ],
            },
        ],
    };
}
