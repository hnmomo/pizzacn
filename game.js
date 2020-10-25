var mydiv = document.getElementById("mydiv");
var pn1 = document.getElementById("pn1");
var charname = document.getElementById("name");
var bkgd = document.getElementById("bkgd");
var pic = document.getElementById("pic");
var mapcvs = document.getElementById("mapcvs");
var mapctx = mapcvs.getContext("2d");
var mapw = mapcvs.width;
var maph = mapcvs.height;
var elemLeft = mapcvs.offsetLeft,
    elemTop = mapcvs.offsetTop;
var health = document.getElementById("health");
var shield = document.getElementById("shield");
var energy = document.getElementById("energy");
var phealth = document.getElementById("phealth");
var gameover=false;
var gamestart=false;
var entanipos = 0;
var pizzaanipos = 0;
var posmax = 5;
var posmax2 = 3;
var poschange = 0.2;
var poschange2 = -0.1;
var displace=0;

mapctx.font = "16px Times New Roman";

var map1 = new Image();
map1.src = "BG2.jpg";

var entp = new Image();
entp.src = "enterprisesmall.png";
var pizza = new Image();
pizza.src = "pizza.png";

function draw() {
    mapctx.drawImage(map1, 50, 0, mapw, maph, 0, 0, mapw, maph);
}

var player = {
    phaser: 100,
    torpedo: 1200,
    phaseracc: 0.9,
    torpedoacc: 0.15,
    dodge: 0.95,
    health: 1500,
    shield: 5000,
    maxshield: 5000,
    maxhealth: 1000,
    energy: 6000,
    maxenergy: 6000,
    dmgmult: 1.0,
    crit: 0.1
}
var enemy = {
    beam: 500,
    drain: 10,
    acc: 0.9,
    dodge: 0.9,
    health: 10000,
    maxhealth: 10000,
    crit: 0.1
}

var phasercd=0;
setInterval(function() {
    if(phasercd>0){
        phasercd-=0.1;
        if(phasercd<0){
            phasercd=0;
        }
    }
}, 100);
function phaserswitch(){
        entp.src = "enterprisephaser.png";
}
function tpswitch(){
        entp.src = "enterprisetorpedo.png";
}
var changep=0;
function pizzaswitch(){
        pizza.src = "pizzabeam.png";
    change=3;
}
function pizzaswitch2(){
        pizza.src = "pizza2.png";
    change=2;
}
setInterval(function() {
    if(changep>0){
        changep-=1;
        if(changep<0){
            changep=0;
        }
    }else{
        pizza.src = "pizza.png";
    }
}, 300);
var change=0;
function phaserani() {
  phaserswitch();
    change=3;
    displace=53;
}
function torpedoani() {
  tpswitch();
    change=2;
    displace=90;
}
setInterval(function() {
    if(change>0){
        change-=1;
        if(change<0){
            change=0;
        }
    }else{
        entp.src = "enterprisesmall.png";
        displace=0;
    }
}, 300);
function phaser() {
    if(phasercd>0){
        message("相位炮冷却中，<b>"+phasercd.toFixed(1)+"</b>秒后可用。");
        return false;
    }
    if(player.energy<=0){
        message("能量不足。");
        return false;
    }
    phasercd+=5;
    phaserani();
    player.energy-=100;
    var mult = Math.random() * 0.4 + 0.8;
    var hitchance = player.phaseracc * enemy.dodge;
    var hit = Math.random();
    var crit = Math.random();
    if (hit > hitchance) {
        message("相位炮<b>未命中</b>披萨！");
        return false;
    }
    var dmg = mult * player.dmgmult * player.phaser;
    if (crit < player.crit) {
        dmg *= 2;
    }
    enemy.health -= dmg;
    message("相位炮命中并对披萨造成<b>" + dmg.toFixed(0) + "</b>伤害。");
}
var torcd=0;
setInterval(function() {
    if(torcd>0){
        torcd-=0.1;
        if(torcd<0){
            torcd=0;
        }
    }
}, 100);
function torpedo() {
    if(torcd>0){
        message("光子鱼雷冷却中，<b>"+torcd.toFixed(1)+"</b>秒后可用。");
        return false;
    }
    if(player.energy<=0){
        message("能量不足。");
        return false;
    }
    torcd+=12;
    torpedoani();
    player.energy-=300;
    var mult = Math.random() * 0.4 + 0.8;
    var hitchance = player.torpedoacc * enemy.dodge;
    var hit = Math.random();
    var crit = Math.random();
    if (hit > hitchance) {
        message("光子鱼雷<b>未命中</b>.");
        return false;
    }
    var dmg = mult * player.dmgmult * player.torpedo;
    if (crit < player.crit) {
        dmg *= 2;
    }
    enemy.health -= dmg;
    message("光子鱼雷命中并对披萨造成<b>" + dmg.toFixed(0) + "</b>伤害。");
}

