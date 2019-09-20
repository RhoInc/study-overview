import defaults from './configuration/defaults';
import sync from './configuration/sync';

export default function configuration() {
    sync.call(this, defaults());
}
