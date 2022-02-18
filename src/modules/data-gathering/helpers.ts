
export function getLatestBlockFromEvents(eventList) {
    return Math.max(eventList.map(event => event.blockNumber));
}
