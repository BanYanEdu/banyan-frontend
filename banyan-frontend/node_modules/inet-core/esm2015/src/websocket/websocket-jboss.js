/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { WebSocketAbstract } from './websocket-abstract';
export class WebSocketJboss extends WebSocketAbstract {
    /**
     * @return {?}
     */
    get readyState() {
        return this._socket ? this._socket.readyState : null;
    }
    /**
     * @return {?}
     */
    stateChange() {
        if (this.readyState === WebSocket.OPEN) {
            this._ping();
        }
        super.stateChange();
    }
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    connect(options, username) {
        this._socket = new WebSocket(options);
        this._socket.onmessage = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // const envelop: WebSocketEnvelop = JSON.parse(event.data);
            // if (envelop.body) {
            //     this.onMessage.next(envelop.body);
            // }
            /** @type {?} */
            const envelopBody = JSON.parse(event.data);
            if (envelopBody.sender) {
                this.onMessage.next(envelopBody);
            }
        });
        this._socket.onopen = (/**
         * @return {?}
         */
        () => this.stateChange());
        this._socket.onerror = (/**
         * @return {?}
         */
        () => this.stateChange());
        this._socket.onclose = (/**
         * @return {?}
         */
        () => this.stateChange());
    }
    /**
     * @return {?}
     */
    close() {
        this._socket.close();
    }
    /**
     * @param {?} envelop
     * @return {?}
     */
    send(envelop) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            try {
                this._socket.send(JSON.stringify(envelop));
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _ping() {
        if (this.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify({ type: 'ping' }));
            setTimeout((/**
             * @return {?}
             */
            () => this._ping()), 10000);
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebSocketJboss.prototype._socket;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWpib3NzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3dlYnNvY2tldC93ZWJzb2NrZXQtamJvc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYyxpQkFBaUIsRUFBbUIsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RixNQUFNLE9BQU8sY0FBZSxTQUFRLGlCQUFpQjs7OztJQUdqRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekQsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFDRCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLE9BQWUsRUFBRSxRQUFnQjtRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7Ozs7OztrQkFLekIsV0FBVyxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDdkQsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNwQztRQUNMLENBQUMsQ0FBQSxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUEsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87OztRQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7O1FBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUM7SUFDcEQsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLE9BQXlCO1FBQzFCLE9BQU8sSUFBSSxPQUFPOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekIsSUFBSTtnQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtZQUFDLE9BQU0sQ0FBQyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLEtBQUs7UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxVQUFVOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0NBQ0o7Ozs7OztJQXBERyxpQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VudmVsb3BCb2R5LCBXZWJTb2NrZXRBYnN0cmFjdCwgV2ViU29ja2V0RW52ZWxvcH0gZnJvbSAnLi93ZWJzb2NrZXQtYWJzdHJhY3QnO1xuXG5leHBvcnQgY2xhc3MgV2ViU29ja2V0SmJvc3MgZXh0ZW5kcyBXZWJTb2NrZXRBYnN0cmFjdCB7XG4gICAgcHJpdmF0ZSBfc29ja2V0OiBXZWJTb2NrZXQ7XG5cbiAgICBnZXQgcmVhZHlTdGF0ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29ja2V0ID8gdGhpcy5fc29ja2V0LnJlYWR5U3RhdGUgOiBudWxsO1xuICAgIH1cblxuICAgIHN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICAgICAgdGhpcy5fcGluZygpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnN0YXRlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdChvcHRpb25zOiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc29ja2V0ID0gbmV3IFdlYlNvY2tldChvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fc29ja2V0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgZW52ZWxvcDogV2ViU29ja2V0RW52ZWxvcCA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICAvLyBpZiAoZW52ZWxvcC5ib2R5KSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5vbk1lc3NhZ2UubmV4dChlbnZlbG9wLmJvZHkpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgY29uc3QgZW52ZWxvcEJvZHk6IEVudmVsb3BCb2R5ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgICAgIGlmIChlbnZlbG9wQm9keS5zZW5kZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZS5uZXh0KGVudmVsb3BCb2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc29ja2V0Lm9ub3BlbiA9ICgpID0+IHRoaXMuc3RhdGVDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5fc29ja2V0Lm9uZXJyb3IgPSAoKSA9PiB0aGlzLnN0YXRlQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuX3NvY2tldC5vbmNsb3NlID0gKCkgPT4gdGhpcy5zdGF0ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9zb2NrZXQuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBzZW5kKGVudmVsb3A6IFdlYlNvY2tldEVudmVsb3ApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShlbnZlbG9wKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignU2VuZCBtZXNzYWdlIGZhaWxlZCcsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9waW5nKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICAgICAgdGhpcy5fc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoe3R5cGU6ICdwaW5nJ30pKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fcGluZygpLCAxMDAwMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=