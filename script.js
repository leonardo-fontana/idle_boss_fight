let power = 1;
let boss_health = 10;
let previous_boss_health = 10;
let boss_level = 1;
let skill_points = 0;
let money = 0;
let idle_damage = 0;
let click_power = 1;
let idle_power_increase = 0;
let idle_fight = false;
let boss_name = "Ikari Shinji";
let boss_name_list = ["Ikari Shinji", "Mako the Useless","Seiya of Pegasus","Victoream-Sama","Yamcha","Sakura","Buggy the Clown","Pinwheel","Covetous Demon","Jar Jar Binks","Ash Ketchup"];
let boss_name_img_src_list = ["https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816310/ab33253e15b9c9062b32551f3d96ee24_ydjpdi.jpg","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591815332/Mako_u87cxe.png","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816445/9ff5f60b882eb1b7c03f6c36392cc8ce_jww0ho.jpg","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816524/tumblr_mvz2atGqTg1rnrc4eo1_400_mzxdv5.png","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816573/20191109-eiuqfv6vuaabtis-1200x675_1_vhyiem.webp","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816689/sakura-haruno-561_ap1k8s.jpg","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816717/Buggy_in_Chibi_Form_vlqyf3.png","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816766/jeZLGKr_q5ddxe.jpg","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816859/Jabba_the_Hutt_svawr4.png","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816903/171b8b595efe6fe3c0713bb34c9e8f00_oewgka.jpg","https://res.cloudinary.com/dm9jgqh3a/image/upload/v1591816956/download_natidi.jpg"]

function boss_name_random() {
  random_number = Math.floor(Math.random() * 11);
  boss_name = boss_name_list[random_number];
  document.getElementById("image_src").src =   boss_name_img_src_list[random_number];
  render();
}

function buy_idle_boss_fight() {
  if(skill_points >= 20) {
    skill_points -= 20;
    idle_fight = true;
    document.getElementById("idle_fight_boss_button").disabled = true;
  }  
}

function increase_power() {
  power = power + (1 * click_power);
  render();
}

function fight_boss() { 
    boss_health -= power;
    if(boss_health <= 0) {
      boss_defeated();
    }
    render();  
}

function upgrade_weapon () {
  if (money >= 300) {
    money -= 300;
    power += 500;         
    render();
  }
}

function buy_idle_power_increase() {
  if(skill_points >= 4) {
    skill_points -= 4;
    idle_power_increase += 5;
    render();
  }  
}

function increase_click_power() {
  if(skill_points >= 2) {
    skill_points -= 2;
    click_power += 1;
    render();
  }  
}

function boss_defeated() {
   if(boss_health <= 0) {
      boss_level += 1;
      boss_health = previous_boss_health + (10 * boss_level) ;
      previous_boss_health = boss_health;
      skill_points += 1;
      money += 1 + (1 * boss_level);
      boss_name_random();
    }
}

function render() {
  let idle_true_power = 0;
  if(idle_fight) {
    idle_true_power = idle_damage +power;
  } else {
    idle_true_power = idle_damage;
  }
  
  boss_name_html.innerHTML = boss_name
  boss_health_html.innerHTML = boss_health;
  power_html.innerHTML = power;
  skill_points_html.innerHTML = skill_points;
  money_html.innerHTML = money;
  idle_damage_html.innerHTML = idle_true_power;
  boss_level_html.innerHTML = boss_level;
  click_power_html.innerHTML = "("+click_power+" power per click)"
}

function buy_warrior() {
  if(money >= 5) {
    money -= 5;
    idle_damage += 2;
    render();
  }  
}

function buy_wizard() {
  if(money >= 50) {
    money -= 50;
    idle_damage += 30;
    render();
  }  
}

function update() {

  power += idle_power_increase;
  if(idle_fight) {
    boss_health -= power;
  }
  //idle damage
  boss_health -= idle_damage;
  //power increase idle  
  boss_defeated();
}

// render the first loop
render();

// idle loop
setInterval(() => {
  update();
}, 1000)

// render loop
setInterval(() => {
  render();
},  100)