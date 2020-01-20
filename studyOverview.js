(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3')))
        : typeof define === 'function' && define.amd
        ? define(['d3'], factory)
        : ((global = global || self), (global.studyOverview = factory(global.d3)));
})(this, function(d3$1) {
    'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, 'length')).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return undefined.

                return undefined;
            }
        });
    }

    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function value(valueToFind, fromIndex) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                } // 1. Let O be ? ToObject(this value).

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                var len = o.length >>> 0; // 3. If len is 0, return false.

                if (len === 0) {
                    return false;
                } // 4. Let n be ? ToInteger(fromIndex).
                //        (If fromIndex is undefined, this step produces the value 0.)

                var n = fromIndex | 0; // 5. If n = 0, then
                //    a. Let k be n.
                // 6. Else n < 0,
                //    a. Let k be len + n.
                //    b. If k < 0, let k be 0.

                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                function sameValueZero(x, y) {
                    return (
                        x === y ||
                        (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))
                    );
                } // 7. Repeat, while k < len

                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(valueToFind, elementK) is true, return true.
                    if (sameValueZero(o[k], valueToFind)) {
                        return true;
                    } // c. Increase k by 1.

                    k++;
                } // 8. Return false

                return false;
            }
        });
    }

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return -1.

                return -1;
            }
        });
    }

    function defaults() {
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
            modules: [
                {
                    spec: 'participants',
                    title: 'Participants',
                    unit: 'participant',
                    results: [
                        {
                            label: '# Participants',
                            subset: [],
                            summary: 'count'
                        },
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
                },
                {
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
                },
                {
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
                }
            ]
        };
    }

    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        }
    }

    function _iterableToArray(iter) {
        if (
            Symbol.iterator in Object(iter) ||
            Object.prototype.toString.call(iter) === '[object Arguments]'
        )
            return Array.from(iter);
    }

    function _nonIterableSpread() {
        throw new TypeError('Invalid attempt to spread non-iterable instance');
    }

    function clone(obj) {
        var copy; // Handle the 3 simple types, and null or undefined

        if (null == obj || 'object' != _typeof(obj)) return obj; // Handle Date

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        } // Handle Array

        if (obj instanceof Array) {
            copy = [];

            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }

            return copy;
        } // Handle Object

        if (obj instanceof Object) {
            copy = {};

            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }

            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    function defaultIsMergeableObject(value) {
        return isNonNullObject(value) && !isSpecial(value);
    }

    function isNonNullObject(value) {
        return !!value && _typeof(value) === 'object';
    }

    function isSpecial(value) {
        var stringValue = Object.prototype.toString.call(value);
        return stringValue === '[object RegExp]' || stringValue === '[object Date]';
    }

    function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
    }

    function cloneUnlessOtherwiseSpecified(value, options) {
        return options.clone !== false && options.isMergeableObject(value)
            ? merge(emptyTarget(value), value, options)
            : value;
    }

    function defaultArrayMerge(target, source, options) {
        return target.concat(source).map(function(element) {
            return cloneUnlessOtherwiseSpecified(element, options);
        });
    }

    function getMergeFunction(key, options) {
        if (!options.customMerge) {
            return merge;
        }

        var customMerge = options.customMerge(key);
        return typeof customMerge === 'function' ? customMerge : merge;
    }

    function getEnumerableOwnPropertySymbols(target) {
        return Object.getOwnPropertySymbols
            ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
                  return target.propertyIsEnumerable(symbol);
              })
            : [];
    }

    function getKeys(target) {
        return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }

    function mergeObject(target, source, options) {
        var destination = {};

        if (options.isMergeableObject(target)) {
            getKeys(target).forEach(function(key) {
                destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
            });
        }

        getKeys(source).forEach(function(key) {
            if (!options.isMergeableObject(source[key]) || !target[key]) {
                destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
            } else {
                destination[key] = getMergeFunction(key, options)(
                    target[key],
                    source[key],
                    options
                );
            }
        });
        return destination;
    }

    function merge(target, source, options) {
        options = options || {};
        options.arrayMerge = options.arrayMerge || defaultArrayMerge;
        options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject;
        var sourceIsArray = Array.isArray(source);
        var targetIsArray = Array.isArray(target);
        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

        if (!sourceAndTargetTypesMatch) {
            return cloneUnlessOtherwiseSpecified(source, options);
        } else if (sourceIsArray) {
            return options.arrayMerge(target, source, options);
        } else {
            return mergeObject(target, source, options);
        }
    }

    merge.all = function mergeAll(array, options) {
        if (!Array.isArray(array)) {
            throw new Error('first argument should be an array');
        }

        return array.reduce(function(prev, next) {
            return merge(prev, next, options);
        }, {});
    };

    function dataSpecifications() {
        this.settings.modules.forEach(function(module) {
            module.variables = Array.from(
                new Set(
                    d3.merge(
                        module.results.map(function(result) {
                            return result.subset
                                ? result.subset.map(function(subset) {
                                      return subset.key;
                                  })
                                : [];
                        })
                    )
                )
            );
        });
    }

    function sync(defaults) {
        var settings = clone(this.settings); // Merge user settings onto default settings.

        this.settings = merge(defaults, settings, {
            arrayMerge: function arrayMerge(target, source, options) {
                return _toConsumableArray(source); //return target.concat(source).map(function(element) {
                //    return cloneUnlessOtherwiseSpecified(element, options);
                //});
            }
        }); // Retain user settings.

        this.settings.custom = settings; // Connect denominators to corresponding result object.

        this.settings.modules.forEach(function(module) {
            module.results.forEach(function(result) {
                if (result.denominator) {
                    result.denominator = module.results.find(function(result1) {
                        return result1.label === result.denominator;
                    });
                }
            });
        });
        dataSpecifications.call(this);
    }

    function configuration() {
        sync.call(this, defaults());
    }

    function layout() {
        this.containers = {
            main: d3
                .select(this.element)
                .append('div')
                .datum(this)
                .classed('study-overview', true)
                .attr(
                    'id',
                    'study-overview'.concat(document.querySelectorAll('.study-overview').length)
                )
        };
        this.containers.controls = this.containers.main.append('div').classed('so-controls', true);
        this.containers.cards = this.containers.main
            .selectAll('div.so-card')
            .data(this.settings.modules)
            .enter()
            .append('div')
            .classed('so-card', true);
        this.containers.headers = this.containers.cards
            .append('div')
            .append('h4')
            .classed('so-card__header', true)
            .text(function(d) {
                return d.title;
            });
        this.containers.tables = this.containers.cards
            .append('div')
            .append('table')
            .classed('so-card__table', true);
    }

    function styles() {
        var styles = [
            '.study-overview {' +
                '    display: flex;' +
                '    flex-wrap: wrap;' +
                '    flex-direction: row;' +
                '}',
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
                '    /*' +
                '    display: flex;' +
                '    flex-basis: calc(50% - 40px);' +
                '    justify-content: top;' +
                '    flex-direction: column;' +
                '    */' +
                '    display: inline-block;' +
                '    width: calc(50% - 40px);' +
                '    margin: 18px;' +
                '    border: 1px solid #aaa;' +
                '    border-radius: 4px;' +
                '    overflow-x: auto;' +
                '}',
            '.so-card > * {' +
                '    width: 100%;' +
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
            '.so-card__table {' +
                '    border-collapse: collapse;' +
                '    border-spacing: 0;' +
                '    empty-cells: show;' +
                '    margin: 4px 8px;' +
                '    padding: 4px 8px;' +
                '    width: calc(100% - 16px);' +
                '}',
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
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function checkDataSpecification(data) {
        var _this = this;

        var datasets;
        if (Array.isArray(data) && !data[0].hasOwnProperty('data'))
            datasets = [
                {
                    data: data
                }
            ];
        else datasets = data;
        datasets.forEach(function(dataset) {
            dataset.variables = Object.keys(dataset.data[0]);
            if (dataset.hasOwnProperty('spec'))
                dataset.module = _this.settings.modules.find(function(module) {
                    return module.spec === dataset.spec;
                });
            else {
                var matches = _this.settings.modules.map(function(module) {
                    var match = JSON.parse(JSON.stringify(module));
                    match.matching = 0;
                    match.total = match.variables.length;
                    match.variables.forEach(function(variable) {
                        match.matching = match.matching + dataset.variables.includes(variable);
                    });
                    match.proportion = match.matching / match.total;
                    return match;
                });

                dataset.module = matches.find(function(match) {
                    return (
                        match.proportion ===
                        d3.max(matches, function(match) {
                            return match.proportion;
                        })
                    );
                });
                dataset.spec = dataset.module ? dataset.module.spec : null;
            }
        });
        this.settings.datasets = datasets.map(function(dataset) {
            return dataset.spec;
        });
        this.settings.modules = this.settings.modules.filter(function(module) {
            return _this.settings.datasets.includes(module.spec);
        });
        return datasets;
    }

    function standardizeVariable(setting, variables) {
        var _this = this;

        var variable = variables.find(function(variable) {
            return _this.settings[setting].find(function(col) {
                return col === variable.toLowerCase();
            });
        });
        return variable;
    }

    function standardizeData() {
        var _this = this;

        var dataMappings = Object.keys(this.settings)
            .filter(function(key) {
                return /col$/.test(key);
            })
            .map(function(key) {
                return {
                    setting: key,
                    variable: '_'
                        .concat(key.replace(/_col$/, ''), '_')
                        .replace(/^_id_$/, '_participant_')
                };
            });
        this.data.forEach(function(data) {
            // Capture available variables.
            var variables = Object.keys(data.data[0]); // Standardize variables.

            dataMappings.forEach(function(dataMapping) {
                data[dataMapping.setting] = standardizeVariable.call(
                    _this,
                    dataMapping.setting,
                    variables
                );
            }); // Attach variable with standard name to data array.

            data.data.forEach(function(d, i) {
                dataMappings.forEach(function(dataMapping, j) {
                    d[dataMapping.variable] = d[data[dataMapping.setting]];
                });
            }); // Attach available variables to data object.

            data.variables = Object.keys(data.data[0]);
        });
    }

    function mergeData() {
        var participants = this.data.find(function(dataset) {
            return dataset.spec === 'participants';
        });

        if (participants !== undefined) {
            var datasets = this.data
                .filter(function(dataset) {
                    return dataset.spec !== 'participants';
                })
                .map(function(dataset) {
                    return dataset.data;
                });
            participants.data.forEach(function(participant) {
                datasets.forEach(function(dataset) {
                    dataset
                        .filter(function(d) {
                            return d._participant_ === participant._participant_;
                        })
                        .forEach(function(d) {
                            Object.assign(d, participant);
                        });
                });
            });
        }
    }

    function attachData(data) {
        for (var property in data) {
            if (!Object.keys(this).includes(property)) this[property] = data[property];
        }
    }

    function summarizeData() {
        var _this = this;

        var by = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.data.forEach(function(data) {
            // Match data spec to module.
            var module = _this.settings.modules.find(function(module) {
                return module.spec === data.spec;
            }); // Attach data properties to module.

            if (module) {
                attachData.call(module, data);

                if (by) {
                    module.byValues = d3
                        .set(
                            data.data.map(function(d) {
                                return d[by];
                            })
                        )
                        .values()
                        .sort();
                    data.byValues = module.byValues.slice();
                } else {
                    delete module.byValues;
                    delete data.byValues;
                } // nest by key variable

                var nest = function nest(data, key) {
                    var rollup =
                        arguments.length > 2 && arguments[2] !== undefined
                            ? arguments[2]
                            : function(d) {
                                  return d.length;
                              };
                    var overall = data.map(function(d) {
                        var datum = Object.assign({}, d);
                        datum[key] = '_overall_';
                        return datum;
                    });
                    var nested = d3
                        .nest()
                        .key(function(d) {
                            return d[key];
                        })
                        .rollup(rollup)
                        .entries(key ? data.concat(overall) : overall)
                        .sort(function(a, b) {
                            return a.key < b.key ? -1 : 1;
                        });
                    return nested;
                }; // transpose key values

                var transpose = function transpose(data, denominators) {
                    var transposed = data.reduce(function(acc, cur) {
                        var denominator = denominators ? denominators[cur.key].numerator : null;
                        acc[cur.key] = {
                            numerator: cur.values,
                            denominator: denominator,
                            value: denominator
                                ? ''
                                      .concat(d3.format('6,d')(cur.values), ' (')
                                      .concat(d3.format('2%')(cur.values / denominator), ')')
                                : d3.format('6,d')(cur.values)
                        };
                        return acc;
                    }, {});
                    return transposed;
                };

                var summarize = function summarize(data) {
                    var row =
                        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                    var col =
                        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                    var denominators =
                        arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                    // summarize by col variable
                    var colNest = nest(data, col);
                    var colNestTransposed = transpose(
                        colNest,
                        denominators ? denominators.summary.row : null
                    ); // summarize by row variable

                    var rowNest = row
                        ? nest(data, row, function(d) {
                              return d;
                          })
                        : null;
                    var rowNestTransposed = row
                        ? rowNest
                              .map(function(row) {
                                  var nested = nest(row.values, col);
                                  nested.key = row.key;
                                  return nested;
                              })
                              .map(function(row) {
                                  var transposed = transpose(row, colNestTransposed);
                                  transposed.key = row.key;
                                  return transposed;
                              })
                        : null;
                    return {
                        row: colNestTransposed,
                        rows: rowNestTransposed
                    };
                };

                module.results.forEach(function(result) {
                    result.data = module.data.slice();
                    result.subset.forEach(function(sub) {
                        result.data = result.data.filter(function(d) {
                            return sub.values.includes(d[sub.key]);
                        });
                    });
                    result.summary = summarize(
                        result.data, // data
                        result.by, // row
                        by, // col
                        result.denominator // denominators
                    );
                });
                data.summary = module.results
                    .map(function(result) {
                        var summary = [];

                        if (result.summary.row) {
                            var obj = {
                                label: result.label,
                                value: result.summary.row._overall_.value,
                                level: 1
                            };
                            if (by)
                                module.byValues.forEach(function(byValue) {
                                    obj[byValue] = result.summary.row[byValue]
                                        ? result.summary.row[byValue].value
                                        : null;
                                });
                            summary.push(obj);
                        }

                        if (result.summary.rows) {
                            result.summary.rows.forEach(function(row) {
                                var obj = {
                                    label: row.key,
                                    value: row._overall_.value,
                                    level: 2
                                };
                                if (by)
                                    module.byValues.forEach(function(byValue) {
                                        obj[byValue] = row[byValue] ? row[byValue].value : null;
                                    });
                                summary.push(obj);
                            });
                        }

                        return summary;
                    })
                    .reduce(function(acc, cur) {
                        cur.filter(function(d) {
                            return d.label !== '_overall_';
                        }).forEach(function(d) {
                            return acc.push(d);
                        });
                        return acc;
                    }, []);
            } else {
                console.warn('Data specification [ '.concat(data.spec, ' ] is invalid.'));
            }
        });
    }

    function createTable() {
        var _this = this;

        var by = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.settings.modules.forEach(function(module) {
            module.containers = {
                card: _this.containers.cards.filter(function(d) {
                    return d.spec === module.spec;
                }),
                header: _this.containers.headers.filter(function(d) {
                    return d.spec === module.spec;
                }),
                table: _this.containers.tables.filter(function(d) {
                    return d.spec === module.spec;
                })
            };

            if (by) {
                module.containers.header = module.containers.table
                    .append('thead')
                    .classed('so-card__table__header', true)
                    .append('tr')
                    .selectAll('th')
                    .data([''].concat(_toConsumableArray(module.byValues || []), ['Overall']))
                    .enter()
                    .append('th')
                    .classed('so-card__table__header__cell', true)
                    .text(function(d) {
                        return d;
                    });
            }

            if (module.results) {
                module.containers.body = module.containers.table.append('tbody');
                module.containers.rows = module.containers.body
                    .selectAll('tr')
                    .data(module.results)
                    .enter()
                    .append('tr')
                    .classed('so-card__table__row', true);
                module.containers.rows.each(function(d) {
                    var _this2 = this;

                    //console.log(d);
                    var row = d3.select(this);
                    row.selectAll('td')
                        .data(
                            d3.merge([
                                [
                                    {
                                        value: d.label
                                    }
                                ],
                                []
                                    .concat(_toConsumableArray(module.byValues || []), [
                                        '_overall_'
                                    ])
                                    .map(function(cell) {
                                        return (
                                            d.summary.row[cell] || {
                                                numerator: null,
                                                value: null
                                            }
                                        );
                                    })
                            ])
                        )
                        .enter()
                        .append('td')
                        .attr('class', function(d, i) {
                            return 'so-card__table__row__cell '.concat(
                                i === 0
                                    ? 'so-card__table__row__cell-key'
                                    : 'so-card__table__row__cell-value'
                            );
                        })
                        .text(function(di) {
                            return di.value || '';
                        });

                    if (d.summary.rows) {
                        row.classed('so-card__table__row--by-group', true);
                        d.summary.rows
                            .filter(function(row) {
                                return row.key !== '_overall_';
                            })
                            .reverse()
                            .forEach(function(row) {
                                var el = document.createElement('tr');

                                _this2.parentNode.insertBefore(el, _this2.nextSibling);

                                var byRow = d3
                                    .select(el)
                                    .classed(
                                        'so-card__table__row so-card__table__row--by-value',
                                        true
                                    );
                                byRow
                                    .selectAll('td')
                                    .data(
                                        d3.merge([
                                            [
                                                {
                                                    value: row.key
                                                }
                                            ],
                                            []
                                                .concat(_toConsumableArray(module.byValues || []), [
                                                    '_overall_'
                                                ])
                                                .map(function(cell) {
                                                    return (
                                                        row[cell] || {
                                                            numerator: null,
                                                            value: null
                                                        }
                                                    );
                                                })
                                        ])
                                    )
                                    .enter()
                                    .append('td')
                                    .attr('class', function(di, i) {
                                        return 'so-card__table__row__cell '.concat(
                                            i === 0
                                                ? 'so-card__table__row__cell-key'
                                                : 'so-card__table__row__cell-value'
                                        );
                                    })
                                    .text(function(di) {
                                        return di.value || '';
                                    });
                            });
                    }
                });
            }
        });
    }

    function groupBy() {
        var studyOverview = this;
        this.containers.groupBy = {
            main: this.containers.controls
                .append('div')
                .classed('so-control-group so-control-group--group-by', true)
        };
        this.containers.groupBy.label = this.containers.groupBy.main
            .append('span')
            .classed('so-control-group__label', true)
            .text('Group by');
        this.containers.groupBy.select = this.containers.groupBy.main
            .append('select')
            .classed('so-control-group__dropdown', true);
        this.containers.groupBy.options = this.containers.groupBy.select
            .selectAll('option')
            .data(
                [
                    {
                        value_col: null,
                        label: 'None'
                    }
                ].concat(_toConsumableArray(this.settings.groups))
            )
            .enter()
            .append('option')
            .classed('so-control-group__dropdown__option', true)
            .property('selected', function(d) {
                return d.label === 'Site';
            })
            .text(function(d) {
                return d.label;
            });
        this.containers.groupBy.select.on('change', function() {
            var option = d3.select(this).selectAll('option:checked');
            var datum = option.datum();
            var group = datum.value_col;
            studyOverview.destroy();
            summarizeData.call(studyOverview, group);
            createTable.call(studyOverview, group);
        });
    }

    var headerStyle = {
        font: {
            bold: true
        },
        fill: {
            fgColor: {
                rgb: 'FFcccccc'
            }
        },
        alignment: {
            wrapText: true
        }
    };

    var bodyStyle = {
        font: {
            sz: 10,
            color: {
                rgb: null // set in defineXLSX
            }
        },
        fill: {
            fgColor: {
                rgb: 'FFeeeeee'
            }
        },
        alignment: {
            wrapText: true
        },
        border: {
            //bottom: {
            //    style: 'thick',
            //    color: {
            //        rgb: null // set in defineXLSX
            //    }
            //}
        }
    };

    function workBook() {
        this.SheetNames = [];
        this.Sheets = {};
    }

    function updateRange(range, row, col) {
        if (range.s.r > row) range.s.r = row;
        if (range.s.c > col) range.s.c = col;
        if (range.e.r < row) range.e.r = row;
        if (range.e.c < col) range.e.c = col;
    }

    function addCell(wb, ws, value, type, styles, range, row, col) {
        updateRange(range, row, col);
        styles.fill.fgColor.rgb = row > 0 && row % 2 ? 'FFffffff' : styles.fill.fgColor.rgb;
        var cell = {
            v: value,
            t: type,
            s: styles
        };
        var cell_ref = XLSX.utils.encode_cell({
            c: col,
            r: row
        });
        ws[cell_ref] = cell;
    }

    function defineXLSX() {
        var wb = new workBook();
        var wbOptions = {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        };
        this.data.forEach(function(data) {
            var columns = data.byValues
                ? ['label'].concat(_toConsumableArray(data.byValues), ['value'])
                : ['label', 'value'];
            var headers = data.byValues
                ? [''].concat(_toConsumableArray(data.byValues), ['Overall'])
                : null;
            var name = data.spec;
            var ws = {};
            var cols = columns.map(function(column, i) {
                return {
                    wpx: i === 0 ? 250 : 100
                };
            });
            var range = {
                s: {
                    c: 10000000,
                    r: 10000000
                },
                e: {
                    c: 0,
                    r: 0
                }
            }; // Header row

            if (data.byValues)
                headers.forEach(function(header, col) {
                    addCell(wb, ws, header, 'c', clone(headerStyle), range, 0, col);
                }); // Data rows

            data.summary.forEach(function(d, row) {
                columns.forEach(function(variable, col) {
                    var cellStyle = clone(bodyStyle);
                    addCell(
                        wb,
                        ws,
                        col === 0
                            ? ''.concat('-'.repeat(d.level - 1), ' ').concat(d[variable])
                            : d[variable] || '',
                        'c',
                        cellStyle,
                        range,
                        row + !!data.byValues,
                        col
                    );
                });
            });
            ws['!ref'] = XLSX.utils.encode_range(range);
            ws['!cols'] = cols; //const filterRange =
            //    'A1:' + String.fromCharCode(64 + columns.length) + (data.summary.length + (!!data.byValues));
            //ws['!autofilter'] = {
            //    ref: filterRange
            //};
            //ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'B2', activePane: 'bottomRight', state: 'frozen' };

            wb.SheetNames.push(name);
            wb.Sheets[name] = ws;
        });
        this.XLSX = XLSX.write(wb, wbOptions);
    }

    /* FileSaver.js
     * A saveAs() FileSaver implementation.
     * 1.3.8
     * 2018-03-22 14:03:47
     *
     * By Eli Grey, https://eligrey.com
     * License: MIT
     *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
     */

    /*global self */

    /*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js */
    function FileSaver(view) {
        // IE <10 is explicitly unsupported
        if (
            typeof view === 'undefined' ||
            (typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent))
        ) {
            return;
        }

        var doc = view.document,
            // only get URL when necessary in case Blob.js hasn't overridden it yet
            get_URL = function get_URL() {
                return view.URL || view.webkitURL || view;
            },
            save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
            can_use_save_link = 'download' in save_link,
            click = function click(node) {
                var event = new MouseEvent('click');
                node.dispatchEvent(event);
            },
            is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
            is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
            setImmediate = view.setImmediate || view.setTimeout,
            throw_outside = function throw_outside(ex) {
                setImmediate(function() {
                    throw ex;
                }, 0);
            },
            force_saveable_type = 'application/octet-stream',
            // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
            arbitrary_revoke_timeout = 1000 * 40,
            // in ms
            revoke = function revoke(file) {
                var revoker = function revoker() {
                    if (typeof file === 'string') {
                        // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else {
                        // file is a File
                        file.remove();
                    }
                };

                setTimeout(revoker, arbitrary_revoke_timeout);
            },
            dispatch = function dispatch(filesaver, event_types, event) {
                event_types = [].concat(event_types);
                var i = event_types.length;

                while (i--) {
                    var listener = filesaver['on' + event_types[i]];

                    if (typeof listener === 'function') {
                        try {
                            listener.call(filesaver, event || filesaver);
                        } catch (ex) {
                            throw_outside(ex);
                        }
                    }
                }
            },
            auto_bom = function auto_bom(blob) {
                // prepend BOM for UTF-8 XML and text/* types (including HTML)
                // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
                if (
                    /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                        blob.type
                    )
                ) {
                    return new Blob([String.fromCharCode(0xfeff), blob], {
                        type: blob.type
                    });
                }

                return blob;
            },
            FileSaver = function FileSaver(blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                } // First try a.download, then web filesystem, then object URLs

                var filesaver = this,
                    type = blob.type,
                    force = type === force_saveable_type,
                    object_url,
                    dispatch_all = function dispatch_all() {
                        dispatch(filesaver, 'writestart progress write writeend'.split(' '));
                    },
                    // on any filesys errors revert to saving with object URLs
                    fs_error = function fs_error() {
                        if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                            // Safari doesn't allow downloading of blob urls
                            var reader = new FileReader();

                            reader.onloadend = function() {
                                var url = is_chrome_ios
                                    ? reader.result
                                    : reader.result.replace(
                                          /^data:[^;]*;/,
                                          'data:attachment/file;'
                                      );
                                var popup = view.open(url, '_blank');
                                if (!popup) view.location.href = url;
                                url = undefined; // release reference before dispatching

                                filesaver.readyState = filesaver.DONE;
                                dispatch_all();
                            };

                            reader.readAsDataURL(blob);
                            filesaver.readyState = filesaver.INIT;
                            return;
                        } // don't create more object URLs than needed

                        if (!object_url) {
                            object_url = get_URL().createObjectURL(blob);
                        }

                        if (force) {
                            view.location.href = object_url;
                        } else {
                            var opened = view.open(object_url, '_blank');

                            if (!opened) {
                                // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                                view.location.href = object_url;
                            }
                        }

                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                        revoke(object_url);
                    };

                filesaver.readyState = filesaver.INIT;

                if (can_use_save_link) {
                    object_url = get_URL().createObjectURL(blob);
                    setImmediate(function() {
                        save_link.href = object_url;
                        save_link.download = name;
                        click(save_link);
                        dispatch_all();
                        revoke(object_url);
                        filesaver.readyState = filesaver.DONE;
                    }, 0);
                    return;
                }

                fs_error();
            },
            FS_proto = FileSaver.prototype,
            saveAs = function saveAs(blob, name, no_auto_bom) {
                return new FileSaver(blob, name || blob.name || 'download', no_auto_bom);
            }; // IE 10+ (native saveAs)

        if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
            return function(blob, name, no_auto_bom) {
                name = name || blob.name || 'download';

                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }

                return navigator.msSaveOrOpenBlob(blob, name);
            };
        } // todo: detect chrome extensions & packaged apps
        // save_link.target = "_blank";

        FS_proto.abort = function() {};

        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;
        FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
        return saveAs;
    } // )((typeof self !== 'undefined' && self) || (typeof window !== 'undefined' && window));

    // Convert XLSX file for download.
    function s2ab(s) {
        var i;

        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);

            for (i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff;
            }

            return buf;
        } else {
            var buf = new Array(s.length);

            for (i = 0; i !== s.length; ++i) {
                buf[i] = s.charCodeAt(i) & 0xff;
            }

            return buf;
        }
    }

    function exportXLSX() {
        //if (!this.pvl.test) {
        var fileName = 'study-overview-'.concat(
            d3$1.time.format('%Y-%m-%dT%H-%M-%S')(new Date()),
            '.xlsx'
        );

        try {
            var blob = new Blob([s2ab(this.XLSX)], {
                type: 'application/octet-stream'
            });
            FileSaver(window)(blob, fileName);
        } catch (error) {
            if (typeof console !== 'undefined') console.log(error);
        } //}
    }

    function generateExport() {
        var _this = this;

        this.containers['export'] = {
            main: this.containers.controls
                .append('div')
                .classed('so-control-group so-control-group--export', true)
        };
        this.containers['export'].xlsx = this.containers['export'].main
            .append('span')
            .classed('so-control-group__label', true)
            .text('Export'); //this.containers.export.xlsx = this.containers.export.main
        //    .append('span')
        //    .classed('so-control-group__label', true)
        //    .text('PDF');

        this.containers['export'].xlsx.on('click', function() {
            defineXLSX.call(_this);
            exportXLSX.call(_this);
        });
    }

    function createControls() {
        groupBy.call(this);
        generateExport.call(this);
    }

    function init(data) {
        var _this = this;

        this.data = checkDataSpecification.call(this, data);
        standardizeData.call(this);
        mergeData.call(this);
        createControls.call(this);
        summarizeData.call(this, '_site_');
        createTable.call(this, '_site_');
        this.containers.cards.style('display', function(d) {
            return _this.settings.datasets.includes(d.spec) ? 'inline-block' : 'none';
        }); //summarizeData.call(this);
        //createTable.call(this);
    }

    function destroy() {
        this.containers.tables.selectAll('*').remove();
    }

    function studyOverview() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var studyOverview = {
            element: element,
            settings: settings,
            init: init,
            destroy: destroy
        };
        configuration.call(studyOverview);
        layout.call(studyOverview);
        styles.call(studyOverview);
        return studyOverview;
    }

    return studyOverview;
});
