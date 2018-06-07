// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect} from 'redux-saga/effects';

import * as constants from '../application/constants';
import { saveCurrentLocaleCode, loadCurrentLocaleCode, isReloadNeeded, reloadRTL, LocaleManager } from '../application/locale';
import { SetLocale, LoadCurrentLocale, setLocaleActions, loadCurrentLocaleActions } from '../stores/locale';

export function* watchSetLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SET_LOCALE_REQUEST, applyLocaleChange);
}

export function* applyLocaleChange(action: SetLocale.Request): IterableIterator<CallEffect | PutEffect<SetLocale.Result>> {
    const locale = action.payload.locale;
    const needsReload = yield call(isReloadNeeded, locale);
    try {
        if (needsReload) {
            yield call(saveCurrentLocaleCode, locale.code);
            yield call(reloadRTL, locale.isRTL);
        } else {
            // There is no reload needed and we want clear load screen asap so
            // we will optimistically claim success.
            yield put(setLocaleActions.success(locale));
            // And let the save task run in background.
            yield call(saveCurrentLocaleCode, locale.code);
        }
    } catch (e) {
        yield put(setLocaleActions.failure(e.message, locale));
    }
}

export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export type LoadCurrentLocaleActions = LoadCurrentLocale.Request | LoadCurrentLocale.Result | SetLocale.Success;

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<LoadCurrentLocaleActions>> {
    try {
        const code = yield call(loadCurrentLocaleCode);
        const locale = code !== null ? LocaleManager.get(code) : LocaleManager.getFallbackLocale();
        yield put(loadCurrentLocaleActions.success(locale));
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(loadCurrentLocaleActions.failure(e.message));
    }
}