var utilities = (function () {

    var arrayTest = function (arr) { // if array is full, index of last element. Else, returns nearest free position as index
        var i = 0;
        for (let value of arr) {
        //console.log(i, value)
            if (value === null || value === undefined) {
                return i;
            }
            i++;
        }
        return arr.length
        
        
    }
    var arrayNull = function (arr) {
        for(let value of arr) {
            if (value !== null && value !== undefined) {
                return false;
            }
        }
        return true;
    }
    var arrayFull = function (arr) {
        for(let value of arr) {
            if (value === null || value === undefined) {
                return false;
            }
        }
        return true;
    }
    var searchForItem = function (name, arr) {
        var i = 0;
        for(let value of arr) {
            if (value !== undefined && value !== null && value.name === name) {
                return i;
            }
            i++
        }
    }
    var hasItem = function (name, arr) {
        if (arr) {
            for(let value of arr) {
                if (value !== undefined && value !== null && value.name === name) {
                    return true;
                }

            }
        } else {
            return false;
        }
    }
    var isEmpty = function (obj) {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true;
        } else {
            return false;
        } 
    }
    var itemExists = function (searchedName) {
        for (var x = 1, counter = 0; x < 4; x++) {
            for (var y = 0; y < 10; y++) {
                if (counter <= 27) {

                    var locItem = items["p" + x.toString() + y.toString()]; // !!! xy instead of yx as always in here
                    if (locItem.name === searchedName) { // if item exists
                        return locItem; // !== false so in if() is true + additional functionality
                    }
                }
                counter++ // posrod 27 itemow
            } // sprawdza czy item istnieje
        }
        return false;
    }
    var getDependence = function () {
        var curr = locations.current;
        for (var x = 0, counter = 0; x < 2; x++) {
            for (var y = 0; y <= 9; y++) {
                if (counter < 17) {
                    //console.log(dependencies)
                    var locDependence = dependencies["d" + x.toString() + y.toString()]; // !!! xy instead of yx

                    //console.log(x, y, counter)
                    //console.log("d" + x.toString() + y.toString())
                    //console.log(dependencies)
                    if (locDependence.id === bagpack.item.id && locDependence.yx === curr.yx) { // if that dependence exists
                        //console.log("dependence exists")
                        return locDependence;
                    }
                    //console.log(locations.current)
                }
                counter++ // In all dependencies
            } // tests if that dependence exists
        }
        console.log("dependence not found")
        return false;
    };
    var getItemById = function (itemId) {
        for (var x = 1, counter = 0; x < 4; x++) {
            for (var y = 0; y < 10; y++) {
                if (counter <= 27) {

                    var locItem = items["p" + x.toString() + y.toString()]; // !!! xy instad of yx
                    if (locItem.id === itemId) { // if item exists
                        return locItem;
                    }
                }
                counter++ // in all 27 items
            } // test if item exists
        }
        return false;
    }
    var milestones = 0;
    var isWawelOpen = false;
    //var isVocabularyOpen = false;

    return {
        milestones: milestones,
        isWawelOpen: isWawelOpen,
        //isVocabularyOpen: isVocabularyOpen,

        arrayTest: arrayTest,
        arrayNull: arrayNull,
        arrayFull: arrayFull,
        searchForItem: searchForItem,
        hasItem: hasItem,
        isEmpty: isEmpty,
        itemExists: itemExists,
        getDependence: getDependence,
        getItemById: getItemById,
        
    }
}())