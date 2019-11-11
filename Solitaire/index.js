'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,b,e){if(c){b=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var f=a[e];f in b||(b[f]={});b=b[f]}a=a[a.length-1];e=b[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,b){var c=this;c instanceof String&&(c=String(c));var f=c.length;b=b||0;for(0>b&&(b=Math.max(b+f,0));b<f;b++){var d=c[b];if(d===a||Object.is(d,a))return!0}return!1}},"es7","es3");
const VERSION="19.11.11.0",Variants=[{Name:"Klondike",Type:"All,Klondike,Classic,Small Screen",Desc:"one pack, unlimited redeals",File:"Klondike1",Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)"},{Name:"Klondike Hard",Type:"All,Klondike,Hard,Small Screen",Desc:"one pack, no redeals",File:"Klondike1-1",Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)"},{Name:"Klondike Draw Three",Type:"All,Klondike,Small Screen",Desc:"one pack, draw three, unlimited redeals",File:"Klondike3",
Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)"},{Name:"Double Klondike",Type:"All,Klondike,Two Packs",Desc:"two packs, draw one, unlimited redeals",File:"DoubleKlondike",Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)"},{Name:"Triple Klondike",Type:"All,Klondike,Three Packs",Desc:"three packs, draw one, unlimited redeals",File:"TripleKlondike",Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)"},{Name:"Quadruple Klondike",Type:"All,Klondike",Desc:"four packs, draw one, unlimited redeals",
File:"QuadKlondike",Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)"},{Name:"Thoughtful",Type:"All,Klondike,Small Screen",Desc:"aka Saratoga. Klondike but with all tableau cards face up",File:"Thoughtful",Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)"},{Name:"Lady Jane",Type:"All,Klondike,Two Packs",Desc:"an easy two-deck Spider/Klondike blend by Thomas Warfield",File:"LadyJane",Wikipedia:""},{Name:"Blockade",Type:"All,Easy,Spider,Two Packs",Desc:"an easy mix of Klondike and Spider",
File:"Blockade",Wikipedia:"https://en.wikipedia.org/wiki/Blockade_(solitaire)"},{Name:"Napoleon's Square",Type:"All,Easy,Forty Thieves,Two Packs",Desc:"an easier version of Forty Thieves",File:"NapSq",Wikipedia:"https://en.wikipedia.org/wiki/Napoleon%27s_Square"},{Name:"Whitehead",Type:"All,Klondike,Easy,Small Screen",Desc:"build down regardless of color, can only move cards of same suit",File:"Whitehead",Wikipedia:"https://en.wikipedia.org/wiki/Klondike_(solitaire)#Variations"},{Name:"Agnes Bernauer",
Type:"All,Canfield,Small Screen",Desc:"aka Agnes, a variation of Klondike with reserve piles",File:"AgnesBernauer",Wikipedia:"https://en.wikipedia.org/wiki/Agnes_(card_game)"},{Name:"Agnes Sorel",Type:"All,Canfield,Hard,Small Screen",Desc:"a David Parlett original which is almost impossible to win",File:"AgnesSorel",Wikipedia:"https://en.wikipedia.org/wiki/Agnes_(card_game)"},{Name:"Easthaven",Type:"All,Klondike,Hard",Desc:"aka Aces Up - Klondike-like with a Spider-like stock",File:"Easthaven",Wikipedia:""},
{Name:"Easthaven Relaxed",Type:"All,Klondike,Hard",Desc:"allows any card in an empty tableau",File:"EasthavenRelaxed",Wikipedia:""},{Name:"Double Easthaven",Type:"All,Klondike,Hard,Two Packs",Desc:"aka Aces Up - Klondike-like with a Spider-like stock",File:"DoubleEasthaven",Wikipedia:""},{Name:"Westcliff",Type:"All,Klondike,Easy",Desc:"probably the easiest game in this collection",File:"Westcliff",Wikipedia:"https://en.wikipedia.org/wiki/Westcliff_(solitaire)"},{Name:"Yukon",Type:"All,Yukon,Classic,Small Screen",
Desc:"build the tableau down by alternate color",File:"Yukon",Wikipedia:"https://en.wikipedia.org/wiki/Yukon_(solitaire)"},{Name:"Russian",Type:"All,Yukon,Small Screen",Desc:"build the tableau down in suit",File:"Russian",Wikipedia:"https://en.wikipedia.org/wiki/Russian_(solitaire)"},{Name:"Yukon One Suit",Type:"All,Easy,Yukon,Small Screen,One Suit",Desc:"easy version of Yukon",File:"Yukon1",Wikipedia:"https://en.wikipedia.org/wiki/Yukon_(solitaire)"},{Name:"Yukon Cells",Type:"All,Easy,Yukon",Desc:"easy version of Yukon with two free cells",
File:"YukonCells",Wikipedia:"https://en.wikipedia.org/wiki/Yukon_(solitaire)"},{Name:"Double Yukon",Type:"All,Yukon,Two Packs",Desc:"harder version of Yukon",File:"DoubleYukon",Wikipedia:"https://en.wikipedia.org/wiki/Yukon_(solitaire)"},{Name:"Alaska",Type:"All,Yukon,Hard,Small Screen",Desc:"a version of Yukon, but the tableau is built up or down by suit",File:"Alaska",Wikipedia:"https://en.wikipedia.org/wiki/Yukon_(solitaire)"},{Name:"Brisbane",Type:"All,Easy,Yukon,Small Screen",Desc:"a version of Yukon, build the tableau down regardless of suit",
File:"Brisbane",Wikipedia:"https://en.wikipedia.org/wiki/Yukon_(solitaire)"},{Name:"Australian",Type:"All,Klondike,Yukon,Easy,Small Screen",Desc:"an easy mix of Klondike and Yukon, the tableau is built down by suit",File:"Australian",Wikipedia:"https://en.wikipedia.org/wiki/Australian_Patience"},{Name:"Canfield",Type:"All,Canfield,Classic,Small Screen",Desc:"aka Fascination, Demon, Thirteen",File:"Canfield",Wikipedia:"https://en.wikipedia.org/wiki/Canfield_(solitaire)"},{Name:"Rainbow",Type:"All,Canfield,Small Screen",
Desc:"a slightly easier version of Canfield",File:"Rainbow",Wikipedia:"https://en.wikipedia.org/wiki/Canfield_(solitaire)"},{Name:"Storehouse",Type:"All,Canfield",Desc:"an easier version of Canfield",File:"Storehouse",Wikipedia:"https://en.wikipedia.org/wiki/Canfield_(solitaire)"},{Name:"American Toad",Type:"All,Canfield,Two Packs,Easy",Desc:"an easier version of Canfield",File:"AmericanToad",Wikipedia:"https://en.wikipedia.org/wiki/American_Toad_(solitaire)"},{Name:"Golf",Type:"All,Golf",Desc:"move cards that are one rank higher or one rank lower than the top card of the foundation",
File:"Golf",Wikipedia:"https://en.wikipedia.org/wiki/Golf_(patience)"},{Name:"Golf Relaxed",Type:"All,Golf",Desc:"Aces and Kings can go on each other",File:"GolfRelaxed",Wikipedia:"https://en.wikipedia.org/wiki/Golf_(patience)"},{Name:"Alternation",Type:"All,Other,Two Packs",Desc:"alternate cards face down, built up alternate colors",File:"Alternation",Wikipedia:"https://en.wikipedia.org/wiki/Alternation_(solitaire)"},{Name:"Flower Garden",Type:"All,Other",Desc:"aka The Garden or Bouquet",File:"FlowerGarden",
Wikipedia:"https://en.wikipedia.org/wiki/Flower_Garden_(solitaire)"},{Name:"Brigade",Type:"All,Other",Desc:"easier version of Flower Garden",File:"Brigade",Wikipedia:"https://en.wikipedia.org/wiki/Flower_Garden_(solitaire)"},{Name:"Carpet",Type:"All,Easy,Other",Desc:"easy game with twenty reserve piles, no tableau and no building",File:"Carpet",Wikipedia:"https://en.wikipedia.org/wiki/Carpet_(solitaire)"},{Name:"Forty Thieves",Type:"All,Forty Thieves,Classic,Two Packs,Hard",Desc:"aka Napoleon at St Helena",
File:"FortyThieves",Wikipedia:"https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)"},{Name:"Squadron",Type:"All,Forty Thieves,Two Packs",Desc:"Forty Thieves with three free cells",File:"Squadron",Wikipedia:"https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)"},{Name:"Forty and Eight",Type:"All,Forty Thieves,Two Packs",Desc:"easier version of Forty Thieves, allows two stock redeals",File:"FortyAndEight",Wikipedia:"https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)"},{Name:"Congress",Type:"All,Forty Thieves,Two Packs",
Desc:"empty tableaux are automatically filled from waste or stock piles",File:"Congress",Wikipedia:"https://en.wikipedia.org/wiki/Congress_(solitaire)"},{Name:"Parliament",Type:"All,Forty Thieves,Two Packs",Desc:"an easier version of Congress",File:"Parliament",Wikipedia:"https://en.wikipedia.org/wiki/Congress_(solitaire)"},{Name:"Josephine",Type:"All,Forty Thieves,Two Packs",Desc:"aka Forty Bandits - an easier version of Forty Thieves",File:"Josephine",Wikipedia:"https://en.wikipedia.org/wiki/Josephine_(solitaire)"},
{Name:"Maria",Type:"All,Forty Thieves,Two Packs",Desc:"like Forty Thieves, but build tableau down in alternate colors",File:"Maria",Wikipedia:"https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)"},{Name:"Number Ten",Type:"All,Forty Thieves,Two Packs",Desc:"like Forty Thieves, but build tableau down in alternate colors",File:"NumberTen",Wikipedia:"https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)"},{Name:"Indian",Type:"All,Forty Thieves,Two Packs",Desc:"",File:"Indian",Wikipedia:"https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)"},
{Name:"Lucas",Type:"All,Forty Thieves,Two Packs",Desc:"easier version of Forty Thieves where the foundation is seeded with aces",File:"Lucas",Wikipedia:"https://en.wikipedia.org/wiki/Josephine_(solitaire)"},{Name:"Limited",Type:"All,Forty Thieves",Desc:"easier version of Forty Thieves with more tableaux piles",File:"Limited",Wikipedia:"https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)"},{Name:"Freecell",Type:"All,Freecell,Classic,Small Screen",Desc:"can move multiple tableau cards",File:"Freecell",
Wikipedia:"https://en.wikipedia.org/wiki/Freecell"},{Name:"Forecell",Type:"All,Freecell,Small Screen",Desc:"can move multiple tableau cards, cells are filled at start",File:"Forecell",Wikipedia:"https://en.wikipedia.org/wiki/Freecell"},{Name:"Freecell Original",Type:"All,Freecell,Small Screen",Desc:"invented by Paul Alfille",File:"Freecell0",Wikipedia:"https://en.wikipedia.org/wiki/Freecell"},{Name:"Freecell Easy",Type:"All,Easy,Freecell,Small Screen",Desc:"Kings and Aces are moved to top and bottom of tableaux stacks",
File:"FreecellEasy",Wikipedia:"https://en.wikipedia.org/wiki/Freecell"},{Name:"Blind Freecell",Type:"All,Freecell",Desc:"Freecell made harder; tableau cards are face down and cells are filled",File:"BlindFreecell",Wikipedia:"https://en.wikipedia.org/wiki/Freecell"},{Name:"Sea Towers",Type:"All,Freecell",Desc:"aka Seahaven Towers or Seahaven, by Art Cabral",File:"SeaTowers",Wikipedia:"https://en.wikipedia.org/wiki/Seahaven_Towers_(solitaire)"},{Name:"Big Freecell",Type:"All,Freecell,Two Packs,Easy",
Desc:"a very easy straight-forward two-deck version of FreeCell",File:"BigFreecell",Wikipedia:"https://en.wikipedia.org/wiki/Freecell"},{Name:"Double Freecell",Type:"All,Freecell,Two Packs",Desc:"Thomas Warfield's two-deck variation on Freecell",File:"DoubleFreecell",Wikipedia:"https://en.wikipedia.org/wiki/Freecell"},{Name:"Eight Off",Type:"All,Freecell",Desc:"predates Freecell",File:"EightOff",Wikipedia:"https://en.wikipedia.org/wiki/Eight_Off"},{Name:"Baker's Game",Type:"All,Freecell",Desc:"predates Freecell, tableau are built by suit",
File:"Baker'sGame",Wikipedia:"https://en.wikipedia.org/wiki/Baker%27s_Game"},{Name:"Penguin",Type:"All,Freecell",Desc:"a David Parlett original",File:"Penguin",Wikipedia:"http://www.parlettgames.uk/patience/penguin.html"},{Name:"Tuxedo",Type:"All,Freecell",Desc:"an easier version of Penguin",File:"Tuxedo",Wikipedia:"https://politaire.com/help/tuxedo"},{Name:"Scorpion",Type:"All,Scorpion,Classic,Small Screen",Desc:"related to Spider, the method of game play is like Yukon",File:"Scorpion",Wikipedia:"https://en.wikipedia.org/wiki/Scorpion_(solitaire)"},
{Name:"Three Blind Mice",Type:"All,Scorpion",Desc:"a variation of Scorpion with a two-card reserve",File:"ThreeBlindMice",Wikipedia:"https://en.wikipedia.org/wiki/Scorpion_(solitaire)"},{Name:"Double Scorpion",Type:"All,Hard,Scorpion,Two Packs",Desc:"a two deck version of Scorpion, all cards are already dealt at the beginning",File:"DoubleScorpion",Wikipedia:"https://en.wikipedia.org/wiki/Scorpion_(solitaire)"},{Name:"Triple Scorpion",Type:"All,Scorpion,Three Packs",Desc:"a three deck version of Scorpion, all cards are already dealt at the beginning",
File:"TripleScorpion",Wikipedia:"https://en.wikipedia.org/wiki/Scorpion_(solitaire)"},{Name:"Wasp",Type:"All,Easy,Scorpion,Small Screen",Desc:"easy version of Scorpion, allows any card to be placed on empty column",File:"Wasp",Wikipedia:"https://en.wikipedia.org/wiki/Scorpion_(solitaire)"},{Name:"Spider One Suit",Type:"All,Spider,Easy,Classic,One Suit",Desc:"easy version of Spider with only spades",File:"Spider1",Wikipedia:"https://en.wikipedia.org/wiki/Spider_(solitaire)"},{Name:"Spider Two Suits",
Type:"All,Spider,Two Suits",Desc:"easier version of Spider with only spades and hearts",File:"Spider2",Wikipedia:"https://en.wikipedia.org/wiki/Spider_(solitaire)"},{Name:"Spider",Type:"All,Spider,Two Packs",Desc:"made famous by Microsoft, though it dates back at least to 1949",File:"Spider4",Wikipedia:"https://en.wikipedia.org/wiki/Spider_(solitaire)"},{Name:"Spiderette One Suit",Type:"All,Spider,Easy,Small Screen,One Suit",Desc:"",File:"Spiderette1",Wikipedia:"https://en.wikipedia.org/wiki/Spider_(solitaire)"},
{Name:"Spiderette Two Suits",Type:"All,Spider,Small Screen,Two Suits",Desc:"",File:"Spiderette2",Wikipedia:"https://en.wikipedia.org/wiki/Spider_(solitaire)"},{Name:"Spiderette",Type:"All,Spider,Hard,Small Screen",Desc:"",File:"Spiderette4",Wikipedia:"https://en.wikipedia.org/wiki/Spider_(solitaire)"},{Name:"Simple Simon",Type:"All,Easy,Simple,Spider",Desc:"like a one-deck Spider where all cards start face up in a triangular tableau",File:"SimpleSimon",Wikipedia:"https://en.wikipedia.org/wiki/Simple_Simon_(solitaire)"},
{Name:"Fortress",Type:"All,Hard,Simple,Castle",Desc:"one of the oldest open solitaires and at one time one of the most popular",File:"Fortress",Wikipedia:"https://en.wikipedia.org/wiki/Fortress_(card_game)"},{Name:"Cruel",Type:"All,Tableau Redeal",Desc:"originally for Microsoft Windows, based on Perseverance",File:"Cruel",Wikipedia:"https://en.wikipedia.org/wiki/Cruel_(solitaire)"},{Name:"Unusual",Type:"All,Tableau Redeal,Two Packs",Desc:"a two-pack version of Cruel",File:"Unusual",Wikipedia:"https://en.wikipedia.org/wiki/Cruel_(solitaire)"},
{Name:"Ripple Fan",Type:"All,Tableau Redeal",Desc:"an easier version of Cruel",File:"RippleFan",Wikipedia:"https://en.wikipedia.org/wiki/Cruel_(solitaire)"},{Name:"Perseverance",Type:"All,Tableau Redeal",Desc:"like Cruel, but a sequence of cards can be moved",File:"Perseverance",Wikipedia:"https://en.wikipedia.org/wiki/Perseverance_(solitaire)"},{Name:"Indefatigable",Type:"All,Tableau Redeal",Desc:"like Royal Family, but the foundations build up from Ace, and there is an extra redeal",File:"Indefatigable",
Wikipedia:"https://en.wikipedia.org/wiki/Perseverance_(solitaire)"},{Name:"Beleaguered Castle",Type:"All,Castle",Desc:"aka Laying Siege, Sham Battle",File:"BeleagueredCastle",Wikipedia:"https://en.wikipedia.org/wiki/Beleaguered_Castle"},{Name:"Stronghold",Type:"All,Castle",Desc:"easier Beleaguered Castle with a free cell",File:"Stronghold",Wikipedia:"https://en.wikipedia.org/wiki/Beleaguered_Castle"},{Name:"Somerset",Type:"All,Klondike,Hard",Desc:"Klondike variant without stock or waste",File:"Somerset",
Wikipedia:"https://politaire.com/help/somerset"},{Name:"Somerset Relaxed",Type:"All,Klondike",Desc:"allows sequences of cards to be moved",File:"SomersetRelaxed",Wikipedia:"https://politaire.com/help/somerset"},{Name:"Usk",Type:"All,Klondike,Tableau Redeal",Desc:"Klondike variant with one tableau reshuffle and no stock or waste",File:"Usk",Wikipedia:"https://politaire.com/help/usk"},{Name:"Usk Relaxed",Type:"All,Klondike,Tableau Redeal",Desc:"allows unlimited tableau reshuffles",File:"UskRelaxed",
Wikipedia:"https://politaire.com/help/usk"},{Name:"Breeze",Type:"All,Fan,Easy,Simple",Desc:"an easier version of Fan that allows sequences of cards to be moved",File:"Breeze",Wikipedia:""},{Name:"Fan",Type:"All,Fan",Desc:"the original fan-type game",File:"Fan",Wikipedia:"https://en.wikipedia.org/wiki/La_Belle_Lucie"},{Name:"La Belle Lucie",Type:"All,Fan,Tableau Redeal,Hard",Desc:"a classic game first published by Lady Adelaide Cadogan in 1870",File:"LaBelleLucie",Wikipedia:"https://en.wikipedia.org/wiki/La_Belle_Lucie"},
{Name:"Trefoil",Type:"All,Fan,Tableau Redeal",Desc:"Fan with two tableau shuffles",File:"Trefoil",Wikipedia:"https://en.wikipedia.org/wiki/La_Belle_Lucie"},{Name:"Trefoil Relaxed",Type:"All,Fan,Tableau Redeal,Easy",Desc:"Fan with two tableau shuffles, sequences of cards can be moved together",File:"TrefoilRelaxed",Wikipedia:"https://en.wikipedia.org/wiki/La_Belle_Lucie"},{Name:"Bisley",Type:"All,Bisley",Desc:"a one-deck game where you choose on which foundation a card can be placed",File:"Bisley",
Wikipedia:"https://en.wikipedia.org/wiki/Bisley_(solitaire)"},{Name:"Aces and Kings",Type:"All,Bisley,Two Packs",Desc:"build up on one foundation, down on the other, but don't build on the tableau",File:"AcesAndKings",Wikipedia:"https://en.wikipedia.org/wiki/Aces_and_Kings"},{Name:"Acey and Kingsley",Type:"All,Bisley,Two Packs",Desc:"an easier version of Aces and Kings",File:"AceyAndKingsley",Wikipedia:"https://en.wikipedia.org/wiki/Aces_and_Kings"},{Name:"Martha",Type:"All,Easy,Bisley",Desc:"easy game with no stock and half the cards start face down",
File:"Martha",Wikipedia:"https://en.wikipedia.org/wiki/Martha_(solitaire)"},{Name:"Stewart",Type:"All,Bisley",Desc:"a harder version of Martha",File:"Stewart",Wikipedia:"https://en.wikipedia.org/wiki/Martha_(solitaire)"},{Name:"Baker's Dozen",Type:"All,Bisley,Simple",Desc:"so called because of the 13 columns, the number in a baker's dozen",File:"Baker'sDozen",Wikipedia:"https://en.wikipedia.org/wiki/Baker%27s_Dozen_(solitaire)"},{Name:"Spanish",Type:"All,Easy,Simple",Desc:"any card can fill empty tableau spaces",
File:"Spanish",Wikipedia:"https://en.wikipedia.org/wiki/Baker%27s_Dozen_(solitaire)"},{Name:"Portuguese",Type:"All,Simple",Desc:"halfway between Baker's Dozen and Spanish Patience",File:"Portuguese",Wikipedia:"https://en.wikipedia.org/wiki/Baker%27s_Dozen_(solitaire)"},{Name:"Castles in Spain",Type:"All,Bisley,Simple",Desc:"like Spanish Patience, but the cards are built down by alternate color",File:"CastlesInSpain",Wikipedia:"https://en.wikipedia.org/wiki/Baker%27s_Dozen_(solitaire)"},{Name:"Frog",
Type:"All,Frog,Two Packs",Desc:"aka Toad",File:"Frog",Wikipedia:"https://en.wikipedia.org/wiki/Frog_(game)"},{Name:"Fly",Type:"All,Frog,Two Packs",Desc:"an easier version of Frog",File:"Fly",Wikipedia:"https://en.wikipedia.org/wiki/Frog_(game)"},{Name:"Gnat",Type:"All,Frog",Desc:"a one deck version of Fly",File:"Gnat",Wikipedia:"https://en.wikipedia.org/wiki/Frog_(game)"},{Name:"HouseFly",Type:"All,Frog",Desc:"an easier version of Gnat",File:"HouseFly",Wikipedia:"https://en.wikipedia.org/wiki/Frog_(game)"},
{Name:"Grandfather's Clock",Type:"All,Clock,Easy",Desc:"arrange cards in the foundations like a clock",File:"GClock",Wikipedia:"https://en.wikipedia.org/wiki/Grandfather%27s_Clock"},{Name:"Osmosis",Type:"All,Other",Desc:"also known as Treasure Trove",File:"Osmosis",Wikipedia:"https://en.wikipedia.org/wiki/Osmosis_(solitaire)"},{Name:"Peek",Type:"All,Other",Desc:"Osmosis with a visible reserve",File:"Peek",Wikipedia:"https://en.wikipedia.org/wiki/Osmosis_(solitaire)"},{Name:"Busy Aces",Type:"All,Simple,Two Packs",
Desc:"simple game dating from 1939",File:"BusyAces",Wikipedia:""},{Name:"Courtyard",Type:"All,Simple,Two Packs",Desc:"like Busy Aces, but empty tableau spaces are automatically filled",File:"Courtyard",Wikipedia:""},{Name:"Fortune's Favor",Type:"All,Easy,Simple",Desc:"like Busy Aces, but empty tableau spaces are automatically filled",File:"FortunesFavor",Wikipedia:"https://en.wikipedia.org/wiki/Fortune%27s_Favor"},{Name:"Stages",Type:"All,Simple,Two Packs",Desc:"like Busy Aces, but sequences of tableau cards can be moved",
File:"Stages",Wikipedia:""},{Name:"Oddstream",Type:"All,Originals,Small Screen",Desc:"tidy the tableau as you go, or you won't win",File:"Oddstream",Wikipedia:""},{Name:"Oddstream K",Type:"All,Originals,Small Screen",Desc:"harder version of Oddstream",File:"OddstreamK",Wikipedia:""},{Name:"Oddstream S",Type:"All,Originals,Small Screen",Desc:"like Oddstream K, but build tableau down in suit",File:"OddstreamS",Wikipedia:""},{Name:"Flipflop One Suit",Type:"All,Other,Small Screen,One Suit",Desc:"easiest version of Flipflop by Zach Gage",
File:"Flipflop1",Wikipedia:""},{Name:"Flipflop Two Suits",Type:"All,Other,Small Screen,Two Suits",Desc:"",File:"Flipflop2",Wikipedia:""},{Name:"Flipflop Three Suits",Type:"All,Other,Small Screen",Desc:"",File:"Flipflop3",Wikipedia:""},{Name:"Flipflop Four Suits",Type:"All,Other,Small Screen",Desc:"",File:"Flipflop4",Wikipedia:""},{Name:"Flipflop Five Suits",Type:"All,Other,Small Screen",Desc:"hardest version of Flipflop",File:"Flipflop5",Wikipedia:""},{Name:"Quick Fail",Type:"Debug",Desc:"",File:"QuickFail",
Wikipedia:""},{Name:"Quick Win",Type:"Debug",Desc:"",File:"QuickWin",Wikipedia:""}];
function search(a){a=a.toLowerCase();const c=new Set;a.length&&(Variants.forEach(b=>{-1!=b.Name.toLowerCase().indexOf(a)&&c.add(b)}),0===c.size&&Variants.forEach(b=>{-1!=b.Desc.toLowerCase().indexOf(a)&&c.add(b)}),0===c.size&&Variants.forEach(b=>{-1!=b.Type.toLowerCase().indexOf(a)&&c.add(b)}));const b=document.getElementById("searchResults");for(;b.firstChild;)b.removeChild(b.firstChild);if(c.size){const a=peach(b,"ul");c.forEach(c=>{peach(a,"li",null,null,peach(b,"a",{href:c.File+".html"},c.Name))})}}
function searchEvent(a){search(a.target.value)}function peach(a,c,b,e,...f){const d=document.createElement(c);if(b)for(let a in b)d.setAttribute(a,b[a]);e&&(d.innerHTML=e);f&&f.forEach(a=>d.appendChild(a));a&&a.appendChild(d);return d}const types=[];Variants.forEach(function(a){a.Type.split(",").forEach(function(a){types.includes(a)||types.push(a)})});types.sort();const ulOuter=peach(document.getElementById("content"),"ul",{class:"collapsible"});
for(let a=0;a<types.length;a++){const c=peach(ulOuter,"li",null,null,peach(null,"div",{class:"collapsible-header",id:`ch${a}`},null,peach(null,"h6",null,types[a]))),b=peach(c,"div",{class:"collapsible-body",id:`cb${a}`}),e=peach(b,"ul"),f=Variants.filter(function(d){return d.Type.split(",").includes(types[a])});f.sort(function(d,g){return d.Name.localeCompare(g.Name)});f.forEach(function(d){const g=peach(e,"li");peach(g,"a",{href:d.File+".html"},null,peach(null,"strong",null,d.Name));640<window.innerWidth&&
peach(g,"span",{class:"right"},d.Desc)})}M.Collapsible.init(document.querySelectorAll(".collapsible"));M.Modal.init(document.querySelectorAll(".modal"));M.Tooltip.init(document.querySelectorAll(".tooltipped"));document.getElementById("searchText").oninput=searchEvent;document.getElementById("modalLoadSavedDiv").style.display="file:"===window.location.protocol?"":"none";
const LOCALSTORAGE_SETTINGS="Oddstream Solitaire Settings",LOCALSTORAGE_GAMES="Oddstream Solitaire Games",DROPBOX_GAMES="/gameState.json",settings=JSON.parse(localStorage.getItem(LOCALSTORAGE_SETTINGS))||{},collapsibleFn=M.Collapsible.getInstance(ulOuter);collapsibleFn.options.onOpenEnd=function(){const a=document.querySelector("body>div#content>ul.collapsible>li.active>div>h6");a?settings.activeType=a.innerHTML:delete settings.activeType};const modalSearchFn=M.Modal.getInstance(document.getElementById("modalSearch"));
modalSearchFn.options.onOpenStart=function(){const a=document.getElementById("searchText");a.value="";a.focus()};const modalCloudFn=M.Modal.getInstance(document.getElementById("modalCloud"));
modalCloudFn.options.onOpenStart=function(){if(settings.dropboxAccessToken&&settings.dropboxAccessToken.length)document.getElementById("dropboxAccessToken").value=settings.dropboxAccessToken,document.getElementById("modalCloudAuto").checked=!!settings.autoCloudSync,document.getElementById("modalLoadSaved").checked=!!settings.loadSaved,document.getElementById("modalCloudConnected").classList.remove("hide"),document.getElementById("modalCloudNotConnected").classList.add("hide");else{document.getElementById("modalCloudConnected").classList.add("hide");
document.getElementById("modalCloudNotConnected").classList.remove("hide");const a=document.getElementById("btnAuthenticate");try{const c=new Dropbox.Dropbox({fetch:window.fetch.bind(window),clientId:"gpmr1d1u1j4h2d4"});a.href=c.getAuthenticationUrl(window.location.origin+window.location.pathname)}catch(c){M.toast({html:"cannot connect to Dropbox"}),console.error(c)}}};
modalCloudFn.options.onCloseEnd=function(){getAccessTokenFromModal();settings.autoCloudSync=document.getElementById("modalCloudAuto").checked;settings.loadSaved=document.getElementById("modalLoadSaved").checked};
window.onload=function(){settings.lastGame?document.getElementById("lastgame").setAttributeNS(null,"href",settings.lastGame):document.getElementById("lastgame").hidden=!0;if(settings.activeType){const a=document.querySelectorAll("div.collapsible-header>h6");for(let c=0;c<a.length;c++)if(a[c].innerHTML===settings.activeType){collapsibleFn.open(c);document.getElementById(`cb${c}`).scrollIntoView();break}}settings.autoCloudSync&&settings.dropboxAccessToken&&doSyncDropbox()};window.onbeforeunload=function(a){saveSettings()};
let params=null;window.location.hash?params=new URLSearchParams(window.location.hash.slice(1)):window.location.search&&(params=new URLSearchParams(window.location.search.slice(1)));params&&params.has("access_token")&&(settings.dropboxAccessToken=params.get("access_token"),modalCloudFn.open());
function getAccessTokenFromModal(){const a=settings.dropboxAccessToken=document.getElementById("dropboxAccessToken").value;a.length?settings.dropboxAccessToken=a:delete settings.dropboxAccessToken;return settings.dropboxAccessToken&&0<settings.dropboxAccessToken.length}function saveSettings(){try{localStorage.setItem(LOCALSTORAGE_SETTINGS,JSON.stringify(settings))}catch(a){M.toast({html:"error saving settings"}),console.error(a)}}
function saveGameStateToLocalStorage(a){try{localStorage.setItem(LOCALSTORAGE_GAMES,JSON.stringify(a)),M.toast({html:"local games saved"})}catch(c){M.toast({html:"error saving games"}),console.error(c)}}
function loadGameStateFromDropbox(a){modalCloudFn.isOpen&&(getAccessTokenFromModal()||M.toast({html:"no access token"}));let c={};(new Dropbox.Dropbox({fetch,accessToken:settings.dropboxAccessToken})).filesDownload({path:DROPBOX_GAMES}).then(function(b){b=b.fileBlob;let e=new FileReader;e.addEventListener("loadend",function(){try{c=JSON.parse(e.result),a(c)}catch(f){console.error(f),M.toast({html:"error in format of cloud games"})}});e.readAsText(b)}).catch(function(a){M.toast({html:"error loading cloud games"});
console.error(a)})}function saveGameStateToDropbox(a){modalCloudFn.isOpen&&!getAccessTokenFromModal()?M.toast({html:"no access token"}):(new Dropbox.Dropbox({fetch,accessToken:settings.dropboxAccessToken})).filesUpload({path:DROPBOX_GAMES,contents:JSON.stringify(a),mode:"overwrite"}).then(function(a){M.toast({html:"games saved to cloud"})}).catch(function(a){console.error(a);M.toast({html:"error saving games to cloud"})})}
function syncDropbox0(a){const c=JSON.parse(localStorage.getItem(LOCALSTORAGE_GAMES))||{},b={};let e=!1,f=!1;Variants.sort(function(a,b){return a.Name.localeCompare(b.Name)}).forEach(function(d){const g=a[d.Name],h=c[d.Name];h&&g?h.modified&&g.modified?h.modified>g.modified?(console.log(d.Name,"local newer than cloud"),b[d.Name]=h,e=!0):g.modified>h.modified?(console.log(d.Name,"cloud newer than local"),b[d.Name]=g,f=!0):b[d.Name]=h:h.totalGames>g.totalGames?(console.log(d.Name,"local > cloud"),b[d.Name]=
h,e=!0):g.totalGames>h.totalGames?(console.log(d.Name,"cloud > local"),b[d.Name]=g,f=!0):b[d.Name]=h:h?(console.log(d.Name,"local but not cloud"),b[d.Name]=h,e=!0):g?(console.log(d.Name,"cloud but not local"),b[d.Name]=g,f=!0):console.log(d.Name,"neither")});f&&saveGameStateToLocalStorage(b);e&&saveGameStateToDropbox(b);f||e||M.toast({html:"no changes to save"})}function doSyncDropbox(){loadGameStateFromDropbox(syncDropbox0)};
