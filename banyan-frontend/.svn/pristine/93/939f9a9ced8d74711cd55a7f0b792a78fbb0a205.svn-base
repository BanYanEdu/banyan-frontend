/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { WebSocketAbstract } from './websocket-abstract';
import * as EventBus from 'vertx3-eventbus-client';
export class WebSocketVertx extends WebSocketAbstract {
    /**
     * @return {?}
     */
    get readyState() {
        return this._eventbus ? this._eventbus.state : null;
    }
    ;
    /**
     * @param {?} options
     * @param {?} username
     * @return {?}
     */
    connect(options, username) {
        if (options && options.length === 2) {
            /** @type {?} */
            var url = options[0];
            /** @type {?} */
            var headers = {
                keyapi: options[1]
            };
            this._connect(url, headers, username);
        }
    }
    /**
     * @private
     * @param {?} url
     * @param {?} headers
     * @param {?} username
     * @return {?}
     */
    _connect(url, headers, username) {
        this._eventbus = new EventBus(url, {
            transports: 'websocket'
        });
        this._eventbus.onopen = (/**
         * @return {?}
         */
        () => {
            // Channel receive chat message
            this._eventbus.registerHandler(username, headers, (/**
             * @param {?} err
             * @param {?} msg
             * @return {?}
             */
            (err, msg) => {
                if (msg) {
                    this.onMessage.next(msg.body);
                }
            }));
            // Channel receive online message
            // this._eventbus.registerHandler('news-feed', headers, (err: any, msg: any) => {
            //     if (msg) {
            //         this.onMessage.next(msg);
            //     }
            // });
            this.stateChange();
        });
        this._eventbus.onclose = (/**
         * @return {?}
         */
        () => this.stateChange());
        this._eventbus.onerror = (/**
         * @return {?}
         */
        () => this.stateChange());
    }
    /**
     * @return {?}
     */
    close() {
        this._eventbus.close();
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
                this._eventbus.publish(envelop.address, envelop.body);
                resolve(true);
            }
            catch (e) {
                resolve(false);
                console.warn('Send message failed', e);
            }
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebSocketVertx.prototype._eventbus;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LXZlcnR4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3dlYnNvY2tldC93ZWJzb2NrZXQtdmVydHgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEtBQUssUUFBUSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE1BQU0sT0FBTyxjQUFlLFNBQVEsaUJBQWlCOzs7O0lBR2pELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN4RCxDQUFDO0lBQUEsQ0FBQzs7Ozs7O0lBRUYsT0FBTyxDQUFDLE9BQVksRUFBRSxRQUFnQjtRQUNsQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7Z0JBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDOztnQkFDaEIsT0FBTyxHQUFHO2dCQUNWLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsR0FBVyxFQUFFLE9BQVksRUFBRSxRQUFnQjtRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUMvQixVQUFVLEVBQUUsV0FBVztTQUMxQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07OztRQUFHLEdBQUcsRUFBRTtZQUN6QiwrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU87Ozs7O1lBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7Z0JBQ3JFLElBQUksR0FBRyxFQUFFO29CQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLEVBQUMsQ0FBQztZQUNILGlDQUFpQztZQUNqQyxpRkFBaUY7WUFDakYsaUJBQWlCO1lBQ2pCLG9DQUFvQztZQUNwQyxRQUFRO1lBQ1IsTUFBTTtZQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUEsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7O1FBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUEsQ0FBQztJQUN0RCxDQUFDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsT0FBeUI7UUFDMUIsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUN6QixJQUFJO2dCQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakI7WUFBQyxPQUFNLENBQUMsRUFBRTtnQkFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMxQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKOzs7Ozs7SUF0REcsbUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2ViU29ja2V0QWJzdHJhY3QsIFdlYlNvY2tldEVudmVsb3AgfSBmcm9tICcuL3dlYnNvY2tldC1hYnN0cmFjdCc7XG5pbXBvcnQgKiBhcyBFdmVudEJ1cyBmcm9tICd2ZXJ0eDMtZXZlbnRidXMtY2xpZW50JztcblxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldFZlcnR4IGV4dGVuZHMgV2ViU29ja2V0QWJzdHJhY3Qge1xuICAgIHByaXZhdGUgX2V2ZW50YnVzOiBFdmVudEJ1cztcblxuICAgIGdldCByZWFkeVN0YXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudGJ1cyA/IHRoaXMuX2V2ZW50YnVzLnN0YXRlIDogbnVsbDtcbiAgICB9O1xuXG4gICAgY29ubmVjdChvcHRpb25zOiBhbnksIHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciB1cmwgPSBvcHRpb25zWzBdO1xuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgICAgICAgICAga2V5YXBpOiBvcHRpb25zWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdCh1cmwsIGhlYWRlcnMsIHVzZXJuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Nvbm5lY3QodXJsOiBzdHJpbmcsIGhlYWRlcnM6IGFueSwgdXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9ldmVudGJ1cyA9IG5ldyBFdmVudEJ1cyh1cmwsIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6ICd3ZWJzb2NrZXQnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudGJ1cy5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBDaGFubmVsIHJlY2VpdmUgY2hhdCBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLl9ldmVudGJ1cy5yZWdpc3RlckhhbmRsZXIodXNlcm5hbWUsIGhlYWRlcnMsIChlcnI6IGFueSwgbXNnOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlLm5leHQobXNnLmJvZHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQ2hhbm5lbCByZWNlaXZlIG9ubGluZSBtZXNzYWdlXG4gICAgICAgICAgICAvLyB0aGlzLl9ldmVudGJ1cy5yZWdpc3RlckhhbmRsZXIoJ25ld3MtZmVlZCcsIGhlYWRlcnMsIChlcnI6IGFueSwgbXNnOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMub25NZXNzYWdlLm5leHQobXNnKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZXZlbnRidXMub25jbG9zZSA9ICgpID0+IHRoaXMuc3RhdGVDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRidXMub25lcnJvciA9ICgpID0+IHRoaXMuc3RhdGVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRidXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBzZW5kKGVudmVsb3A6IFdlYlNvY2tldEVudmVsb3ApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudGJ1cy5wdWJsaXNoKGVudmVsb3AuYWRkcmVzcywgZW52ZWxvcC5ib2R5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdTZW5kIG1lc3NhZ2UgZmFpbGVkJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=