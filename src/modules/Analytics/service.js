import store from "../../store";

export const logAnalytic = async (model_id, event_type) => {
    store.dispatch("analytics/logStat", {
        body: {
            model_id,
            event_type
        },
        options: {},
    })
}