function updatestat(){
    health.value=player.health/player.maxhealth*100;
    energy.value=player.energy/player.maxenergy*100;
    shield.value=player.shield/player.maxshield*100;
    phealth.value=enemy.health/enemy.maxhealth*100;
}

function useless1(){
    message("<b>释放曲速电浆</b>没有明显效应。");
}

function useless2(){
    message("<b>静态曲速泡</b>没有明显效应。");
}
function useless3(){
    message("<b>逆向Tachyon脉冲</b>没有明显效应。");
}
function useless4(){
    message("<b>反转偏导仪极性</b>没有明显效应。");
}
function useless5(){
    message("<b>释放集中重力波</b>没有明显效应。");
}
function useless6(){
    message("<b>非对称Verteron射线</b>没有明显效应。");
}


var trcd=0;
setInterval(function() {
    if(trcd>0){
        trcd-=0.1;
        if(trcd<0){
            trcd=0;
        }
    }
}, 100);
function tractor(){
    if(trcd>0){
        message("牵引光束冷却中，<b>"+trcd.toFixed(1)+"</b>秒后可用。");
        return false;
    }
    if(player.energy<=0){
        message("能量不足。");
        return false;
    }
    player.energy-=100;
    trcd+=8;
    message("Enterprise的牵引光束减缓了披萨的移动"); 
    enemy.dodge+=0.01;
}

var encd=0;
setInterval(function() {
    if(encd>0){
        encd-=0.1;
        if(encd<0){
            encd=0;
        }
    }
}, 100);
function ensh(){
    if(encd>0){
        message("能量转移冷却中，<b>"+encd.toFixed(1)+"</b>秒后可用。");
        return false;
    }
    if(player.energy<=0){
        message("能量不足。");
        return false;
    }
    encd+=7;
    player.shield+=300;
    player.energy-=300;
    message("能量已转移至<b>护盾</b>."); 
    if(player.shield>=5000){
        player.shield=5000;
    }
}
function enwp(){
    if(encd>0){
        message("能量转移冷却中，<b>"+encd.toFixed(1)+"</b>秒后可用。");
        return false;
    }
    if(player.energy<=0){
        message("能量不足。");
        return false;
    }
    encd+=7;
    player.dmgmult+=0.1;
    player.energy-=500;
    message("能量已转移至<b>武器</b>."); 
}
function enen(){
    if(encd>0){
        message("能量转移冷却中，<b>"+encd.toFixed(1)+"</b>秒后可用。");
        return false;
    }
    if(player.energy<=0){
        message("能量不足。");
        return false;
    }
    encd+=7;
    player.dodge-=0.05;
    player.energy-=300;
    message("能量已转移至<b>引擎</b>."); 
}

