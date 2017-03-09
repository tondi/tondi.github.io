var locations = (function () {
    
    class Location {
        constructor(yx, description, img, bgColor, n, w, s, e, itemId) {
            this.yx = yx;
            this.description = description;
            this.img = img;
            this.bgColor = bgColor;

            this.n = n;
            this.w = w;
            this.s = s;
            this.e = e;

            this.item = [itemId, null, null]; // as locaiton has one item default

        }
        getDirections() {
            var dir = ["WEST", "NORTH", "EAST", "SOUTH"]
            var tab = [];
            this.w ? (
                tab.push(dir[0])
            ) : false;
            this.n ? (
                tab.push(dir[1])
            ) : false;
            this.e ? (
                tab.push(dir[2])
            ) : false;
            this.s ? (
                tab.push(dir[3])
            ) : false;
            // order allows to add as they are in game
            return tab;
        }
    }

    var x11 = new Location(11, "You are inside a brimstone mine", "11.gif", "rgb(235,211,64)", false, false, false, true),
    x12 = new Location(12, "You are at the entrance to the mine", "12.gif", "rgb(89,93,87)", false, true, false, true),
    x13 = new Location(13, "A hill", "13.gif", "rgb(117,237,243)", false, true, true, true, items.p31),
    x14 = new Location(14, "Some bushes", "14.gif", "rgb(202,230,51)", false, true, false, true),
    x15 = new Location(15, "An old deserted hut", "15.gif", "rgb(220,204,61)", false, true, false, true, items.p27),
    x16 = new Location(16, "The edge of a forest", "16.gif", "rgb(167,245,63)", false, true, false, true),
    x17 = new Location(17, "A dark forest", "17.gif", "rgb(140,253,99)", false, true, true, false, items.p14),
    x21 = new Location(21, "A man nearby making tar", "21.gif", "rgb(255,190,99)", false, false, true, true),
    x22 = new Location(22, "A timber yard", "22.gif", "rgb(255,190,99)", false, true, true, true),
    x23 = new Location(23, "You are by a roadside shrine", "23.gif", "rgb(167,245,63)", true, true, true, true, items.p10),
    x24 = new Location(24, "You are by a small chapel", "24.gif", "rgb(212,229,36)", false, true, false, true),
    x25 = new Location(25, "You are on a road leading to a wood", "25.gif", "rgb(167,245,63)", false, true, true, true),
    x26 = new Location(26, "You are in a forest", "26 i 65.gif", "rgb(167,245,63)", false, true, false, true),
    x27 = new Location(27, "You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)", true, true, false, false, items.p18),
    x31 = new Location(31, "You are by the Vistula River", "31.gif", "rgb(122,232,252)", true, false, false, true),
    x32 = new Location(32, "You are by the Vistula River", "32.gif", "rgb(140,214,255)", true, true, false, false, items.p32),
    x33 = new Location(33, "You are on a bridge over river", "33.gif", "rgb(108,181,242)", true, false, true, false),
    x34 = new Location(34, "You are by the old tavern", "34.gif", "rgb(255,189,117)", false, false, false, true),
    x35 = new Location(35, "You are at the town's end", "35.gif", "rgb(255,190,99)", true, true, true, false),
    x36 = new Location(36, "You are in a butcher's shop", "36.gif", "rgb(255,188,102)", false, false, true, false),
    x37 = new Location(37, "You are in a cooper's house", "37.gif", "rgb(255,188,102)", false, false, true, false),
    x41 = new Location(41, "You are in the Wawel Castle", "41.gif", "rgb(255,176,141)", false, false, false, true),
    x42 = new Location(42, "You are inside a dragon's cave", "42.gif", "rgb(198,205,193)", false, true, false, true),
    x43 = new Location(43, "A perfect place to set a trap", "43.gif", "rgb(255,176,141)", true, true, false, false),
    x44 = new Location(44, "You are by the water mill", "44.gif", "rgb(255,190,99)", false, false, false, true, items.p21),
    x45 = new Location(45, "You are at a main crossroad", "45.gif", "rgb(255,190,99)", true, true, true, true),
    x46 = new Location(46, "You are on a town street", "46.gif", "rgb(255,190,99)", true, true, false, true),
    x47 = new Location(47, "You are in a frontyard of your house", "47.gif", "rgb(255,190,99)", true, true, true, false),
    x54 = new Location(54, "You are by a swift stream", "54.gif", "rgb(108,181,242)", false, false, false, true),
    x55 = new Location(55, "You are on a street leading forest", "55.gif", "rgb(255,190,99)", true, true, true, false, items.p33),
    x56 = new Location(56, "You are in a woodcutter's backyard", "56.gif", "rgb(255,190,99)", false, false, true, false),
    x57 = new Location(57, "You are in a shoemaker's house", "57.gif", "rgb(254,194,97)", true, false, false, false),
    x64 = new Location(64, "You are in a bleak funeral house", "64.gif", "rgb(254,194,97)", false, false, false, true, items.p24),
    x65 = new Location(65, "You are on a path leading to the wood", "26 i 65.gif", "rgb(167,245,63)", true, true, false, true),
    x66 = new Location(66, "You are at the edge of a forest", "66.gif", "rgb(167,245,63)", true, true, false, true),
    x67 = new Location(67, "You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)", false, true, false, false)
    
    x43.sheepParts = [null, null, null, null, null, null]

    //console.log(x43)
    //console.log(items.p21)
    //console.log(x44.item)
        
    return {
        current: x47,
        x11: x11,
        x12: x12,
        x13: x13,
        x14: x14,
        x15: x15,
        x16: x16,
        x17: x17,
        x21: x21,
        x22: x22,
        x23: x23,
        x24: x24,
        x25: x25,
        x26: x26,
        x27: x27,
        x31: x31,
        x32: x32,
        x33: x33,
        x34: x34,
        x35: x35,
        x36: x36,
        x37: x37,
        x41: x41,
        x42: x42,
        x43: x43,
        x44: x44,
        x45: x45,
        x46: x46,
        x47: x47,
        x54: x54,
        x55: x55,
        x56: x56,
        x57: x57,
        x64: x64,
        x65: x65,
        x66: x66,
        x67: x67
    }

}())
