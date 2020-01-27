import clone from '../util/clone';
import merge from '../util/merge';

export default function sync(defaults) {
    const settings = clone(this.settings);

    // Merge user settings onto default settings.
    this.settings = merge(defaults, settings, {
        arrayMerge: (target, source, options) => {
            return [...source];
            //return target.concat(source).map(function(element) {
            //    return cloneUnlessOtherwiseSpecified(element, options);
            //});
        }
    });

    // Retain user settings.
    this.settings.custom = settings;

    // Connect denominators to corresponding result object.
    this.settings.modules.forEach(module => {
        module.results.forEach(result => {
            if (result.denominator) {
                result.denominator = module.results.find(
                    result1 => result1.label === result.denominator
                );
            }
        });
    });
}
