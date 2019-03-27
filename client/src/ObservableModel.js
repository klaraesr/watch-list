class ObservableModel {
    constructor() {
        this.observer = null
    }

    addObserver(observer) {
        this.observer = observer
    }

    notifyObserver() {
        this.observer.updateUser(this);
    }
}

export default ObservableModel;