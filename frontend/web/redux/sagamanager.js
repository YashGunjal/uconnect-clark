export default function createSagaManager(sagaMiddleware) {
    let sagaList = [];
    let emitSagaAdditionListener = null;

    return {
        addSaga: function(name, saga) {
            if (sagaList[name]) {
                return;
            }
            sagaList = { ...sagaList, [name]: saga };
            if (emitSagaAdditionListener) {
                emitSagaAdditionListener(saga);
            }
        },
        removeSaga: function(name) {
            // TODO: Needs to be implemented
        },
        setAddSagaListener: function(listener) {
            emitSagaAdditionListener = listener;
        }
    }
}