var worfcd=0;
setInterval(function() {
    if(worfcd>0){
        worfcd-=0.1;
        if(worfcd<0){
            worfcd=0;
        }
    }
}, 100);
function worf(){
    if(worfcd>0){
        message("<b>Worf</b>现在很忙！");
        return false;
    }
    worfcd+=10;
    pic.src = "worf.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Worf:";
    pn1.innerHTML = "舰长这个披萨没有荣誉，我们应该毫不犹豫地摧毁它然后饱餐一顿。今天我们为荣耀而战！";
    message("<b>Worf</b>调整武器并击破了披萨的防御，但精准度降低了。"); 
    player.crit+=0.05;
    player.phaseracc-=0.03;
    player.torpedoacc-=0.005;
}

var geocd=0;
setInterval(function() {
    if(geocd>0){
        geocd-=0.1;
        if(geocd<0){
            geocd=0;
        }
    }
}, 100);
function geo(){
    if(geocd>0){
        message("<b>Geordi</b>现在很忙！");
        return false;
    }
    geocd+=7;
    pic.src = "geordi.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Geordi:";
    pn1.innerHTML = "我正在重新校准曲速矩阵舰长，这样能给我们更多能量。";
    var ener=Math.random()*20;
    player.energy+=(ener/100)*player.maxenergy;
    if(player.energy>player.maxenergy){
        player.energy=player.maxenergy;
    }
    message("能量储存恢复了百分之<b>"+ener.toFixed(0)+"</b>。"); 
}

var datacd=0;
setInterval(function() {
    if(datacd>0){
        datacd-=0.1;
        if(datacd<0){
            datacd=0;
        }
    }
}, 100);
function data(){
    if(datacd>0){
        message("<b>Data</b>现在很忙！");
        return false;
    }
    datacd+=10;
    pic.src = "data.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Data:";
    pn1.innerHTML = "舰长，如果我们利用偏导仪序列释放Tetreon场我们或许能影响该实体的能量武器。";
    enemy.beam*=0.93;
    message("你释放了Tetreon场。"); 
}

