'use strict';

export function injectProperty( parentObject, injectorFunction, nameOfMethod) {
    parentObject[nameOfMethod] = injectorFunction;
    return parentObject;
}