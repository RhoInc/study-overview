export default function defaults() {
    return {
        site_col: ['site', 'site_name', 'sitename'],
        id_col: ['subjid', 'subjectnameoridentifier'],
        visit_col: ['visit_name', 'folderinstancename'],
        form_col: ['ecrfpagename'],
        modules: [
            {
                spec: 'accrual',
            },
            {
                spec: 'visits',
            },
            {
                spec: 'forms',
            },
            {
                spec: 'queries',
            },
        ],
    };
}
