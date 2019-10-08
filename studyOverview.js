(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.studyOverview = factory());
}(this, function () { 'use strict';

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
            return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
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
        modules: [{
          spec: 'participants',
          title: 'Participants',
          unit: 'participant',
          results: [{
            label: '# Participants',
            subset: [],
            summary: 'count'
          }, {
            label: 'Screening',
            subset: [{
              key: 'SBJTSTAT',
              values: ['Ongoing']
            }, {
              key: 'RFENDY',
              values: ['6', '15', '16', '20', '21', '22', '28', '29', '30', '32', '42', '43', '44', '47']
            }],
            summary: 'count',
            denominator: '# Participants'
          }, {
            label: 'Screen Failed',
            subset: [{
              key: 'SBJTSTAT',
              values: ['Screen Failure']
            }],
            summary: 'count',
            denominator: '# Participants'
          }, {
            label: 'Enrolled',
            subset: [{
              key: 'SBJTSTAT',
              values: ['Ongoing']
            }],
            summary: 'count',
            denominator: '# Participants'
          }, {
            label: 'Completed',
            subset: [{
              key: 'SBJTSTAT',
              values: ['Completed']
            }],
            summary: 'count',
            denominator: '# Participants'
          }, {
            label: 'Early Termination',
            subset: [{
              key: 'SBJTSTAT',
              values: ['Early Termination']
            }],
            summary: 'count',
            denominator: '# Participants'
          }]
        }, {
          spec: 'visits',
          title: 'Visits',
          unit: 'visit',
          results: [{
            label: '# Visits',
            subset: [],
            summary: 'count'
          }, {
            label: 'Visit Status',
            subset: [{
              key: 'visit_status',
              values: ['Completed', 'Expected', 'Overdue', 'Missed']
            }],
            summary: 'count',
            denominator: '# Visits',
            by: 'visit_status'
          }]
        }, {
          spec: 'forms',
          title: 'Forms',
          unit: 'form',
          results: [{
            label: '# Forms',
            subset: [{
              key: 'is_partial_entry',
              values: ['1']
            }],
            summary: 'count'
          }, {
            label: 'Verified',
            subset: [{
              key: 'is_verified',
              values: ['1']
            }],
            summary: 'count',
            denominator: '# Forms'
          }, {
            label: 'Needs Verification',
            subset: [{
              key: 'needs_verification',
              values: ['1']
            }],
            summary: 'count',
            denominator: '# Forms'
          }, {
            label: 'Signed',
            subset: [{
              key: 'is_signed',
              values: ['1']
            }],
            summary: 'count',
            denominator: '# Forms'
          }, {
            label: 'Needs Signature',
            subset: [{
              key: 'needs_signature',
              values: ['1']
            }],
            summary: 'count',
            denominator: '# Forms'
          }, {
            label: 'Frozen',
            subset: [{
              key: 'is_frozen',
              values: ['1']
            }],
            summary: 'count',
            denominator: '# Forms'
          }, {
            label: 'Ready for Freeze',
            subset: [{
              key: 'ready_for_freeze',
              values: ['1']
            }],
            summary: 'count',
            denominator: '# Forms'
          }, {
            label: 'Locked',
            subset: [{
              key: 'is_locked',
              values: ['1']
            }],
            summary: 'count',
            denominator: '# Forms'
          }]
        }, {
          spec: 'queries',
          title: 'Queries',
          unit: 'query',
          results: [{
            label: '# Queries',
            subset: [],
            summary: 'count'
          }, {
            label: 'Open Queries by Age Category',
            subset: [{
              key: 'querystatus',
              values: ['Open']
            }],
            summary: 'count',
            denominator: '# Queries',
            by: 'folderinstancename'
          }, {
            label: 'Answered Queries by Marking Group',
            subset: [{
              key: 'querystatus',
              values: ['Answered']
            }],
            summary: 'count',
            denominator: '# Queries',
            by: 'markinggroup'
          }]
        }]
      };
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function clone(obj) {
      var copy; // Handle the 3 simple types, and null or undefined

      if (null == obj || "object" != _typeof(obj)) return obj; // Handle Date

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
      return options.clone !== false && options.isMergeableObject(value) ? merge(emptyTarget(value), value, options) : value;
    }

    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function (element) {
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
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
        return target.propertyIsEnumerable(symbol);
      }) : [];
    }

    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }

    function mergeObject(target, source, options) {
      var destination = {};

      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function (key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }

      getKeys(source).forEach(function (key) {
        if (!options.isMergeableObject(source[key]) || !target[key]) {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        } else {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
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

      return array.reduce(function (prev, next) {
        return merge(prev, next, options);
      }, {});
    };

    function sync(defaults) {
      var settings = clone(this.settings);
      this.settings = merge(defaults, settings, {
        arrayMerge: function arrayMerge(target, source, options) {
          return _toConsumableArray(source); //return target.concat(source).map(function(element) {
          //    return cloneUnlessOtherwiseSpecified(element, options);
          //});
        }
      });
      this.settings.custom = settings;
    }

    function configuration() {
      sync.call(this, defaults());
    }

    function layout() {
      this.containers = {
        main: d3.select(this.element).append('div').datum(this).classed('study-overview', true).attr('id', "study-overview".concat(document.querySelectorAll('.study-overview').length))
      };
      this.containers.cards = this.containers.main.selectAll('div.so-card').data(this.settings.modules).enter().append('div').classed('so-card', true);
      this.containers.headers = this.containers.cards.append('h4').classed('so-card__header', true).text(function (d) {
        return d.title;
      });
      this.containers.tables = this.containers.cards.append('table').classed('so-card__table', true);
    }

    function styles() {}

    function standardizeVariable(setting, variables) {
      var _this = this;

      var variable = variables.find(function (variable) {
        return _this.settings[setting].find(function (col) {
          return col === variable.toLowerCase();
        });
      });
      return variable;
    }

    function standardizeData() {
      var _this = this;

      var dataMappings = Object.keys(this.settings).filter(function (key) {
        return /col$/.test(key);
      }).map(function (key) {
        return {
          setting: key,
          variable: "_".concat(key.replace(/_col$/, ''), "_").replace(/^_id_$/, '_participant_')
        };
      });
      this.data.forEach(function (data) {
        // Capture available variables.
        var variables = Object.keys(data.data[0]); // Standardize variables.

        dataMappings.forEach(function (dataMapping) {
          data[dataMapping.setting] = standardizeVariable.call(_this, dataMapping.setting, variables);
        }); // Attach variable with standard name to data array.

        data.data.forEach(function (d, i) {
          dataMappings.forEach(function (dataMapping, j) {
            d[dataMapping.variable] = d[data[dataMapping.setting]];
          });
        }); // Attach available variables to data object.

        data.variables = Object.keys(data.data[0]);
      });
    }

    function attachData(data) {
      for (var property in data) {
        if (!Object.keys(this).includes(property)) this[property] = data[property];
      }
    }

    function summarizeData() {
      var _this = this;

      var by = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.data.forEach(function (data) {
        // Match data spec to module.
        var module = _this.settings.modules.find(function (module) {
          return module.spec === data.spec;
        }); // Attach data properties to module.


        if (module) {
          attachData.call(module, data);

          var nest = function nest(data, key) {
            var rollup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (d) {
              return d.length;
            };
            var nested = d3.nest().key(function (d) {
              return d[key];
            }).rollup(rollup).entries(data).sort(function (a, b) {
              return a.key < b.key ? -1 : 1;
            });
            return nested;
          };

          var transpose = function transpose(data) {
            var transposed = data.reduce(function (acc, cur) {
              acc[cur.key] = cur.values;
              return acc;
            }, {});
            return transposed;
          };

          var summarize = function summarize(data) {
            var row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var keys = [row, col].filter(function (key) {
              return key !== null && data[0].hasOwnProperty(key);
            });
            console.log('----------------------------------------------------------------------------------------------------');
            if (row) console.log("row: ".concat(row));
            var rowNest = row ? nest(data, row, function (d) {
              return d;
            }) : null;
            var rowNestTransposed = row ? rowNest.map(function (row) {
              return nest(row.values, col);
            }).map(function (row) {
              return transpose(row);
            }) : null;
            console.table(rowNestTransposed);
            if (col) console.log("col: ".concat(col));
            var colNest = col ? nest(data, col) : null;
            var colNestTransposed = col ? transpose(colNest) : null;
            console.table(colNestTransposed); //console.log(colNestTransposed);
            //console.log(rowNestTransposed);
            //const tabulated = [...colNestTransposed, ...rowNestTransposed]
            //console.log(tabulated);
            //return tabulated;
          };

          module.results.forEach(function (result) {
            result.data = module.data.slice();
            result.subset.forEach(function (sub) {
              result.data = result.data.filter(function (d) {
                return sub.values.includes(d[sub.key]);
              });
            });
            result.summary = summarize(result.data, result.by, by); //console.log(result.summary);
          }); //module.by = {
          //    key: by,
          //    values: module.variables.includes(by)
          //        ? d3.set(data.data.map(d => d[by]))
          //            .values()
          //            .sort()
          //            .map(value => {
          //                return {
          //                    value,
          //                };
          //            }).concat({ value: 'Total'})
          //        : [{ value: 'Total' }],
          //};
          //calculateResults.call(module);
        } else {
          console.warn("Data specification [ ".concat(data.spec, " ] is invalid."));
        }
      });
    }

    function init(data) {
      this.data = data;
      standardizeData.call(this);
      summarizeData.call(this, '_site_'); //createTable.call(this);
    }

    function destroy() {}

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

}));
