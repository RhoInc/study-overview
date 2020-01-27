import modules from './defaults/modules';

export default function defaults() {
    const defaults = {
        site_col: ['site', 'site_name', 'sitename'],
        id_col: ['usubjid', 'subjid', 'subjectnameoridentifier'],
        visit_col: ['visit', 'avisit', 'visit_name', 'folderinstancename'],
        visit_order_col: ['visitnum', 'avisitn', 'visit_number', 'folder_ordinal'],
        form_col: ['ecrfpagename'],
        form_order_col: ['form_number', 'form_ordinal'],
        groups: [
            {
                value_col: '_site_',
                label: 'Site'
            },
            {
                value_col: 'SEX',
                label: 'Sex'
            },
            {
                value_col: 'RACE',
                label: 'Race'
            }
        ],
        modules
    };

    return defaults;
}
