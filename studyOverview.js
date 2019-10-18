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
        id_col: ['subjid', 'subjectnameoridentifier'],
        visit_col: ['visit_name', 'folderinstancename'],
        form_col: ['ecrfpagename'],
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
            by: 'queryage'
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

    function getTotal(data, keys) {
      var total = {
        key: '# Subjects Total',
        data: d3.set(data.map(function (d) {
          return keys.map(function (key) {
            return d[key];
          }).join('||');
        })).values().sort() // TODO: use settings or data spec here

      };
      total.values = total.data.length;
      return total;
    }

    function accrual(module) {
      var data = module.data.data;
      var summary = []; // overall

      var nSubjects = {
        key: '# Subjects Total',
        data: d3.set(data.map(function (d) {
          return d.subjid;
        })).values().sort() // TODO: use settings or data spec here

      };
      nSubjects.values = nSubjects.data.length;
      summary.push(nSubjects);
      var total = getTotal(data, ['subjid']);
      console.log(nSubjects);
      console.log(total); // by population

      var populations = d3.nest().key(function (d) {
        return d.population;
      }).rollup(function (d) {
        var nSubjects = {
          data: d3.set(d.map(function (di) {
            return di.subjid;
          })).values().sort()
        };
        nSubjects.values = nSubjects.data.length;
        return nSubjects;
      }).entries(data);
      populations.forEach(function (population) {
        population.data = population.values.data;
        population.values = population.values.values;
        summary.push(population);
      });
      return summary;
    }

    function visits(module) {
      var data = module.data.data;
      var summary = []; // overall

      var nVisits = {
        key: '# Visits',
        data: d3.set(data.map(function (d) {
          return "".concat(d.subjectnameoridentifier, "||").concat(d.folderinstancename, "||").concat(d.ecrfpagename);
        })).values().sort() // TODO: use settings or data spec here

      };
      nVisits.values = nVisits.data.length;
      summary.push(nVisits); // by population
      //const populations = d3.nest()
      //    .key(d => d.population)
      //    .rollup(d => {
      //        const nVisits = {
      //            data: d3.set(d.map(di => di.subjid)).values().sort(),
      //        };
      //        nVisits.values = nVisits.data.length;
      //        return nVisits;
      //    })
      //    .entries(data);
      //populations.forEach(population => {
      //    population.data = population.values.data;
      //    population.values = population.values.values;
      //    summary.push(population);
      //});

      return summary;
    }

    function forms(module) {
      var data = module.data.data;
      var summary = []; // overall

      var nForms = {
        key: '# Pages Started',
        data: d3.set(data.map(function (d) {
          return "".concat(d.subjectnameoridentifier, "||").concat(d.folderinstancename, "||").concat(d.ecrfpagename);
        })).values().sort() // TODO: use settings or data spec here

      };
      nForms.values = nForms.data.length;
      summary.push(nForms); // by population
      //const populations = d3.nest()
      //    .key(d => d.population)
      //    .rollup(d => {
      //        const nForms = {
      //            data: d3.set(d.map(di => di.subjid)).values().sort(),
      //        };
      //        nForms.values = nForms.data.length;
      //        return nForms;
      //    })
      //    .entries(data);
      //populations.forEach(population => {
      //    population.data = population.values.data;
      //    population.values = population.values.values;
      //    summary.push(population);
      //});

      return summary;
    }

    function queries(module) {
      var data = module.data.data;
      var summary = []; // overall

      var nQueries = {
        key: '# Queries Generated',
        data: d3.set(data.map(function (d) {
          return "".concat(d.subjectnameoridentifier, "||").concat(d.folderinstancename, "||").concat(d.ecrfpagename);
        })).values().sort() // TODO: use settings or data spec here

      };
      nQueries.values = nQueries.data.length;
      summary.push(nQueries); // by population
      //const populations = d3.nest()
      //    .key(d => d.population)
      //    .rollup(d => {
      //        const nQueries = {
      //            data: d3.set(d.map(di => di.subjid)).values().sort(),
      //        };
      //        nQueries.values = nQueries.data.length;
      //        return nQueries;
      //    })
      //    .entries(data);
      //populations.forEach(population => {
      //    population.data = population.values.data;
      //    population.values = population.values.values;
      //    summary.push(population);
      //});

      return summary;
    }

    function summarizeData() {
      var _this = this;

      var summaries = {
        participants: accrual,
        visits: visits,
        forms: forms,
        queries: queries
      };
      this.data.forEach(function (data) {
        data.variables = Object.keys(data.data[0]);

        var module = _this.settings.modules.find(function (module) {
          return module.spec === data.spec;
        });

        if (module && summaries.hasOwnProperty(data.spec)) {
          module.data = data.data;
          module.variables = data.variables;
          module.results.forEach(function (result) {
            result.data = module.data;
            result.subset.forEach(function (sub) {
              result.data = result.data.filter(function (d) {
                return sub.values.includes(d[sub.key]);
              });
            });
            result.n = result.data.length; // handle denominators

            if (result.denominator) {
              var denominator = module.results.find(function (result1) {
                return result1.label === result.denominator;
              });

              if (denominator) {
                result.num = result.n;
                result.den = denominator.value;
                result.pct = result.num / result.den;
                result.value = "".concat(d3.format(' 6d')(result.num), " (").concat(d3.format('2%')(result.pct), ")");
              } else {
                result.value = d3.format(' 6d')(result.n);
              }
            } else {
              result.value = d3.format(' 6d')(result.n);
            } // handle stratification


            if (result.by) {
              result.byValues = d3.nest().key(function (d) {
                return d[result.by];
              }).rollup(function (d) {
                return d.length;
              }).entries(result.data).sort(function (a, b) {
                return a.key < b.key ? 1 : -1;
              }).map(function (d) {
                d.label = d.key;
                d.num = d.values;
                d.den = result.n;
                d.pct = d.num / d.den;
                d.value = "".concat(d3.format(' 6d')(d.num), " (").concat(d3.format('2%')(d.pct), ")");
                return d;
              });
            }
          });
        }
      });
    }

    function createTable() {
      var _this = this;

      this.settings.modules.forEach(function (module) {
        module.containers = {
          card: _this.containers.cards.filter(function (d) {
            return d.spec === module.spec;
          }),
          header: _this.containers.headers.filter(function (d) {
            return d.spec === module.spec;
          }),
          table: _this.containers.tables.filter(function (d) {
            return d.spec === module.spec;
          })
        };

        if (module.results) {
          module.containers.rows = module.containers.table.selectAll('tr').data(module.results).enter().append('tr').classed('so-card__table__row', true);
          module.containers.rows.each(function (d) {
            var _this2 = this;

            var row = d3.select(this);
            row.append('td').classed('so-card__table__row__cell so-card__table__row__cell-key', true).text(d.label);
            row.append('td').classed('so-card__table__row__cell so-card__table__row__cell-value', true).text(d.value);

            if (d.byValues) {
              row.classed('so-card__table__row--by-group', true);
              d.byValues.forEach(function (byValue) {
                var el = document.createElement('tr');

                _this2.parentNode.insertBefore(el, _this2.nextSibling);

                var byRow = d3.select(el).classed('so-card__table__row so-card__table__row--by-value', true);
                byRow.append('td').classed('so-card__table__row__cell so-card__table__row__cell-key', true).text(byValue.label);
                byRow.append('td').classed('so-card__table__row__cell so-card__table__row__cell-value', true).text(byValue.value);
              });
            }
          });
        }
      });
    }

    function init(data) {
      this.data = data;
      summarizeData.call(this);
      createTable.call(this);
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
