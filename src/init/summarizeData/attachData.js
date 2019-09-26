export default function attachData(data) {
    for (const property in data)
        if (!Object.keys(this).includes(property))
            this[property] = data[property];
}
