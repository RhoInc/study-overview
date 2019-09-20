import clone from '../util/clone';
import merge from '../util/merge';

export default function sync(defaults) {
    const settings = clone(this.settings);
    this.settings = merge(
        defaults,
        settings,
        {
            arrayMerge: (target, source, options) => {
                return [...source];
                //return target.concat(source).map(function(element) {
                //    return cloneUnlessOtherwiseSpecified(element, options);
                //});
            }
        }
    );
    this.settings.custom = settings;
}
