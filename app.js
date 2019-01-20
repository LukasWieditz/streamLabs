let axios = require('axios');
let OAuth2 = require('oauth20');
let credentialsStreamLabs = Symbol('credentialsStreamLabs');
let urlsStreamLabs = Symbol('urlsStreamLabs');
let getStreamLabs = Symbol('getStreamLabs');
let postStreamLabs = Symbol('postStreamLabs');

class StreamLabs {
    constructor(data) {
        super(null, null, null, null, data.accessToken,
            'https://www.streamlabs.com/api/v1.0/');

        this[credentialsStreamLabs] = {
            socketToken: socketToken
        };

        this[urlsStreamLabs] = {
            socketToken: 'socket/token',
            user: 'user',
            donations: {
                get: 'donations',
                add: 'donations'
            },
            alerts: {
                add: 'alerts',
                skip: 'alerts/skip',
                mute: 'alerts/mute_volume',
                unmute: 'alerts/unmute_volume',
                pause: 'alerts/pause_queue',
                resume: 'alerts/resume_queue',
                test: 'alerts/send_tests_alert',
                show_video: 'alerts/show_video',
                hide_video: 'alerts/hide_video'
            },
            points: {
                get: 'points',
                subtract: 'points/subtract',
                import: 'points/import',
                group_get: 'points/group_get_points',
                group_subtract: 'points/group_subtract_points',
                add_all: 'points/add_to_all',
                edit: 'points/user_point_edit',
                reset_all: 'points/reset',
                search: 'points/user_points'
            },
            jar: {
                empty: 'jar/empty'
            },
            wheel: {
                spin: 'wheel/spin'
            }
        };

        this.axiosStreamLabs = axios.create({
            baseURL: 'https://www.streamlabs.com/api/v1.0/'
        });
    }

    getCredentials() {
        let credentials = super.getCredentials();
        credentials.socketToken = this[credentialsStreamLabs].socketToken;

        return credentials;
    }

    user() {
        let url = this[urlsStreamLabs].user;

        let user = {
            access_token: this.getCredentials().accessToken
        };

        return this[getStreamLabs](url, user);
    }

    /** ALERTS **/

    /**
     *
     * @param type
     * @param options
     * @returns {*}
     */
    addAlert(type, options) {
        let url = this[urlsStreamLabs].alerts.add;

        let alert = {
            access_token: this.getCredentials().accessToken,
            type: type
        };

        alert.assign(options);

        return this[postStreamLabs](url, alert);
    }

