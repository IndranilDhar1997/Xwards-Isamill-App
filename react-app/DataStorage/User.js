import LocalStorage from '../Service/LocalStorage';

export default User = {
    userProfile: null,
    auth: null,
    load() {
        return new Promise (function (resolve, reject) {
            let that = this;
            if (this.userProfile) {
                return resolve(this.userProfile);
            }

            LocalStorage.get('USER', function(user) {
                if (!user) {
                    return reject();
                }

                that.userProfile = user;
                that.auth = user.login_auth;

                return resolve(user);
            }.bind(that));
        }.bind(this));
    },
    set(user) {
        this.auth = user.login_auth;
        this.userProfile = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            emailId: user.email_id,
            login_auth: user.login_auth,
            user_type: user.user_type,
            verified: user.verified,
            last_login: user.last_login,
            created_at: user.created_at
        }
        LocalStorage.set('USER', JSON.stringify(this.userProfile));
        LocalStorage.set('AUTHTOKEN', JSON.stringify({auth: this.auth}));
    },
    get() {
        return this.userProfile;
    },
    getAuth() {
        return this.auth;
    },
    reset() {
        LocalStorage.delete('USER');
        LocalStorage.delete('AUTHTOKEN');
    }
};