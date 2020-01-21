import defaults from './configuration/defaults';
import sync from './configuration/sync';
import captureRequiredVariables from './configuration/captureRequiredVariables';

export default function configuration() {
    sync.call(this, defaults());
    captureRequiredVariables.call(this)
}