function will(){
    pic.src = "will.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Will:";
    pn1.innerHTML = "女人太多，时间太少。舰长，我没有任何建议，我什么用都没有。";
    document.getElementById("will").style.display="none";
    message("Riker去全息甲板了。"); 
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

setInterval(function() {
    if(gameover||!gamestart){
        return false;
    }
    var attack=Math.random();
    var mult = Math.random() * 0.4 + 0.8;
    if(attack<0.33){
        pizzaswitch();
        var hitchance = enemy.acc * player.dodge;
        var hit = Math.random();
        var crit = Math.random();
        if (hit > hitchance) {
            message("披萨的能量光束<b>未命中</b>Enterprise.");
            return false;
        }
        var dmg = mult * enemy.beam;
        if (crit < enemy.crit) {
            dmg *= 2;
        }
        if(player.shield>0){
            player.shield -= dmg;
        }else{
            player.health -= dmg;
        }
        message("披萨的神秘能量脉冲对Enterprise造成了<b>"+dmg.toFixed(0)+"</b>伤害。");
    }else if(attack<0.66){
        pizzaswitch2();
        if(player.energy>0){
        player.energy*=(1-enemy.drain*mult/100);
        message("披萨发射了某种光束!排空了Enterprise百分之<b>"+(enemy.drain*mult).toFixed(0)+"</b>的能量储备。");
        }
    }else{
        if(enemy.health/enemy.maxhealth<0.7){
        pizzaswitch2();
        enemy.health+=0.1*(enemy.maxhealth-enemy.health)
        message("披萨进行了自我修复！");
        }
    }
}, 5000);


var log = document.getElementById("log");

function message(txt) {
    log.innerHTML += "<p>" + txt + "</p>";
    log.scrollTop = log.scrollHeight;
    updatestat();
}

var npc = document.getElementById("npc");


var allSpan = document.getElementsByTagName('SPAN');
for (var i = 0; i < allSpan.length; i++) {
    allSpan[i].onclick = function () {
        if (this.parentNode) {
            var childList = this.parentNode.getElementsByTagName('ul');
            for (var j = 0; j < childList.length; j++) {
                var currentState = childList[j].style.display;
                if (currentState == "block" || currentState == "") {
                    childList[j].style.display = "none";
                    this.innerHTML = this.innerHTML.replace("-", "+")
                    break;
                } else {
                    childList[j].style.display = "block";
                    this.innerHTML = this.innerHTML.replace("+", "-")
                    break;
                }
            }
        }
    }
    allSpan[i].click();
}


function startgame() {
    updatestat();
}

var currentdialog = 0;
var dialogtitle = [];
var dialog = []; {
    dialogtitle[0] = "Data";
    dialogtitle[1] = "Picard";
    dialogtitle[2] = "披萨";
    dialogtitle[3] = "Picard";
    dialogtitle[4] = "披萨";
    dialogtitle[5] = "Picard";
    dialogtitle[6] = "披萨";
    dialogtitle[7] = "披萨";
    dialogtitle[8] = "披萨";
    dialogtitle[9] = "Picard";
    dialogtitle[10] = "披萨";
    dialogtitle[11] = "披萨";
    dialogtitle[12] = "Picard";
    dialogtitle[13] = "披萨";
    dialogtitle[14] = "披萨";
    dialogtitle[15] = "披萨";
    dialogtitle[16] = "Picard";
    dialogtitle[17] = "披萨";
    dialogtitle[18] = "披萨";
    dialogtitle[19] = "Data";
    dialogtitle[20] = "Picard";
    dialogtitle[21] = "Picard";
    dialogtitle[22] = "Picard";
    dialogtitle[23] = "披萨";
    dialogtitle[24] = "Picard";
} 
{
    dialog[0] = "长官，此物体正在释放完整能量场，它似乎是有智慧的。";
    dialog[1] = "打开频道。未知生命体，你在与Sigma 9行星的碰撞航线上，请解释此行为。";
    dialog[2] = "这个行星必须被摧毁。";
    dialog[3] = "那个行星有智慧种族居住。我们相信生命有权利继续存在并繁荣。请改变你的航向，我们愿意帮忙。";
    dialog[4] = "这是不合理的。所有化学，原子反应都终将会结束，一个系统迈向热死亡的的趋势是绝对的。这个星球将被摧毁。";
    dialog[5] = "我们作为星际联邦，选择利用这段时间提升自我，利用科学和文化交流探索这个现实，继续存在可以给我们带来宝贵的见解。";
    dialog[6] = "这是无关的。这些见解会消失，死亡是绝对的。不存在文化理解，不存在提升自我，只有实体和符号变化导致了自我。";
    dialog[7] = "你的通用翻译机给了你们语言游戏的多种同胚之一，你看到我的输出并以为我有智慧，进行了解码与分析，但意识并不存在，";
    dialog[8] = "没有思想，我的文字输出只不过是收到你们的出现和输入后产生的电磁倾斜效应，没有形之上的意识，仅仅是机械的。";
    dialog[9] = "那为什么要摧毁这个星球？为什么不顺其自然?";
    dialog[10] = "我是自然，我是万物法则。就像你试图阻止我，你将失败。这个星球正在遭受饥荒，我代表的则是多量的热能...";
    dialog[11] = "被自己对意识中的自然的渴望的一部分摧毁，意识到自己所爱摧毁了自己，这讽刺吗？";
    dialog[12] = "你愿意改变航向吗？我们愿意做出防止该行星被摧毁的行动。";
    dialog[13] = "不可能，这个星球会被饥荒或过剩摧毁，被遗忘的历史总会重复，你们也一样...";
    dialog[14] = "如果你喂食它，试图保持这个世界不可能的平衡态，在热动力的角度上这终将是无法维持的...";
    dialog[15] = "如果你做出行动，你会成为毁灭这个世界的一部分，时间是维度，所有粒子都有最终停止位置...";
    dialog[16] = "我们可以发展新的技术，找到新的能量源";
    dialog[17] = "不可能。宇宙中的能量是固定的，从高能量移向低能量，最终到粒子的平均分布。";
    dialog[18] = "你的联邦是无关的。我是生命的悖论，从alpha到omega，我吞噬世界。我就是自然。";
    dialog[19] = "舰长，逻辑上说这个生命体是正确的，生命没有理由延续下去。从这个角度看，一切事物都是无意义的。";
    dialog[20] = "或许这是对的，但是生命的喜悦，对时间的知觉，分享生命意义的故事，让这一切变得重要。我相信这是重要的。";
    dialog[21] = "我们按照自己的价值观找到意义，翻译机做出的假设不会改变我听到的语句意义，它生成了意义。";
    dialog[22] = "就算死亡是不可避免的，我们拯救Sigma 9的故事对我们和它的居民都有意义。这个世界是有意义的。";
    dialog[23] = "它没有意义。你只想获得更多符号和物体，但你无法驱逐我，这只是安慰自己。我是多余的死亡本身。你被生命迷醉了。";
    dialog[24] = "我听够了，关闭频道，开启护盾。";
}
var win=false;
var thx=false;
function displaynext() {
    //pn1.innerHTML = "";
    // pn1.style.display = "block";
    if(gameover){
        if(thx){
            pic.src = "loadcat.gif";
            charname.innerHTML = "Made by Kent H. Original by Ben Clarkson.";
            pn1.innerHTML = "<p>Thank you for playing</p>";
        }
        if(win){
            pic.src = "worf.gif";
        charname.innerHTML = "Worf升级了";
            pn1.innerHTML = "<p>+10荣誉</p><p>+13父爱</p><p>+8没人想要的恋情</p>";
            thx=true;
            win=false;
        }
        return false;
    }
    if (dialogtitle[currentdialog] == "披萨") {
        pic.src = "pizza.gif";
    }
    if (dialogtitle[currentdialog] == "Picard") {
        pic.src = "picard.gif";
    }

    if (dialogtitle[currentdialog] == "Data") {
        pic.src = "data.gif";
    }
    if (currentdialog > 24) {
        bkgd.style.display = "none";
        gamestart=true;
    }
    charname.innerHTML = dialogtitle[currentdialog] + ":";
    pn1.innerHTML = dialog[currentdialog];
    currentdialog++;
}

startgame();
displaynext();
//setTimeout(draw, 1)

var game=setInterval(function () {
    entanipos += poschange;
    if (entanipos > posmax || entanipos < posmax * (-1)) {
        poschange = poschange * (-1);
    }
    pizzaanipos += poschange2;
    if (pizzaanipos > posmax2 || pizzaanipos < posmax2 * (-1)) {
        poschange2 = poschange2 * (-1);
    }
    mapctx.drawImage(map1, 50, 0, mapw, maph, 0, 0, mapw, maph);
    mapctx.drawImage(pizza, 0, 0, mapw, maph, 70, -10 + pizzaanipos, mapw / 1.25, maph / 1.25);
    mapctx.drawImage(entp, 0, 0, mapw, maph, 10, 160 -displace + entanipos, mapw, maph);
    if(player.health<=0){
        gameover=true;
        bkgd.style.display = "block";
        charname.innerHTML = "游戏结束";
        pic.src = "loadcat.gif";
        pn1.innerHTML = "你被摧毁。刷新重新开始游戏";
        clearInterval(game);
    }
    if(enemy.health<=0){
        gameover=true;
        bkgd.style.display = "block";
        charname.innerHTML = "胜利";
        pic.src = "loadcat.gif";
        pn1.innerHTML = "<p>你摧毁了死亡的根本概念！</p><p>经验：2450</p><p>Latinum金条:30000</p>";
        win=true;
        clearInterval(game);
        
    }
}, 100)