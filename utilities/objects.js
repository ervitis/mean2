'use strict';

class ObjectUtilities {
    static size(obj) {
        let s = 0, k;

        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                s ++;
            }
        }

        return s;
    }
}

module.exports = ObjectUtilities;