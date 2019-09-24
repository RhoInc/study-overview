export default function standardizeVariable(setting, variables) {
    const variable = variables
        .find(variable => this.settings[setting].find(col => col === variable.toLowerCase()));

    return variable;
}
