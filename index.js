var cardValues = {
    dmg: 7.575758,
    spd: 6.5,
    crit: .03
}

var heroes = {
    twinblast: {
        damage: 39.98,
        scaling: 1.0005,
        time: .96
    },
    mages: {
        damage: 62.44,
        scaling: .375,
        time: 1.46
    },
    murdock: {
        damage: 49.95,
        scaling: 1.2,
        time: 1.2
    },
    sparrow: {
        damage: 45.95,
        scaling: 1.5,
        time: 1.46
    },
    grim: {
        damage: 47.952,
        scaling: 1.2,
        time: 1.2
    },
    feng: {
        damage: 59.94,
        scaling: 1.3,
        time: 1.46
    },
    grux: {
        damage: 45.95,
        scaling: .99658,
        time: 1.1099
    },
    kallari: {
        damage: 48.951,
        scaling: 0.7875,
        time: 1.01
    },
    rampage: {
        damage: 54.70,
        scaling: 0.365292,
        time: 1.055
    },
    steel: {
        damage: 65.93,
        scaling: 0.440352,
        time: 1.28
    }
};

// FOR TWINBLAST
var baseAttackDamage = heroes.twinblast.damage;
var attackDamageScaling = heroes.twinblast.scaling;
var baseAttackTime = heroes.twinblast.time;

// CARD MODIFIED POINTS
var totalPoints = 66;
var damagePoints = 0;
var critPoints = 0;
var speedPoints = 0;
var max = {
    DPS: 0,
    DPSHOT: 0,
    damage: 0,
    speed: 0,
    crit: 0,
    critChance: 0,
    atkSpeed: 0,
    additionalDamage: 0
}

for (damagePoints = 0; damagePoints < totalPoints; damagePoints++) {
    speedPoints = totalPoints - damagePoints;
    for (critPoints = totalPoints - damagePoints - speedPoints; critPoints <= totalPoints - damagePoints; critPoints++) {

        var increasedDamage = damagePoints * cardValues.dmg;
        var critChance = critPoints * cardValues.crit;
        var critModifier = 1.5;
        var increasedAttackSpeed = speedPoints * cardValues.spd;

        var DAMAGE = (baseAttackDamage + (increasedDamage * attackDamageScaling));
        var DPSHOT = ((DAMAGE * critChance * critModifier) + DAMAGE * (1 - critChance));
        var ATKSPEED = (baseAttackTime / ((increasedAttackSpeed + 100) / 100));
        var APS = (1 / ATKSPEED);
        if (ATKSPEED > 2.5) ATKSPEED = 2.5;

        var DPS = DPSHOT * ( /*MAX 2.5 for this*/ (APS));
        if (DPS > max.DPS) {
            max.DPS = DPS;
            max.DPSHOT = DPSHOT;
            max.damage = damagePoints;
            max.speed = speedPoints;
            max.crit = critPoints;
            max.critChance = critChance;
            max.atkSpeed = increasedAttackSpeed;
            max.additionalDamage = increasedDamage;
        }
        // console.log("DAMAGE: " + damagePoints + " ||| SPEED: " + speedPoints + " ||| CRIT: " + critPoints + " ||||||||| DPS: " + DPS);
        speedPoints--;
    }
}

$("#heroSubmit").click(function() {
    console.log($('input[name=hero]:checked', '#heroSelect').val())
})
