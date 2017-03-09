var items = (function () {
    class Item{
        constructor(id, conj, interacts, name){
            this.id = id;
            this.conj = conj;
            this.interacts = interacts;
            this.name = name;
        }
    }

    
    var p10 = new Item (10, "a KEY", 1, "KEY"),
        p11 = new Item (11, "an AXE", 1, "AXE"),
        p12 = new Item (12, "STICKS", 1, "STICKS"),
        p13 = new Item (13, "sheeplegs", 0, "sheeplegs"),
        p14 = new Item (14, "MUSHROOMS", 1, "MUSHROOMS"),
        p15 = new Item (15, "MONEY", 1, "MONEY"),
        p16 = new Item (16, "a BARREL", 1, "BARREL"),
        p17 = new Item (17, "a sheeptrunk", 0, "sheeptrunk"),
        p18 = new Item (18, "BERRIES", 1, "BERRIES"),
        p19 = new Item (19, "WOOL", 1, "WOOL"),
        p20 = new Item (20, "a sheepskin", 0, "sheepskin"),
        p21 = new Item (21, "a BAG", 1, "BAG"),
        p22 = new Item (22, "a RAG", 1, "RAG"),
        p23 = new Item (23, "a sheephead", 0, "sheephead"),
        p24 = new Item (24, "a SPADE", 1, "SPADE"),
        p25 = new Item (25, "SULPHUR", 1, "SULPHUR"),
        p26 = new Item (26, "a solid poison", 0, "solid poison"),
        p27 = new Item (27, "a BUCKET", 1, "BUCKET"),
        p28 = new Item (28, "TAR", 1, "TAR"),
        p29 = new Item (29, "a liquid poison", 0, "liquid poison"),
        p30 = new Item (30, "a dead dragon", 0, "dead dragon"),
        p31 = new Item (31, "a STONE", 1, "STONE"),
        p32 = new Item (32, "a FISH", 1, "FISH"),
        p33 = new Item (33, "a KNIFE", 1, "KNIFE"),
        p34 = new Item (34, "a DRAGONSKIN",  1, "DRAGONSKIN"),
        p35 = new Item (35, "a dragonskin SHOES", 1, "SHOES"),
        p36 = new Item (36, "a PRIZE", 1, "PRIZE"),
        p37 = new Item (37, "a SHEEP", 1, "SHEEP");
    
    //console.log(p21)


    return {
        p10: p10,
        p11: p11,
        p12: p12,
        p13: p13,
        p14: p14,
        p15: p15,
        p16: p16,
        p17: p17,
        p18: p18,
        p19: p19,
        p20: p20,
        p21: p21,
        p22: p22,
        p23: p23,
        p24: p24,
        p25: p25,
        p26: p26,
        p27: p27,
        p28: p28,
        p29: p29,
        p30: p30,
        p31: p31,
        p32: p32,
        p33: p33,
        p34: p34,
        p35: p35,
        p36: p36,
        p37: p37
    }
}())

var dependencies = (function () {

    class Dependence {
        constructor(id, yx, resultId, info, isMilestone, isResutOnLoc) {
            this.id = id;
            this.yx = yx;
            this.resultId = resultId;
            this.info = info;
            this.isMilestone = isMilestone;
            this.isResultOnLoc = isResutOnLoc;
        }
    }

    var d00 = new Dependence(10, 56, 11, "You opened a tool shed and took an axe", false, false),
        d01 = new Dependence(11, 67, 12, "You cut sticks for sheeplegs", false, false),
        d02 = new Dependence(12, 43, 13, "You prepared legs for your fake sheep", true, true);
        d03 = new Dependence(14, 34, 15, "The tavern owner paid you money", false, false),
        d04 = new Dependence(15, 37, 16, "The cooper sold you a new barrel", false, false),
        d05 = new Dependence(16, 43, 17, "You made a nice sheeptrunk", true, true),
        d06 = new Dependence(18, 36, 19, "The butcher gave you wool", false, false),
        d07 = new Dependence(19, 43, 20, "You prepared skin for your fake sheep", true, true),
        d08 = new Dependence(21, 57, 22, "You used your tools to make a rag", false, false),
        d09 = new Dependence(22, 43, 23, "You made a fake sheephead", true, true),
        d10 = new Dependence(24, 11, 25, "You are digging... (timeout) and digging... (timeout) That's enough sulphur for you", true, false),
        d11 = new Dependence(25, 43, 26, "You prepared a solid poison", false, true),
        d12 = new Dependence(27, 21, 28, "You got a bucket full of tar", false, false),
        d13 = new Dependence(28, 43, 29, "You prepared a liquid poison", true, true),
        //d14 = new Dependence(), // !!!! (6*OK), 43, 37, "Your fake sheep is full of poison and ready to be eaten by the dragon"
        //d14 = new Dependence(37, 43, 30, "The dragon noticed your gift... (timeout) The dragon ate your sheep and died!", false, true), // - change location gfx (dead dragon)!),
        d14 = new Dependence(33, 43 /*+ killed Dragon */, 34, "You cut a piece of dragon's skin", false, false),
        d15 = new Dependence(34, 57, 35, "You used your tools to make shoes", false, false),
        d16 = new Dependence(35, 41, 36, "The King is impressed by your shoes", false, false);
        //19 = new Dependence(36 -> game completed - load gfx),

    //console.log(d00)

    //console.log(utilities.dependenceExists(10));

    return {
        d00: d00,
        d01: d01,
        d02: d02,
        d03: d03,
        d04: d04,
        d05: d05,
        d06: d06,
        d07: d07,
        d08: d08,
        d09: d09,
        d10: d10,
        d11: d11,
        d12: d12,
        d13: d13,
        d14: d14,
        d15: d15,
        d16: d16,
        //d17: d17,
        //d18: d18,
    }
}())