const HERO_JSON =
"https://lioxmenthol.github.io/Auto/hero.json";

const SKIN_JSON =
"https://lioxmenthol.github.io/Auto/ml.json";

let allHeroes = [];
let allSkins = {};

const heroList =
document.getElementById("heroList");

const skinList =
document.getElementById("skinList");

const heroPage =
document.getElementById("heroPage");

const skinPage =
document.getElementById("skinPage");

const heroTitle =
document.getElementById("heroTitle");

// ======================
// IMAGE PROXY
// ======================
function getImageUrl(url){

    if(!url) return "";

    if(
        url.includes(
            "static.wikia.nocookie.net"
        )
    ){

        return "https://images.weserv.nl/?url="
        +
        encodeURIComponent(
            url.replace(
                /^https?:\/\//,
                ""
            )
        );
    }

    return url;
}

// ======================
// LOAD HERO
// ======================
fetch(HERO_JSON)
.then(function(r){

    return r.json();

})
.then(function(data){

    allHeroes = data;

    renderHeroes(data);

})
.catch(function(err){

    console.log(
        "Hero JSON Error:",
        err
    );

});

// ======================
// LOAD SKIN
// ======================
fetch(SKIN_JSON)
.then(function(r){

    return r.json();

})
.then(function(data){

    allSkins = data;

})
.catch(function(err){

    console.log(
        "Skin JSON Error:",
        err
    );

});

// ======================
// HERO LIST
// ======================
function renderHeroes(data){

    heroList.innerHTML = "";

    data.forEach(function(hero){

        const card =
        document.createElement("div");

        card.className =
        "card";

        card.innerHTML =
        '<img ' +
        'src="' +
        getImageUrl(hero.URL) +
        '" ' +
        'loading="lazy" ' +
        'referrerpolicy="no-referrer" ' +
        'onerror="this.src=\'https://via.placeholder.com/300x300?text=Hero\'">' +
        '<div class="card-title">' +
        hero.her +
        '</div>';

        card.onclick =
        function(){

            openHero(
                hero.her
            );

        };

        heroList.appendChild(
            card
        );

    });

}

// ======================
// OPEN HERO
// ======================
function openHero(heroName){

    history.pushState(
    {
        page:"skin",
        hero:heroName
    },
    "",
    "#" + heroName
    );

    heroPage.style.display =
    "none";

    skinPage.style.display =
    "block";

    heroTitle.innerText =
    heroName;

    skinList.innerHTML =
    "";

    Object.values(allSkins)
    .forEach(function(skin){

        if(
            skin.hero !==
            heroName
        ){
            return;
        }

        const card =
        document.createElement(
            "div"
        );

        card.className =
        "card";

        card.innerHTML =
        '<img ' +
        'src="' +
        getImageUrl(skin.img) +
        '" ' +
        'loading="lazy" ' +
        'referrerpolicy="no-referrer" ' +
        'onerror="this.src=\'https://via.placeholder.com/300x300?text=Skin\'">' +
        '<div class="card-title">' +
        skin.skin_name +
        '</div>' +
        '<a class="download-btn" href="#" onclick="downloadSkin(\'' +
        skin.url +
        '\',\'' +
        skin.skin_name.replace(/'/g,"\\'") +
        '\');return false;">DOWNLOAD</a>';

        skinList.appendChild(
            card
        );

    });

}

// ======================
// BACK WEBSITE
// ======================
document.getElementById(
    "backBtn"
).onclick =
function(){

    history.back();

};

// ======================
// BACK HP
// ======================
window.addEventListener(
"popstate",
function(){

    heroPage.style.display =
    "block";

    skinPage.style.display =
    "none";

}
);

// ======================
// SEARCH HERO
// ======================
document
.getElementById(
    "searchBox"
)
.addEventListener(
"input",
function(e){

    const key =
    e.target.value
    .toLowerCase();

    renderHeroes(

        allHeroes.filter(
            function(h){

                return h.her
                .toLowerCase()
                .includes(key);

            }
        )

    );

}
);

// ======================
// DOWNLOAD
// ======================
function downloadSkin(url, skinName){

    try{

        window.location.href =
        "phoenixtoolsskin://download?url="
        + encodeURIComponent(url)
        + "&name="
        + encodeURIComponent(skinName);

    }catch(e){

        alert(
            "Phoenix Tools Skin belum terinstall"
        );

    }

}
