export default function mergeData() {
    const participants = this.data.find(dataset => dataset.spec === 'participants').data;
    const datasets = this.data
        .filter(dataset => dataset.spec !== 'participants')
        .map(dataset => dataset.data);
    participants.forEach(participant => {
        datasets.forEach(dataset => {
            dataset.filter(d => d._participant_ === participant._participant_)
                .forEach(d => {
                    Object.assign(d, participant);
                });
        });
    });
}
