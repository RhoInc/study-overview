export default function styles() {
    const styles = [
        '.study-overview {' +
            '    display: flex;' +
            '    flex-wrap: wrap;' +
            '    flex-direction: row;' +
            '}',
        '.so-hidden {' + '    display: none !important;' + '}',
        '.so-controls {' + '    width: calc(100% - 36px);' + '    margin: 0px 18px;' + '}',
        '.so-control-group {' + '    display: inline-block;' + '}',
        '.so-control-group--export {' +
            '    float: right;' +
            '    padding: 4px;' +
            '    border: 2px solid black;' +
            '    background: #aaa;' +
            '    color: black;' +
            '    font-weight: bold;' +
            '    border-radius: 4px;' +
            '    cursor: pointer;' +
            '}',
        '.so-control-group--export:hover {' +
            '    border: 2px solid #aaa;' +
            '    background: black;' +
            '    color: #aaa;' +
            '}',
        '.so-control-group--export .so-control-group__label {' + '    margin-right: 0px;' + '}',
        '.so-control-group__label {' + '    margin-right: 8px;' + '}',
        '.so-card {' +
            '    display: inline-block;' +
            '    width: calc(50% - 40px);' +
            '    margin: 18px;' +
            '    border: 1px solid #aaa;' +
            '    border-radius: 4px;' +
            '    overflow-x: auto;' +
            '    position: relative;' +
            '}',
        '.so-card--unidentified {' + '    width: calc(100% - 40px);' + '}',
        '.so-card .so-card__header,' +
            '.so-card .so-card__table {' +
            '    width: calc(100% - 36px);' +
            '    vertical-align: top;' +
            '    display: table;' +
            '}',
        '.so-card__header {' +
            '    font-size: 24px;' +
            '    margin: 4px 8px;' +
            '    padding: 4px 8px;' +
            '    font-weight: lighter;' +
            '    border-bottom: 1px solid #aaa;' +
            '}',
        '.so-card__icon {' +
            '    position: absolute;' +
            '    top: 8px;' +
            '    fill: #aaa;' +
            '    cursor: pointer;' +
            '}',
        '.so-card__icon--active {' + '    fill: #555;' + '}',
        '.so-card__icon--info {' +
            '    right: 16px;' +
            '    cursor: help;' +
            '    display: none;' +
            '}',
        '.so-card__icon--codebook {' +
            //'    right: 48px;' +
            '    right: 16px;' +
            '}',
        '.so-card__icon--table {' +
            //'    right: 78px;' +
            '    right: 48px;' +
            '}',
        '.so-card__table {' +
            '    border-collapse: collapse;' +
            '    border-spacing: 0;' +
            '    empty-cells: show;' +
            '    margin: 4px 8px;' +
            '    padding: 4px 8px;' +
            '    width: calc(100% - 16px);' +
            '}',
        '.so-card__codebook {' + '    margin: 4px 8px;' + '    padding: 4px 8px;' + '}',
        //'.so-card__codebook > .web-codebook {' +
        //    '    margin: 0 auto;' +
        //    '}',
        '.so-card__table__header {' + '}',
        '.so-card__table__header__cell {' + '    padding: .5em 1em;' + '}',
        '.so-card__table__row {' + '}',
        '.so-card__table__row:hover {' + '    outline: 1px solid blue;' + '}',
        '.so-card__table__row:nth-child(2n) {' + '    background: #f2f2f2;' + '}',
        '.so-card__table__row--by-group {' +
            '    border-top: 2px solid black;' +
            '    border-bottom: 2px solid black;' +
            '}',
        '.so-card__table__row__cell {' +
            '    border-width: 0 0 0 1px;' +
            '    font-size: inherit;' +
            '    margin: 0;' +
            '    overflow: visible;' +
            '    padding: .5em 1em;' +
            '}',
        '.so-card__table__row__cell:first-child {' + '    white-space: nowrap;' + '}',
        '.so-card__table__row__cell:not(:first-child) {' +
            "    font-family: 'Lucida Console';" +
            '    white-space: pre;' +
            '}',
        '.so-card__table__row--by-value .so-card__table__row__cell:first-child {' +
            '    padding-left: 3em;' +
            '}'
    ];

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
