var player = {
    data: {
        yez: 0,
        yezgain: 1,
        upgradecost: 30,
        upgradeeffect: 1,
        count: 0,
        x: 1,
        yes: 0,
        yesgain: 0,
        yesmult: 1,
        u1: 0,
        u1c: 2,
        u1e: 1,
        u2: 0,
        u2c: 5,
        u2e: 1,
        u3: 0,
        u3c: 30,
        u3e: 1,
    }
}

function addyez () {
    player.data.yez += (player.data.yezgain * player.data.upgradeeffect);
}

function upgradeyez () {
    if (player.data.count > 2 ) {
        player.data.x = 2;
    }
    if (player.data.yez >= player.data.upgradecost) {
        player.data.count += 1;
        player.data.yez -= player.data.upgradecost;
        player.data.upgradeeffect = 2 ** (player.data.count * player.data.u1e); 
        player.data.upgradecost = format(((player.data.upgradecost * 3) ** player.data.x) / player.data.u2e);
        document.getElementById("yezc").innerHTML = "current amount of yez : " + format(player.data.yez);
        document.getElementById("upgradec").innerHTML = "COST: " + format(player.data.upgradecost);
        document.getElementById("upgradee").innerHTML = "EFFECT: " + format(player.data.upgradeeffect) + "x"
    }
}

function prestige() {
    player.data.yesgain = format((Math.log2(player.data.yez)) * player.data.u3e)
    player.data.yes += player.data.yesgain;
    player.data.yez = 0;
    player.data.yezgain = 1;
    player.data.yezmult = 1;
    player.data.upgradecost = 30;
    player.data.upgradeeffect = 1;
    player.data.count = 0;
    player.data.x = 1;
    document.getElementById("yezc").innerHTML = "current amount of yez : " + player.data.yez;
    document.getElementById("upgradec").innerHTML = "COST: " + player.data.upgradecost;
    document.getElementById("upgradee").innerHTML = "EFFECT: " + player.data.upgradeeffect + "x"
}

function yesupgrades1 () {
    if (player.data.yes >= player.data.u1c) {
        player.data.yes -= player.data.u1c;
        player.data.u1 += 1;
        player.data.u1c *= 2;
        player.data.u1e += 0.2;
    }
}
function yesupgrades2 () {
    if (player.data.yes >= player.data.u2c) {
        player.data.yes -= player.data.u2c;
        player.data.u2 += 1;
        player.data.u2c *= 2;
        player.data.u2e = 2 ** player.data.u2;
    }
    
}
function yesupgrades3 () {
    if (player.data.yes >= player.data.u3c) {
        player.data.yes -= player.data.u3c;
        player.data.u3 +=1;
        player.data.u3c *= 2;
        player.data.u3e = 2 ** player.data.u3;
    }
    
}

function format(x) {
    let power = Math.floor(Math.log10(x))
    let matissa = x / Math.pow(10, power)
    if (power < 6) {
        return Number.parseFloat(x).toFixed(2);
    } else {
        return matissa.toFixed(2) + "e" + power;
    }
}

var savegameloop = window.setInterval (function () {
    localStorage.setItem("SAVE", JSON.stringify(player));
    console.log("SAVED");
}, 5000)

function load() {
    var savegame = JSON.parse(localStorage.getItem("SAVE"))
    if (savegame !== null) {
        player = savegame
    }
    document.getElementById("yesamount").innerHTML = "yes amount: " + format(player.data.yes);
    document.getElementById("u1e").innerHTML =  format(player.data.u1e)
    document.getElementById("u1c").innerHTML = format(player.data.u1c)
    document.getElementById("u2e").innerHTML =  format(player.data.u2e)
    document.getElementById("u2c").innerHTML = format(player.data.u2c)
    document.getElementById("u3e").innerHTML =  format(player.data.u3e)
    document.getElementById("u3c").innerHTML = format(player.data.u3c)
}

var loop = window.setInterval (function () {
    document.getElementById("yezc").innerHTML = "current amount of yez : " + format(player.data.yez);
    if (player.data.yez >= 1000) {
        document.getElementById("prestige").style.display = ""
    }
    player.data.yesgain = format((Math.log2(player.data.yez)) * player.data.u3e)
    if (player.data.yesgain >= 8) {
        document.getElementById("yesg").innerHTML = format(player.data.yesgain);
    } else {
        document.getElementById("yesg").innerHTML = 0;
    }
    if (player.data.yes >= 1) {
        document.getElementById("yesupgrades").style.display = ""
        document.getElementById("prestige").style.display = ""
        document.getElementById("yesamount").style.display = ""
        document.getElementById("yesamount").innerHTML = "yes amount: " + player.data.yes;
        document.getElementById("u1e").innerHTML =  format(player.data.u1e)
        document.getElementById("u1c").innerHTML = format(player.data.u1c)
        document.getElementById("u2e").innerHTML =  format(player.data.u2e)
        document.getElementById("u2c").innerHTML = format(player.data.u2c)
        document.getElementById("u3e").innerHTML =  format(player.data.u3e)
        document.getElementById("u3c").innerHTML = format(player.data.u3c)
    }
},10)