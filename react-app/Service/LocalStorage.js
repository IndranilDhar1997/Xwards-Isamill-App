import AsyncStorage from '@react-native-community/async-storage';

export default LocalStorage = {
    get(key, callback) {
        try {
            AsyncStorage.getItem(key).then(value => {
                callback(JSON.parse(value));
            }).catch(e => {
                console.error(e);
                callback(false);
            })
        } catch (error) {
            callback();
            console.error(error);
        }
    },
    set(key, value, callback) {
        callback = callback || null;
        try {
            AsyncStorage.setItem(key, value).then((e) => {
                if (e) {
                    console.error('Error!', e);
                } else {
                    if (callback) {
                        callback();
                    }
                }
            }).catch(e => {
                console.error(e);
            });
        } catch (error) {
            console.error(error);
            // Error saving data
        }
    },
    delete(key, callback) {
        callback = callback || null;
        try {
            AsyncStorage.removeItem(key).then((e) => {
                if (e) {
                    console.error('Error!', e);
                } else {
                    if (callback) {
                        callback();
                    }
                }
            }).catch(e => {
                console.error(e);
            });
        } catch (error) {
            console.error(error);
            // Error saving data
        }
    }
};