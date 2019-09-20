import accrual from './summarizeData/accrual';
import visits from './summarizeData/visits';
import forms from './summarizeData/forms';
import queries from './summarizeData/queries';

export default function summarizeData() {
    const summaries = {
        accrual,
        visits,
        forms,
        queries,
    };

    this.data.forEach(data => {
        data.variables = Object.keys(data.data[0]);
        const module = this.settings.modules.find(module => module.spec === data.spec);
        if (module && summaries.hasOwnProperty(data.spec))
            module.summary = summaries[data.spec].call(this, data);
    });
}
