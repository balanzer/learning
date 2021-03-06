/**
 * @license NgRx 7.1.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngrx/store'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store-devtools', ['exports', '@angular/core', '@ngrx/store', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.ngrx = global.ngrx || {}, global.ngrx.storeDevtools = {}),global.ng.core,global['@ngrx/store'],global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,store,rxjs,operators) { 'use strict';

    var StoreDevtoolsConfig = /** @class */ (function () {
        function StoreDevtoolsConfig() {
        }
        return StoreDevtoolsConfig;
    }());
    var STORE_DEVTOOLS_CONFIG = new core.InjectionToken('@ngrx/devtools Options');
    var INITIAL_OPTIONS = new core.InjectionToken('@ngrx/devtools Initial Config');
    function noMonitor() {
        return null;
    }
    var DEFAULT_NAME = 'NgRx Store DevTools';
    function createConfig(_options) {
        var DEFAULT_OPTIONS = {
            maxAge: false,
            monitor: noMonitor,
            actionSanitizer: undefined,
            stateSanitizer: undefined,
            name: DEFAULT_NAME,
            serialize: false,
            logOnly: false,
            // Add all features explicitely. This prevent buggy behavior for
            // options like "lock" which might otherwise not show up.
            features: {
                pause: true,
                lock: true,
                persist: true,
                export: true,
                import: 'custom',
                jump: true,
                skip: true,
                reorder: true,
                dispatch: true,
                test: true,
            },
        };
        var options = typeof _options === 'function' ? _options() : _options;
        var logOnly = options.logOnly
            ? { pause: true, export: true, test: true }
            : false;
        var features = options.features || logOnly || DEFAULT_OPTIONS.features;
        var config = Object.assign({}, DEFAULT_OPTIONS, { features: features }, options);
        if (config.maxAge && config.maxAge < 2) {
            throw new Error("Devtools 'maxAge' cannot be less than 2, got " + config.maxAge);
        }
        return config;
    }

    var PERFORM_ACTION = 'PERFORM_ACTION';
    var REFRESH = 'REFRESH';
    var RESET = 'RESET';
    var ROLLBACK = 'ROLLBACK';
    var COMMIT = 'COMMIT';
    var SWEEP = 'SWEEP';
    var TOGGLE_ACTION = 'TOGGLE_ACTION';
    var SET_ACTIONS_ACTIVE = 'SET_ACTIONS_ACTIVE';
    var JUMP_TO_STATE = 'JUMP_TO_STATE';
    var JUMP_TO_ACTION = 'JUMP_TO_ACTION';
    var IMPORT_STATE = 'IMPORT_STATE';
    var LOCK_CHANGES = 'LOCK_CHANGES';
    var PAUSE_RECORDING = 'PAUSE_RECORDING';
    var PerformAction = /** @class */ (function () {
        function PerformAction(action, timestamp) {
            this.action = action;
            this.timestamp = timestamp;
            this.type = PERFORM_ACTION;
            if (typeof action.type === 'undefined') {
                throw new Error('Actions may not have an undefined "type" property. ' +
                    'Have you misspelled a constant?');
            }
        }
        return PerformAction;
    }());
    var Refresh = /** @class */ (function () {
        function Refresh() {
            this.type = REFRESH;
        }
        return Refresh;
    }());
    var Reset = /** @class */ (function () {
        function Reset(timestamp) {
            this.timestamp = timestamp;
            this.type = RESET;
        }
        return Reset;
    }());
    var Rollback = /** @class */ (function () {
        function Rollback(timestamp) {
            this.timestamp = timestamp;
            this.type = ROLLBACK;
        }
        return Rollback;
    }());
    var Commit = /** @class */ (function () {
        function Commit(timestamp) {
            this.timestamp = timestamp;
            this.type = COMMIT;
        }
        return Commit;
    }());
    var Sweep = /** @class */ (function () {
        function Sweep() {
            this.type = SWEEP;
        }
        return Sweep;
    }());
    var ToggleAction = /** @class */ (function () {
        function ToggleAction(id) {
            this.id = id;
            this.type = TOGGLE_ACTION;
        }
        return ToggleAction;
    }());
    var JumpToState = /** @class */ (function () {
        function JumpToState(index) {
            this.index = index;
            this.type = JUMP_TO_STATE;
        }
        return JumpToState;
    }());
    var JumpToAction = /** @class */ (function () {
        function JumpToAction(actionId) {
            this.actionId = actionId;
            this.type = JUMP_TO_ACTION;
        }
        return JumpToAction;
    }());
    var ImportState = /** @class */ (function () {
        function ImportState(nextLiftedState) {
            this.nextLiftedState = nextLiftedState;
            this.type = IMPORT_STATE;
        }
        return ImportState;
    }());
    var LockChanges = /** @class */ (function () {
        function LockChanges(status) {
            this.status = status;
            this.type = LOCK_CHANGES;
        }
        return LockChanges;
    }());
    var PauseRecording = /** @class */ (function () {
        function PauseRecording(status) {
            this.status = status;
            this.type = PAUSE_RECORDING;
        }
        return PauseRecording;
    }());

    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function difference(first, second) {
        return first.filter(function (item) { return second.indexOf(item) < 0; });
    }
    /**
     * Provides an app's view into the state of the lifted store.
     */
    function unliftState(liftedState) {
        var computedStates = liftedState.computedStates, currentStateIndex = liftedState.currentStateIndex;
        var state = computedStates[currentStateIndex].state;
        return state;
    }
    /**
     * Lifts an app's action into an action on the lifted store.
     */
    function liftAction(action) {
        return new PerformAction(action, +Date.now());
    }
    /**
     * Sanitizes given actions with given function.
     */
    function sanitizeActions(actionSanitizer, actions) {
        return Object.keys(actions).reduce(function (sanitizedActions, actionIdx) {
            var idx = Number(actionIdx);
            sanitizedActions[idx] = sanitizeAction(actionSanitizer, actions[idx], idx);
            return sanitizedActions;
        }, {});
    }
    /**
     * Sanitizes given action with given function.
     */
    function sanitizeAction(actionSanitizer, action, actionIdx) {
        return __assign({}, action, { action: actionSanitizer(action.action, actionIdx) });
    }
    /**
     * Sanitizes given states with given function.
     */
    function sanitizeStates(stateSanitizer, states) {
        return states.map(function (computedState, idx) { return ({
            state: sanitizeState(stateSanitizer, computedState.state, idx),
            error: computedState.error,
        }); });
    }
    /**
     * Sanitizes given state with given function.
     */
    function sanitizeState(stateSanitizer, state, stateIdx) {
        return stateSanitizer(state, stateIdx);
    }
    /**
     * Read the config and tell if actions should be filtered
     */
    function shouldFilterActions(config) {
        return config.predicate || config.actionsWhitelist || config.actionsBlacklist;
    }
    /**
     * Return a full filtered lifted state
     */
    function filterLiftedState(liftedState, predicate, whitelist, blacklist) {
        var filteredStagedActionIds = [];
        var filteredActionsById = {};
        var filteredComputedStates = [];
        liftedState.stagedActionIds.forEach(function (id, idx) {
            var liftedAction = liftedState.actionsById[id];
            if (!liftedAction)
                return;
            if (idx &&
                isActionFiltered(liftedState.computedStates[idx], liftedAction, predicate, whitelist, blacklist)) {
                return;
            }
            filteredActionsById[id] = liftedAction;
            filteredStagedActionIds.push(id);
            filteredComputedStates.push(liftedState.computedStates[idx]);
        });
        return __assign({}, liftedState, { stagedActionIds: filteredStagedActionIds, actionsById: filteredActionsById, computedStates: filteredComputedStates });
    }
    /**
     * Return true is the action should be ignored
     */
    function isActionFiltered(state, action, predicate, whitelist, blacklist) {
        return ((predicate && !predicate(state, action.action)) ||
            (whitelist && !action.action.type.match(whitelist.join('|'))) ||
            (blacklist && action.action.type.match(blacklist.join('|'))));
    }

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DevtoolsDispatcher = /** @class */ (function (_super) {
        __extends(DevtoolsDispatcher, _super);
        function DevtoolsDispatcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DevtoolsDispatcher = __decorate([
            core.Injectable()
        ], DevtoolsDispatcher);
        return DevtoolsDispatcher;
    }(store.ActionsSubject));

    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var ExtensionActionTypes = {
        START: 'START',
        DISPATCH: 'DISPATCH',
        STOP: 'STOP',
        ACTION: 'ACTION',
    };
    var REDUX_DEVTOOLS_EXTENSION = new core.InjectionToken('Redux Devtools Extension');
    var DevtoolsExtension = /** @class */ (function () {
        function DevtoolsExtension(devtoolsExtension, config, dispatcher) {
            this.config = config;
            this.dispatcher = dispatcher;
            this.devtoolsExtension = devtoolsExtension;
            this.createActionStreams();
        }
        DevtoolsExtension.prototype.notify = function (action, state) {
            var _this = this;
            if (!this.devtoolsExtension) {
                return;
            }
            // Check to see if the action requires a full update of the liftedState.
            // If it is a simple action generated by the user's app and the recording
            // is not locked/paused, only send the action and the current state (fast).
            //
            // A full liftedState update (slow: serializes the entire liftedState) is
            // only required when:
            //   a) redux-devtools-extension fires the @@Init action (ignored by
            //      @ngrx/store-devtools)
            //   b) an action is generated by an @ngrx module (e.g. @ngrx/effects/init
            //      or @ngrx/store/update-reducers)
            //   c) the state has been recomputed due to time-traveling
            //   d) any action that is not a PerformAction to err on the side of
            //      caution.
            if (action.type === PERFORM_ACTION) {
                if (state.isLocked || state.isPaused) {
                    return;
                }
                var currentState = unliftState(state);
                if (shouldFilterActions(this.config) &&
                    isActionFiltered(currentState, action, this.config.predicate, this.config.actionsWhitelist, this.config.actionsBlacklist)) {
                    return;
                }
                var sanitizedState_1 = this.config.stateSanitizer
                    ? sanitizeState(this.config.stateSanitizer, currentState, state.currentStateIndex)
                    : currentState;
                var sanitizedAction_1 = this.config.actionSanitizer
                    ? sanitizeAction(this.config.actionSanitizer, action, state.nextActionId)
                    : action;
                this.sendToReduxDevtools(function () {
                    return _this.extensionConnection.send(sanitizedAction_1, sanitizedState_1);
                });
            }
            else {
                // Requires full state update
                var sanitizedLiftedState_1 = __assign$1({}, state, { stagedActionIds: state.stagedActionIds, actionsById: this.config.actionSanitizer
                        ? sanitizeActions(this.config.actionSanitizer, state.actionsById)
                        : state.actionsById, computedStates: this.config.stateSanitizer
                        ? sanitizeStates(this.config.stateSanitizer, state.computedStates)
                        : state.computedStates });
                this.sendToReduxDevtools(function () {
                    return _this.devtoolsExtension.send(null, sanitizedLiftedState_1, _this.getExtensionConfig(_this.config));
                });
            }
        };
        DevtoolsExtension.prototype.createChangesObservable = function () {
            var _this = this;
            if (!this.devtoolsExtension) {
                return rxjs.empty();
            }
            return new rxjs.Observable(function (subscriber) {
                var connection = _this.devtoolsExtension.connect(_this.getExtensionConfig(_this.config));
                _this.extensionConnection = connection;
                connection.init();
                connection.subscribe(function (change) { return subscriber.next(change); });
                return connection.unsubscribe;
            });
        };
        DevtoolsExtension.prototype.createActionStreams = function () {
            var _this = this;
            // Listens to all changes
            var changes$ = this.createChangesObservable().pipe(operators.share());
            // Listen for the start action
            var start$ = changes$.pipe(operators.filter(function (change) { return change.type === ExtensionActionTypes.START; }));
            // Listen for the stop action
            var stop$ = changes$.pipe(operators.filter(function (change) { return change.type === ExtensionActionTypes.STOP; }));
            // Listen for lifted actions
            var liftedActions$ = changes$.pipe(operators.filter(function (change) { return change.type === ExtensionActionTypes.DISPATCH; }), operators.map(function (change) { return _this.unwrapAction(change.payload); }), operators.concatMap(function (action) {
                if (action.type === IMPORT_STATE) {
                    // State imports may happen in two situations:
                    // 1. Explicitly by user
                    // 2. User activated the "persist state accross reloads" option
                    //    and now the state is imported during reload.
                    // Because of option 2, we need to give possible
                    // lazy loaded reducers time to instantiate.
                    // As soon as there is no UPDATE action within 1 second,
                    // it is assumed that all reducers are loaded.
                    return _this.dispatcher.pipe(operators.filter(function (action) { return action.type === store.UPDATE; }), operators.timeout(1000), operators.debounceTime(1000), operators.map(function () { return action; }), operators.catchError(function () { return rxjs.of(action); }), operators.take(1));
                }
                else {
                    return rxjs.of(action);
                }
            }));
            // Listen for unlifted actions
            var actions$ = changes$.pipe(operators.filter(function (change) { return change.type === ExtensionActionTypes.ACTION; }), operators.map(function (change) { return _this.unwrapAction(change.payload); }));
            var actionsUntilStop$ = actions$.pipe(operators.takeUntil(stop$));
            var liftedUntilStop$ = liftedActions$.pipe(operators.takeUntil(stop$));
            this.start$ = start$.pipe(operators.takeUntil(stop$));
            // Only take the action sources between the start/stop events
            this.actions$ = this.start$.pipe(operators.switchMap(function () { return actionsUntilStop$; }));
            this.liftedActions$ = this.start$.pipe(operators.switchMap(function () { return liftedUntilStop$; }));
        };
        DevtoolsExtension.prototype.unwrapAction = function (action) {
            return typeof action === 'string' ? eval("(" + action + ")") : action;
        };
        DevtoolsExtension.prototype.getExtensionConfig = function (config) {
            var extensionOptions = {
                name: config.name,
                features: config.features,
                serialize: config.serialize,
            };
            if (config.maxAge !== false /* support === 0 */) {
                extensionOptions.maxAge = config.maxAge;
            }
            return extensionOptions;
        };
        DevtoolsExtension.prototype.sendToReduxDevtools = function (send) {
            try {
                send();
            }
            catch (err) {
                console.warn('@ngrx/store-devtools: something went wrong inside the redux devtools', err);
            }
        };
        DevtoolsExtension = __decorate$1([
            core.Injectable(),
            __param(0, core.Inject(REDUX_DEVTOOLS_EXTENSION)),
            __param(1, core.Inject(STORE_DEVTOOLS_CONFIG)),
            __metadata("design:paramtypes", [Object, StoreDevtoolsConfig,
                DevtoolsDispatcher])
        ], DevtoolsExtension);
        return DevtoolsExtension;
    }());

    var __assign$2 = (undefined && undefined.__assign) || function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var __read = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var INIT_ACTION = { type: store.INIT };
    var RECOMPUTE = '@ngrx/store-devtools/recompute';
    var RECOMPUTE_ACTION = { type: RECOMPUTE };
    /**
     * Computes the next entry in the log by applying an action.
     */
    function computeNextEntry(reducer, action, state, error, errorHandler) {
        if (error) {
            return {
                state: state,
                error: 'Interrupted by an error up the chain',
            };
        }
        var nextState = state;
        var nextError;
        try {
            nextState = reducer(state, action);
        }
        catch (err) {
            nextError = err.toString();
            errorHandler.handleError(err.stack || err);
        }
        return {
            state: nextState,
            error: nextError,
        };
    }
    /**
     * Runs the reducer on invalidated actions to get a fresh computation log.
     */
    function recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, errorHandler, isPaused) {
        // Optimization: exit early and return the same reference
        // if we know nothing could have changed.
        if (minInvalidatedStateIndex >= computedStates.length &&
            computedStates.length === stagedActionIds.length) {
            return computedStates;
        }
        var nextComputedStates = computedStates.slice(0, minInvalidatedStateIndex);
        // If the recording is paused, recompute all states up until the pause state,
        // else recompute all states.
        var lastIncludedActionId = stagedActionIds.length - (isPaused ? 1 : 0);
        for (var i = minInvalidatedStateIndex; i < lastIncludedActionId; i++) {
            var actionId = stagedActionIds[i];
            var action = actionsById[actionId].action;
            var previousEntry = nextComputedStates[i - 1];
            var previousState = previousEntry ? previousEntry.state : committedState;
            var previousError = previousEntry ? previousEntry.error : undefined;
            var shouldSkip = skippedActionIds.indexOf(actionId) > -1;
            var entry = shouldSkip
                ? previousEntry
                : computeNextEntry(reducer, action, previousState, previousError, errorHandler);
            nextComputedStates.push(entry);
        }
        // If the recording is paused, the last state will not be recomputed,
        // because it's essentially not part of the state history.
        if (isPaused) {
            nextComputedStates.push(computedStates[computedStates.length - 1]);
        }
        return nextComputedStates;
    }
    function liftInitialState(initialCommittedState, monitorReducer) {
        return {
            monitorState: monitorReducer(undefined, {}),
            nextActionId: 1,
            actionsById: { 0: liftAction(INIT_ACTION) },
            stagedActionIds: [0],
            skippedActionIds: [],
            committedState: initialCommittedState,
            currentStateIndex: 0,
            computedStates: [],
            isLocked: false,
            isPaused: false,
        };
    }
    /**
     * Creates a history state reducer from an app's reducer.
     */
    function liftReducerWith(initialCommittedState, initialLiftedState, errorHandler, monitorReducer, options) {
        if (options === void 0) { options = {}; }
        /**
         * Manages how the history actions modify the history state.
         */
        return function (reducer) { return function (liftedState, liftedAction) {
            var _a;
            var _b = liftedState || initialLiftedState, monitorState = _b.monitorState, actionsById = _b.actionsById, nextActionId = _b.nextActionId, stagedActionIds = _b.stagedActionIds, skippedActionIds = _b.skippedActionIds, committedState = _b.committedState, currentStateIndex = _b.currentStateIndex, computedStates = _b.computedStates, isLocked = _b.isLocked, isPaused = _b.isPaused;
            if (!liftedState) {
                // Prevent mutating initialLiftedState
                actionsById = Object.create(actionsById);
            }
            function commitExcessActions(n) {
                // Auto-commits n-number of excess actions.
                var excess = n;
                var idsToDelete = stagedActionIds.slice(1, excess + 1);
                for (var i = 0; i < idsToDelete.length; i++) {
                    if (computedStates[i + 1].error) {
                        // Stop if error is found. Commit actions up to error.
                        excess = i;
                        idsToDelete = stagedActionIds.slice(1, excess + 1);
                        break;
                    }
                    else {
                        delete actionsById[idsToDelete[i]];
                    }
                }
                skippedActionIds = skippedActionIds.filter(function (id) { return idsToDelete.indexOf(id) === -1; });
                stagedActionIds = __spread([0], stagedActionIds.slice(excess + 1));
                committedState = computedStates[excess].state;
                computedStates = computedStates.slice(excess);
                currentStateIndex =
                    currentStateIndex > excess ? currentStateIndex - excess : 0;
            }
            function commitChanges() {
                // Consider the last committed state the new starting point.
                // Squash any staged actions into a single committed state.
                actionsById = { 0: liftAction(INIT_ACTION) };
                nextActionId = 1;
                stagedActionIds = [0];
                skippedActionIds = [];
                committedState = computedStates[currentStateIndex].state;
                currentStateIndex = 0;
                computedStates = [];
            }
            // By default, aggressively recompute every state whatever happens.
            // This has O(n) performance, so we'll override this to a sensible
            // value whenever we feel like we don't have to recompute the states.
            var minInvalidatedStateIndex = 0;
            switch (liftedAction.type) {
                case LOCK_CHANGES: {
                    isLocked = liftedAction.status;
                    minInvalidatedStateIndex = Infinity;
                    break;
                }
                case PAUSE_RECORDING: {
                    isPaused = liftedAction.status;
                    if (isPaused) {
                        // Add a pause action to signal the devtools-user the recording is paused.
                        // The corresponding state will be overwritten on each update to always contain
                        // the latest state (see Actions.PERFORM_ACTION).
                        stagedActionIds = __spread(stagedActionIds, [nextActionId]);
                        actionsById[nextActionId] = new PerformAction({
                            type: '@ngrx/devtools/pause',
                        }, +Date.now());
                        nextActionId++;
                        minInvalidatedStateIndex = stagedActionIds.length - 1;
                        computedStates = computedStates.concat(computedStates[computedStates.length - 1]);
                        if (currentStateIndex === stagedActionIds.length - 2) {
                            currentStateIndex++;
                        }
                        minInvalidatedStateIndex = Infinity;
                    }
                    else {
                        commitChanges();
                    }
                    break;
                }
                case RESET: {
                    // Get back to the state the store was created with.
                    actionsById = { 0: liftAction(INIT_ACTION) };
                    nextActionId = 1;
                    stagedActionIds = [0];
                    skippedActionIds = [];
                    committedState = initialCommittedState;
                    currentStateIndex = 0;
                    computedStates = [];
                    break;
                }
                case COMMIT: {
                    commitChanges();
                    break;
                }
                case ROLLBACK: {
                    // Forget about any staged actions.
                    // Start again from the last committed state.
                    actionsById = { 0: liftAction(INIT_ACTION) };
                    nextActionId = 1;
                    stagedActionIds = [0];
                    skippedActionIds = [];
                    currentStateIndex = 0;
                    computedStates = [];
                    break;
                }
                case TOGGLE_ACTION: {
                    // Toggle whether an action with given ID is skipped.
                    // Being skipped means it is a no-op during the computation.
                    var actionId_1 = liftedAction.id;
                    var index = skippedActionIds.indexOf(actionId_1);
                    if (index === -1) {
                        skippedActionIds = __spread([actionId_1], skippedActionIds);
                    }
                    else {
                        skippedActionIds = skippedActionIds.filter(function (id) { return id !== actionId_1; });
                    }
                    // Optimization: we know history before this action hasn't changed
                    minInvalidatedStateIndex = stagedActionIds.indexOf(actionId_1);
                    break;
                }
                case SET_ACTIONS_ACTIVE: {
                    // Toggle whether an action with given ID is skipped.
                    // Being skipped means it is a no-op during the computation.
                    var start = liftedAction.start, end = liftedAction.end, active = liftedAction.active;
                    var actionIds = [];
                    for (var i = start; i < end; i++)
                        actionIds.push(i);
                    if (active) {
                        skippedActionIds = difference(skippedActionIds, actionIds);
                    }
                    else {
                        skippedActionIds = __spread(skippedActionIds, actionIds);
                    }
                    // Optimization: we know history before this action hasn't changed
                    minInvalidatedStateIndex = stagedActionIds.indexOf(start);
                    break;
                }
                case JUMP_TO_STATE: {
                    // Without recomputing anything, move the pointer that tell us
                    // which state is considered the current one. Useful for sliders.
                    currentStateIndex = liftedAction.index;
                    // Optimization: we know the history has not changed.
                    minInvalidatedStateIndex = Infinity;
                    break;
                }
                case JUMP_TO_ACTION: {
                    // Jumps to a corresponding state to a specific action.
                    // Useful when filtering actions.
                    var index = stagedActionIds.indexOf(liftedAction.actionId);
                    if (index !== -1)
                        currentStateIndex = index;
                    minInvalidatedStateIndex = Infinity;
                    break;
                }
                case SWEEP: {
                    // Forget any actions that are currently being skipped.
                    stagedActionIds = difference(stagedActionIds, skippedActionIds);
                    skippedActionIds = [];
                    currentStateIndex = Math.min(currentStateIndex, stagedActionIds.length - 1);
                    break;
                }
                case PERFORM_ACTION: {
                    // Ignore action and return state as is if recording is locked
                    if (isLocked) {
                        return liftedState || initialLiftedState;
                    }
                    if (isPaused) {
                        // If recording is paused, overwrite the last state
                        // (corresponds to the pause action) and keep everything else as is.
                        // This way, the app gets the new current state while the devtools
                        // do not record another action.
                        var lastState = computedStates[computedStates.length - 1];
                        computedStates = __spread(computedStates.slice(0, -1), [
                            computeNextEntry(reducer, liftedAction.action, lastState.state, lastState.error, errorHandler),
                        ]);
                        minInvalidatedStateIndex = Infinity;
                        break;
                    }
                    // Auto-commit as new actions come in.
                    if (options.maxAge && stagedActionIds.length === options.maxAge) {
                        commitExcessActions(1);
                    }
                    if (currentStateIndex === stagedActionIds.length - 1) {
                        currentStateIndex++;
                    }
                    var actionId = nextActionId++;
                    // Mutation! This is the hottest path, and we optimize on purpose.
                    // It is safe because we set a new key in a cache dictionary.
                    actionsById[actionId] = liftedAction;
                    stagedActionIds = __spread(stagedActionIds, [actionId]);
                    // Optimization: we know that only the new action needs computing.
                    minInvalidatedStateIndex = stagedActionIds.length - 1;
                    break;
                }
                case IMPORT_STATE: {
                    // Completely replace everything.
                    (_a = liftedAction.nextLiftedState, monitorState = _a.monitorState, actionsById = _a.actionsById, nextActionId = _a.nextActionId, stagedActionIds = _a.stagedActionIds, skippedActionIds = _a.skippedActionIds, committedState = _a.committedState, currentStateIndex = _a.currentStateIndex, computedStates = _a.computedStates, isLocked = _a.isLocked, 
                    // prettier-ignore
                    isPaused = _a.isPaused);
                    break;
                }
                case store.INIT: {
                    // Always recompute states on hot reload and init.
                    minInvalidatedStateIndex = 0;
                    if (options.maxAge && stagedActionIds.length > options.maxAge) {
                        // States must be recomputed before committing excess.
                        computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, errorHandler, isPaused);
                        commitExcessActions(stagedActionIds.length - options.maxAge);
                        // Avoid double computation.
                        minInvalidatedStateIndex = Infinity;
                    }
                    break;
                }
                case store.UPDATE: {
                    var stateHasErrors = computedStates.filter(function (state) { return state.error; }).length > 0;
                    if (stateHasErrors) {
                        // Recompute all states
                        minInvalidatedStateIndex = 0;
                        if (options.maxAge && stagedActionIds.length > options.maxAge) {
                            // States must be recomputed before committing excess.
                            computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, errorHandler, isPaused);
                            commitExcessActions(stagedActionIds.length - options.maxAge);
                            // Avoid double computation.
                            minInvalidatedStateIndex = Infinity;
                        }
                    }
                    else {
                        // If not paused/locked, add a new action to signal devtools-user
                        // that there was a reducer update.
                        if (!isPaused && !isLocked) {
                            if (currentStateIndex === stagedActionIds.length - 1) {
                                currentStateIndex++;
                            }
                            // Add a new action to only recompute state
                            var actionId = nextActionId++;
                            actionsById[actionId] = new PerformAction(liftedAction, +Date.now());
                            stagedActionIds = __spread(stagedActionIds, [actionId]);
                            minInvalidatedStateIndex = stagedActionIds.length - 1;
                            computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, errorHandler, isPaused);
                        }
                        // Recompute state history with latest reducer and update action
                        computedStates = computedStates.map(function (cmp) { return (__assign$2({}, cmp, { state: reducer(cmp.state, RECOMPUTE_ACTION) })); });
                        currentStateIndex = stagedActionIds.length - 1;
                        if (options.maxAge && stagedActionIds.length > options.maxAge) {
                            commitExcessActions(stagedActionIds.length - options.maxAge);
                        }
                        // Avoid double computation.
                        minInvalidatedStateIndex = Infinity;
                    }
                    break;
                }
                default: {
                    // If the action is not recognized, it's a monitor action.
                    // Optimization: a monitor action can't change history.
                    minInvalidatedStateIndex = Infinity;
                    break;
                }
            }
            computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, errorHandler, isPaused);
            monitorState = monitorReducer(monitorState, liftedAction);
            return {
                monitorState: monitorState,
                actionsById: actionsById,
                nextActionId: nextActionId,
                stagedActionIds: stagedActionIds,
                skippedActionIds: skippedActionIds,
                committedState: committedState,
                currentStateIndex: currentStateIndex,
                computedStates: computedStates,
                isLocked: isLocked,
                isPaused: isPaused,
            };
        }; };
    }

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param$1 = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __read$1 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var StoreDevtools = /** @class */ (function () {
        function StoreDevtools(dispatcher, actions$, reducers$, extension, scannedActions, errorHandler, initialState, config) {
            var _this = this;
            var liftedInitialState = liftInitialState(initialState, config.monitor);
            var liftReducer = liftReducerWith(initialState, liftedInitialState, errorHandler, config.monitor, config);
            var liftedAction$ = rxjs.merge(rxjs.merge(actions$.asObservable().pipe(operators.skip(1)), extension.actions$).pipe(operators.map(liftAction)), dispatcher, extension.liftedActions$).pipe(operators.observeOn(rxjs.queueScheduler));
            var liftedReducer$ = reducers$.pipe(operators.map(liftReducer));
            var liftedStateSubject = new rxjs.ReplaySubject(1);
            var liftedStateSubscription = liftedAction$
                .pipe(operators.withLatestFrom(liftedReducer$), operators.scan(function (_a, _b) {
                var liftedState = _a.state;
                var _c = __read$1(_b, 2), action = _c[0], reducer = _c[1];
                var reducedLiftedState = reducer(liftedState, action);
                // On full state update
                // If we have actions filters, we must filter completly our lifted state to be sync with the extension
                if (action.type !== PERFORM_ACTION && shouldFilterActions(config)) {
                    reducedLiftedState = filterLiftedState(reducedLiftedState, config.predicate, config.actionsWhitelist, config.actionsBlacklist);
                }
                // Extension should be sent the sanitized lifted state
                extension.notify(action, reducedLiftedState);
                return { state: reducedLiftedState, action: action };
            }, { state: liftedInitialState, action: null }))
                .subscribe(function (_a) {
                var state = _a.state, action = _a.action;
                liftedStateSubject.next(state);
                if (action.type === PERFORM_ACTION) {
                    var unliftedAction = action.action;
                    scannedActions.next(unliftedAction);
                }
            });
            var extensionStartSubscription = extension.start$.subscribe(function () {
                _this.refresh();
            });
            var liftedState$ = liftedStateSubject.asObservable();
            var state$ = liftedState$.pipe(operators.map(unliftState));
            this.extensionStartSubscription = extensionStartSubscription;
            this.stateSubscription = liftedStateSubscription;
            this.dispatcher = dispatcher;
            this.liftedState = liftedState$;
            this.state = state$;
        }
        StoreDevtools.prototype.dispatch = function (action) {
            this.dispatcher.next(action);
        };
        StoreDevtools.prototype.next = function (action) {
            this.dispatcher.next(action);
        };
        StoreDevtools.prototype.error = function (error) { };
        StoreDevtools.prototype.complete = function () { };
        StoreDevtools.prototype.performAction = function (action) {
            this.dispatch(new PerformAction(action, +Date.now()));
        };
        StoreDevtools.prototype.refresh = function () {
            this.dispatch(new Refresh());
        };
        StoreDevtools.prototype.reset = function () {
            this.dispatch(new Reset(+Date.now()));
        };
        StoreDevtools.prototype.rollback = function () {
            this.dispatch(new Rollback(+Date.now()));
        };
        StoreDevtools.prototype.commit = function () {
            this.dispatch(new Commit(+Date.now()));
        };
        StoreDevtools.prototype.sweep = function () {
            this.dispatch(new Sweep());
        };
        StoreDevtools.prototype.toggleAction = function (id) {
            this.dispatch(new ToggleAction(id));
        };
        StoreDevtools.prototype.jumpToAction = function (actionId) {
            this.dispatch(new JumpToAction(actionId));
        };
        StoreDevtools.prototype.jumpToState = function (index) {
            this.dispatch(new JumpToState(index));
        };
        StoreDevtools.prototype.importState = function (nextLiftedState) {
            this.dispatch(new ImportState(nextLiftedState));
        };
        StoreDevtools.prototype.lockChanges = function (status) {
            this.dispatch(new LockChanges(status));
        };
        StoreDevtools.prototype.pauseRecording = function (status) {
            this.dispatch(new PauseRecording(status));
        };
        StoreDevtools = __decorate$2([
            core.Injectable(),
            __param$1(6, core.Inject(store.INITIAL_STATE)),
            __param$1(7, core.Inject(STORE_DEVTOOLS_CONFIG)),
            __metadata$1("design:paramtypes", [DevtoolsDispatcher,
                store.ActionsSubject,
                store.ReducerObservable,
                DevtoolsExtension,
                store.ScannedActionsSubject,
                core.ErrorHandler, Object, StoreDevtoolsConfig])
        ], StoreDevtools);
        return StoreDevtools;
    }());

    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var IS_EXTENSION_OR_MONITOR_PRESENT = new core.InjectionToken('Is Devtools Extension or Monitor Present');
    function createIsExtensionOrMonitorPresent(extension, config) {
        return Boolean(extension) || config.monitor !== noMonitor;
    }
    function createReduxDevtoolsExtension() {
        var extensionKey = '__REDUX_DEVTOOLS_EXTENSION__';
        if (typeof window === 'object' &&
            typeof window[extensionKey] !== 'undefined') {
            return window[extensionKey];
        }
        else {
            return null;
        }
    }
    function createStateObservable(devtools) {
        return devtools.state;
    }
    var StoreDevtoolsModule = /** @class */ (function () {
        function StoreDevtoolsModule() {
        }
        StoreDevtoolsModule_1 = StoreDevtoolsModule;
        StoreDevtoolsModule.instrument = function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: StoreDevtoolsModule_1,
                providers: [
                    DevtoolsExtension,
                    DevtoolsDispatcher,
                    StoreDevtools,
                    {
                        provide: INITIAL_OPTIONS,
                        useValue: options,
                    },
                    {
                        provide: IS_EXTENSION_OR_MONITOR_PRESENT,
                        deps: [REDUX_DEVTOOLS_EXTENSION, STORE_DEVTOOLS_CONFIG],
                        useFactory: createIsExtensionOrMonitorPresent,
                    },
                    {
                        provide: REDUX_DEVTOOLS_EXTENSION,
                        useFactory: createReduxDevtoolsExtension,
                    },
                    {
                        provide: STORE_DEVTOOLS_CONFIG,
                        deps: [INITIAL_OPTIONS],
                        useFactory: createConfig,
                    },
                    {
                        provide: store.StateObservable,
                        deps: [StoreDevtools],
                        useFactory: createStateObservable,
                    },
                    {
                        provide: store.ReducerManagerDispatcher,
                        useExisting: DevtoolsDispatcher,
                    },
                ],
            };
        };
        var StoreDevtoolsModule_1;
        StoreDevtoolsModule = StoreDevtoolsModule_1 = __decorate$3([
            core.NgModule({})
        ], StoreDevtoolsModule);
        return StoreDevtoolsModule;
    }());

    /**
     * DO NOT EDIT
     *
     * This file is automatically generated at build
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵngrx_modules_store_devtools_store_devtools_f = INITIAL_OPTIONS;
    exports.ɵngrx_modules_store_devtools_store_devtools_e = STORE_DEVTOOLS_CONFIG;
    exports.ɵngrx_modules_store_devtools_store_devtools_h = createConfig;
    exports.ɵngrx_modules_store_devtools_store_devtools_g = noMonitor;
    exports.ɵngrx_modules_store_devtools_store_devtools_k = DevtoolsDispatcher;
    exports.ɵngrx_modules_store_devtools_store_devtools_j = DevtoolsExtension;
    exports.ɵngrx_modules_store_devtools_store_devtools_i = REDUX_DEVTOOLS_EXTENSION;
    exports.ɵngrx_modules_store_devtools_store_devtools_a = IS_EXTENSION_OR_MONITOR_PRESENT;
    exports.ɵngrx_modules_store_devtools_store_devtools_b = createIsExtensionOrMonitorPresent;
    exports.ɵngrx_modules_store_devtools_store_devtools_c = createReduxDevtoolsExtension;
    exports.ɵngrx_modules_store_devtools_store_devtools_d = createStateObservable;
    exports.StoreDevtoolsModule = StoreDevtoolsModule;
    exports.RECOMPUTE = RECOMPUTE;
    exports.StoreDevtools = StoreDevtools;
    exports.StoreDevtoolsConfig = StoreDevtoolsConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store-devtools.umd.js.map