    /**
     *
     * @returns {*}
     */
    skipAlerts() {
        let url = this[urlsStreamLabs].alerts.skip;

        let alert = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, alert);
    }

    muteAlerts() {
        let url = this[urlsStreamLabs].alerts.mute;

        let alert = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, alert);
    }

    unmuteAlerts() {
        let url = this[urlsStreamLabs].alerts.unmute;

        let alert = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, alert);
    }

    pauseAlerts() {
        let url = this[urlsStreamLabs].alerts.pause;

        let alert = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, alert);
    }

    resumeAlerts() {
        let url = this[urlsStreamLabs].alerts.resume;

        let alert = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, alert);
    }

    testAlert(type) {
        let url = this[urlsStreamLabs].alerts.test;

        let alert = {
            access_token: this.getCredentials().accessToken,
            type: type,
            platform: 'twitch'
        };

        return this[postStreamLabs](url, alert);
    }

    showAlertVideos() {
        let url = this[urlsStreamLabs].alerts.show_video;

        let alert = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, alert);
    }

    hideAlertVideos() {
        let url = this[urlsStreamLabs].alerts.hide_video;

        let alert = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, alert);
    }


    /** DONATIONS **/

    /**
     *
     * @param limit
     * @returns {*}
     */
    getDonations(limit) {
        let url = this[urlsStreamLabs].donations.get;
        let params = {
            access_token: this.getCredentials().accessToken,
            limit: limit,
            currency: 'USD',
            verified: false
        };

        return this[getStreamLabs](url, params);
    }

    /**
     *
     * @returns {*}
     * @param name
     * @param identifier
     * @param amount
     * @param currency
     * @param options - message, skip_alert, created_at
     */
    addDonation(name, identifier, amount, currency, options) {
        let url = this[urlsStreamLabs].donations.add;

        let donation = {
            access_token: this.getCredentials().accessToken,
            name: name,
            identifier: idenfitier,
            amount: amount,
            currency: currency,
        };

        donation.assign(options);

        return this[postStreamLabs](url, donation);
    }

    /** POINTS **/

    /**
     *
     * @param username
     * @param channel
     * @returns {*}
     */
    getPoints(channel, username) {
        let url = this[urlsStreamLabs].points.get;

        points = {
            access_token: this.getCredentials().accessToken,
            username: username,
            channel: channel,
        };

        return this[getStreamLabs](url, points);
    }

    /**
     *
     * @param users[]
     * @param channel
     * @returns {*}
     */
    getPointsGroup(channel, users) {
        let url = this[urlsStreamLabs].points.group_get;

        let points = {
            access_token: this.getCredentials().accessToken,
            users: users,
            channel: channel,
        };

        return this[getStreamLabs](url, points);
    }

    /**
     *
     * @param username
     * @param channel
     * @param amount
     * @returns {*}
     */
    subtractPoints(channel, username, amount) {
        let url = this[urlsStreamLabs].points.subtract;

        let points = {
            access_token: this.getCredentials().accessToken,
            username: username,
            channel: channel,
            amount: amount
        };

        return this[postStreamLabs](url, points);
    }

    /**
     *
     * @param users[]
     * @param channel
     * @param amount
     * @returns {*}
     */
    subtractPointsGroup(channel, users, amount) {
        let url = this[urlsStreamLabs].points.group_subtract;

        let points = {
            access_token: this.getCredentials().accessToken,
            users: users,
            channel: channel,
            amount: amount
        };

        return this[postStreamLabs](url, points);
    }

    /**
     *
     * @param username
     * @param channel
     * @param amount
     * @returns {*}
     */
    editPoints(channel, username, amount) {
        let url = this[urlsStreamLabs].points.edit;

        let points = {
            access_token: this.getCredentials().accessToken,
            username: username,
            channel: channel,
            points: amount
        };

        return this[postStreamLabs](url, points);
    }

    /**
     *
     * @returns {*}
     */
    resetPoints() {
        let url = this[urlsStreamLabs].points.reset_all;

        let points = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, points);
    }

    /**
     *
     * @param channel
     * @param amount
     * @returns {*}
     */
    addPointsAll(channel, amount) {
        let url = this[urlsStreamLabs].points.add_all;

        let points = {
            access_token: this.getCredentials().accessToken,
            channel: channel,
            points: amount
        };

        return this[postStreamLabs](url, points);
    }

    /**
     *
     * @param username
     * @param sort
     * @param order
     * @param limit
     * @param page
     * @returns {*}
     */
    searchPoints(username, sort, order, limit, page) {
        let url = this[urlsStreamLabs].points.search;

        let points = {
            access_token: this.getCredentials().access_token,
            username: username,
            sort: sort || 'points',
            order: order || 'desc',
            limit: limit || 100,
            page: page || 1
        };

        return this[getStreamLabs](url, points);
    }

    /** JAR **/

    /**
     *
     * @param channel
     * @param amount
     * @returns {*}
     */
    emptyJar(channel, amount) {
        let url = this[urlsStreamLabs].jar.empty;

        let jar = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, jar);
    }

    /** WHEEL **/

    /**
     *
     * @param channel
     * @param amount
     * @returns {*}
     */
    spinWheel(channel, amount) {
        let url = this[urlsStreamLabs].wheel.spin;

        let wheel = {
            access_token: this.getCredentials().accessToken
        };

        return this[postStreamLabs](url, wheel);
    }

    connectWebSocket() {
        let url = this[urlsStreamLabs].socketToken;
        let params = {
            access_token: this.getCredentials().accessToken
        };

        return this[getStreamLabs](url, params).then((result) => {
            this[credentialsStreamLabs].socketToken = result.data.socket_token;
            return result;
        });
    }

    [getStreamLabs](url, params) {
        return this.axiosStreamLabs({
            method: 'GET',
            url: url,
            params: params
        });
    }

    [postStreamLabs](url, data) {
        return this.axiosStreamLabs({
            method: 'POST',
            url: url,
            data: data
        });
    }
}

module.exports = StreamLabs;