import * as tslib_1 from "tslib";
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
var GraphqlQueryBuilder = /** @class */ (function () {
    /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
    function GraphqlQueryBuilder(queryFnName, aliasOrFilter) {
        this.queryFnName = queryFnName;
        this.head = [];
        if (typeof aliasOrFilter === 'function') {
            this.alias = aliasOrFilter;
        }
        else if (typeof aliasOrFilter === 'object') {
            this.filter(aliasOrFilter);
        }
        else if (undefined === aliasOrFilter && 2 === arguments.length) {
            throw new TypeError("You have passed undefined as Second argument to \"Query\"");
        }
        else if (undefined !== aliasOrFilter) {
            throw new TypeError("Second argument to \"Query\" should be an alias name(String) or filter arguments(Object). was passed " + aliasOrFilter);
        }
    }
    /**
     * The parameters to run the query against.
     * @param filters An object mapping attribute to values
     */
    GraphqlQueryBuilder.prototype.filter = function (filters) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                if (typeof filters[prop] === 'function') {
                    continue;
                }
                var val = this.getGraphQLValue(filters[prop]);
                if (val === '{}') {
                    continue;
                }
                this.head.push(prop + ":" + val);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    /**
     * Outlines the properties you wish to be returned from the query.
     * @param properties representing each attribute you want Returned
     */
    GraphqlQueryBuilder.prototype.find = function () {
        var searches = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            searches[_i] = arguments[_i];
        }
        if (!searches) {
            throw new TypeError("find value can not be >>falsy<<");
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        var searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        this.body = this.parceFind(searchKeys);
        return this;
    };
    /**
     * set an alias for this result.
     * @param alias
     */
    GraphqlQueryBuilder.prototype.setAlias = function (alias) {
        this.alias = alias;
    };
    /**
     * Return to the formatted query string
     * @return
     */
    GraphqlQueryBuilder.prototype.toString = function () {
        if (this.body === undefined) {
            throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
        }
        return ((this.alias) ? (this.alias + ':') : '') + " " + this.queryFnName + " " + ((this.head.length > 0) ? '(' + this.head.join(',') + ')' : '') + "  { " + this.body + " }";
    };
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    GraphqlQueryBuilder.prototype.parceFind = function (_levelA) {
        var propsA = _levelA.map(function (currentValue, index) {
            var itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                var propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
                }
                var propS = propsAA[0];
                var item = itemX[propS];
                if (Array.isArray(item)) {
                    return new GraphqlQueryBuilder(propS).find(item);
                }
                return propS + " : " + item + " ";
            }
            else if (typeof itemX === 'string') {
                return itemX;
            }
            else {
                throw new RangeError("cannot handle Find value of " + itemX);
            }
        });
        return propsA.join(',');
    };
    GraphqlQueryBuilder.prototype.getGraphQLValue = function (value) {
        var _this = this;
        if (typeof value === 'string') {
            value = JSON.stringify(value);
        }
        else if (Array.isArray(value)) {
            value = value.map(function (item) {
                return _this.getGraphQLValue(item);
            }).join();
            value = "[" + value + "]";
        }
        else if (value instanceof Date) {
            value = JSON.stringify(value);
        }
        else if (value !== null && typeof value === 'object') {
            value = this.objectToString(value);
        }
        return value;
    };
    GraphqlQueryBuilder.prototype.objectToString = function (obj) {
        var e_2, _a;
        var sourceA = [];
        try {
            for (var _b = tslib_1.__values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                if (typeof obj[prop] === 'function') {
                    continue;
                }
                sourceA.push(prop + ":" + this.getGraphQLValue(obj[prop]));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return "{" + sourceA.join() + "}";
    };
    return GraphqlQueryBuilder;
}());
export default GraphqlQueryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJ5QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ3JhcGhxbFF1ZXJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRztBQUNIO0lBS0UsbUZBQW1GO0lBQ25GLDZCQUFvQixXQUFtQixFQUFFLGFBQStCO1FBQXBELGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBSnZDLFNBQUksR0FBVSxFQUFFLENBQUM7UUFLZixJQUFJLE9BQU8sYUFBYSxLQUFLLFVBQVUsRUFBRTtZQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztTQUM1QjthQUFNLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDNUI7YUFBTSxJQUFJLFNBQVMsS0FBSyxhQUFhLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDaEUsTUFBTSxJQUFJLFNBQVMsQ0FBQywyREFBeUQsQ0FBQyxDQUFDO1NBQ2hGO2FBQU0sSUFBSSxTQUFTLEtBQUssYUFBYSxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxTQUFTLENBQUMsMEdBQXNHLGFBQWUsQ0FBQyxDQUFDO1NBQzVJO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILG9DQUFNLEdBQU4sVUFBTyxPQUFZOzs7WUFDakIsS0FBbUIsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXBDLElBQU0sSUFBSSxXQUFBO2dCQUNiLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUN2QyxTQUFTO2lCQUNWO2dCQUNELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxl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NENBQWMsR0FBdEIsVUFBdUIsR0FBUTs7UUFDN0IsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDOztZQUVuQixLQUFtQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBaEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ2IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ25DLFNBQVM7aUJBQ1Y7Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBSSxJQUFJLFNBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUcsQ0FBQyxDQUFDO2FBQzVEOzs7Ozs7Ozs7UUFDRCxPQUFPLE1BQUksT0FBTyxDQUFDLElBQUksRUFBRSxNQUFHLENBQUM7SUFDL0IsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQWxJRCxJQWtJQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGlzIEdyYXBocWxRdWVyeUJ1aWxkZXIgY2xhc3MgaXMgYSBsaWIgdGhhdCBhbHJlYWR5IGV4aXN0XHJcbiAqIGJ1dCB3YXMgY2F1c2luZyBpc3N1ZXMgd2l0aCBUeXBlU2NyaXB0LCBSZXF1aXJlSlMgYW5kIG90aGVyIGJ1bmRsZXIvcGFja2FnZXJzXHJcbiAqIGFuZCBzbyBJIHJld3JvdGUgaXQgaW4gcHVyZSBUeXBlU2NyaXB0LlxyXG4gKlxyXG4gKiBUaGUgcHJldmlvdXMgbGliIGNhbiBiZSB2aWV3ZWQgaGVyZSBhdCB0aGlzIEdpdGh1YlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY29kZW1lYXNhbmR3aWNoL2dyYXBocWwtcXVlcnktYnVpbGRlclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhxbFF1ZXJ5QnVpbGRlciB7XHJcbiAgYWxpYXM6IHN0cmluZyB8IEZ1bmN0aW9uO1xyXG4gIGhlYWQ6IGFueVtdID0gW107XHJcbiAgYm9keTogYW55O1xyXG5cclxuICAvKiBDb25zdHJ1Y3RvciwgcXVlcnkvbXV0YXRvciB5b3Ugd2lzaCB0byB1c2UsIGFuZCBhbiBhbGlhcyBvciBmaWx0ZXIgYXJndW1lbnRzLiAqL1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcXVlcnlGbk5hbWU6IHN0cmluZywgYWxpYXNPckZpbHRlcj86IHN0cmluZyB8IG9iamVjdCkge1xyXG4gICAgaWYgKHR5cGVvZiBhbGlhc09yRmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuYWxpYXMgPSBhbGlhc09yRmlsdGVyO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWxpYXNPckZpbHRlciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhpcy5maWx0ZXIoYWxpYXNPckZpbHRlcik7XHJcbiAgICB9IGVsc2UgaWYgKHVuZGVmaW5lZCA9PT0gYWxpYXNPckZpbHRlciAmJiAyID09PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFlvdSBoYXZlIHBhc3NlZCB1bmRlZmluZWQgYXMgU2Vjb25kIGFyZ3VtZW50IHRvIFwiUXVlcnlcImApO1xyXG4gICAgfSBlbHNlIGlmICh1bmRlZmluZWQgIT09IGFsaWFzT3JGaWx0ZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgU2Vjb25kIGFyZ3VtZW50IHRvIFwiUXVlcnlcIiBzaG91bGQgYmUgYW4gYWxpYXMgbmFtZShTdHJpbmcpIG9yIGZpbHRlciBhcmd1bWVudHMoT2JqZWN0KS4gd2FzIHBhc3NlZCAke2FsaWFzT3JGaWx0ZXJ9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGFyYW1ldGVycyB0byBydW4gdGhlIHF1ZXJ5IGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGZpbHRlcnMgQW4gb2JqZWN0IG1hcHBpbmcgYXR0cmlidXRlIHRvIHZhbHVlc1xyXG4gICAqL1xyXG4gIGZpbHRlcihmaWx0ZXJzOiBhbnkpIHtcclxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhmaWx0ZXJzKSkge1xyXG4gICAgICBpZiAodHlwZW9mIGZpbHRlcnNbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmdldEdyYXBoUUxWYWx1ZShmaWx0ZXJzW3Byb3BdKTtcclxuICAgICAgaWYgKHZhbCA9PT0gJ3t9Jykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaGVhZC5wdXNoKGAke3Byb3B9OiR7dmFsfWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPdXRsaW5lcyB0aGUgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBiZSByZXR1cm5lZCBmcm9tIHRoZSBxdWVyeS5cclxuICAgKiBAcGFyYW0gcHJvcGVydGllcyByZXByZXNlbnRpbmcgZWFjaCBhdHRyaWJ1dGUgeW91IHdhbnQgUmV0dXJuZWRcclxuICAgKi9cclxuICBmaW5kKC4uLnNlYXJjaGVzOiBhbnlbXSkgeyAvLyBUSElTIE5FRUQgVE8gQkUgQSBcIkZVTkNUSU9OXCIgdG8gc2NvcGUgJ2FyZ3VtZW50cydcclxuICAgIGlmICghc2VhcmNoZXMpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZmluZCB2YWx1ZSBjYW4gbm90IGJlID4+ZmFsc3k8PGApO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgaXRzIGEgc3RyaW5nLi4gaXQgbWF5IGhhdmUgb3RoZXIgdmFsdWVzXHJcbiAgICAvLyBlbHNlIGl0IHNvdWxkIGJlIGFuIE9iamVjdCBvciBBcnJheSBvZiBtYXBlZCB2YWx1ZXNcclxuICAgIGNvbnN0IHNlYXJjaEtleXMgPSAoc2VhcmNoZXMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoZXNbMF0pKSA/IHNlYXJjaGVzWzBdIDogc2VhcmNoZXM7XHJcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnBhcmNlRmluZChzZWFyY2hLZXlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IGFuIGFsaWFzIGZvciB0aGlzIHJlc3VsdC5cclxuICAgKiBAcGFyYW0gYWxpYXNcclxuICAgKi9cclxuICBzZXRBbGlhcyhhbGlhczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFsaWFzID0gYWxpYXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdG8gdGhlIGZvcm1hdHRlZCBxdWVyeSBzdHJpbmdcclxuICAgKiBAcmV0dXJuXHJcbiAgICovXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBpZiAodGhpcy5ib2R5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGByZXR1cm4gcHJvcGVydGllcyBhcmUgbm90IGRlZmluZWQuIHVzZSB0aGUgJ2ZpbmQnIGZ1bmN0aW9uIHRvIGRlZmluZWQgdGhlbWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgJHsodGhpcy5hbGlhcykgPyAodGhpcy5hbGlhcyArICc6JykgOiAnJ30gJHt0aGlzLnF1ZXJ5Rm5OYW1lfSAkeyh0aGlzLmhlYWQubGVuZ3RoID4gMCkgPyAnKCcgKyB0aGlzLmhlYWQuam9pbignLCcpICsgJyknIDogJyd9ICB7ICR7dGhpcy5ib2R5fSB9YDtcclxuICB9XHJcblxyXG4gIC8vIC0tXHJcbiAgLy8gUFJJVkFURSBGVU5DVElPTlNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIHBhcmNlRmluZChfbGV2ZWxBOiBhbnlbXSkge1xyXG4gICAgY29uc3QgcHJvcHNBID0gX2xldmVsQS5tYXAoKGN1cnJlbnRWYWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgaXRlbVggPSBfbGV2ZWxBW2luZGV4XTtcclxuXHJcbiAgICAgIGlmIChpdGVtWCBpbnN0YW5jZW9mIEdyYXBocWxRdWVyeUJ1aWxkZXIpIHtcclxuICAgICAgICByZXR1cm4gaXRlbVgudG9TdHJpbmcoKTtcclxuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShpdGVtWCkgJiYgdHlwZW9mIGl0ZW1YID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IHByb3BzQUEgPSBPYmplY3Qua2V5cyhpdGVtWCk7XHJcbiAgICAgICAgaWYgKDEgIT09IHByb3BzQUEubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgQWxpYXMgb2JqZWN0cyBzaG91bGQgb25seSBoYXZlIG9uZSB2YWx1ZS4gd2FzIHBhc3NlZDogJHtKU09OLnN0cmluZ2lmeShpdGVtWCl9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHByb3BTID0gcHJvcHNBQVswXTtcclxuICAgICAgICBjb25zdCBpdGVtID0gaXRlbVhbcHJvcFNdO1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHFsUXVlcnlCdWlsZGVyKHByb3BTKS5maW5kKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7cHJvcFN9IDogJHtpdGVtfSBgO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtWCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZXR1cm4gaXRlbVg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYGNhbm5vdCBoYW5kbGUgRmluZCB2YWx1ZSBvZiAke2l0ZW1YfWApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvcHNBLmpvaW4oJywnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0R3JhcGhRTFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlLm1hcChpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcmFwaFFMVmFsdWUoaXRlbSk7XHJcbiAgICAgIH0pLmpvaW4oKTtcclxuICAgICAgdmFsdWUgPSBgWyR7dmFsdWV9XWA7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB2YWx1ZSA9IHRoaXMub2JqZWN0VG9TdHJpbmcodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvYmplY3RUb1N0cmluZyhvYmo6IGFueSkge1xyXG4gICAgY29uc3Qgc291cmNlQSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhvYmopKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgc291cmNlQS5wdXNoKGAke3Byb3B9OiR7dGhpcy5nZXRHcmFwaFFMVmFsdWUob2JqW3Byb3BdKX1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBgeyR7c291cmNlQS5qb2luKCl9fWA7XHJcbiAgfVxyXG59XHJcbiJdfQ==