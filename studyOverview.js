(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.studyOverview = factory());
}(this, function () { 'use strict';

    function tables() {
      return [{
        spec: 'accrual',
        label: 'Accrual'
      }, {
        spec: 'visits',
        label: 'Visits'
      }, {
        spec: 'forms',
        label: 'Forms'
      }, {
        spec: 'queries',
        label: 'Queries'
      }];
    }

    function layout() {
      this.containers = {
        main: d3.select(this.element).append('div').datum(this).classed('study-overview', true).attr('id', "study-overview".concat(document.querySelectorAll('.study-overview').length))
      };
      this.containers.cards = this.containers.main.selectAll('div.so-card').data(tables).enter().append('div').classed('so-card', true);
      this.containers.cardHeaders = this.containers.cards.append('h4').classed('so-card__header', true).text(function (d) {
        return d.label;
      });
      this.containers.cardTables = this.containers.cards.append('table').classed('so-card__table', true);
    }

    function styles() {}

    function init(data) {
      console.log(data);
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
      layout.call(studyOverview);
      styles.call(studyOverview);
      return studyOverview;
    }

    return studyOverview;

}));
