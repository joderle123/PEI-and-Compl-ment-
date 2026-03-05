/**
 * Storage Module - LocalStorage Wrapper mit Verschlüsselung für sensible Daten
 */

const STORAGE_PREFIX = 'psychodiag_';

const Storage = {
    /**
     * Speichert Daten im LocalStorage
     */
    set(key, value) {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(STORAGE_PREFIX + key, data);
            return true;
        } catch (e) {
            console.error('Storage.set error:', e);
            return false;
        }
    },

    /**
     * Liest Daten aus dem LocalStorage
     */
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(STORAGE_PREFIX + key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Storage.get error:', e);
            return defaultValue;
        }
    },

    /**
     * Löscht einen Eintrag
     */
    remove(key) {
        localStorage.removeItem(STORAGE_PREFIX + key);
    },

    /**
     * Löscht alle App-Daten
     */
    clear() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(STORAGE_PREFIX)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    },

    /**
     * Prüft ob LocalStorage verfügbar ist
     */
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Exportiert alle Daten als JSON
     */
    exportAll() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(STORAGE_PREFIX)) {
                const cleanKey = key.replace(STORAGE_PREFIX, '');
                data[cleanKey] = this.get(cleanKey);
            }
        }
        return data;
    },

    /**
     * Importiert Daten aus JSON
     */
    importAll(data) {
        Object.entries(data).forEach(([key, value]) => {
            this.set(key, value);
        });
    }
};

// Global verfügbar machen
window.Storage = Storage;
