import './util/polyfills';

import configuration from './configuration';
import layout from './layout';
import styles from './styles';
import init from './init';
import destroy from './destroy';

export default function studyOverview(element = 'body', settings = {}) {
    const studyOverview = {
        element,
        settings,
        init,
        destroy,
    };

    configuration.call(studyOverview);
    layout.call(studyOverview);
    styles.call(studyOverview);

    return studyOverview;
}
