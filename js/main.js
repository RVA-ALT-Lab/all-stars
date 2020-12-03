var spreadsheetID = "146sZdCGPEUx3mGzoO8wlLupQfK2I9_me82dsgfw7ryM"; // Make sure it is published to the web
var dataURL = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID +"/9/public/values?alt=json"; //changed page id from 1 to 9

//https://spreadsheets.google.com/feeds/list/146sZdCGPEUx3mGzoO8wlLupQfK2I9_me82dsgfw7ryM/1/public/values?alt=json

//set some variables
var cards = [];

//get the data
fetch(dataURL).then(function(response) {
  var contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
      if (json.feed.entry) {
        var data = json.feed.entry;
        data.forEach(function(element){
        	if(element.gsx$removeajerk.$t != 'yes'){
        		cards.push(makeCard(element));          
          		console.log(element)
        	}
        })
      }
      shuffle(cards);
      document.getElementById('card-holder').innerHTML = cards.join("");
    }).then(function(json){
    	scrollTo()
    });
  } 
});


function makeCard(element){
        //let imgId = getImgId(element);
        //let img = replaceImage(imgId);
        let orientation = element.gsx$isyourimageahorizontalorvertical.$t.toLowerCase();
        let uglyFileName = element.gsx$filename.$t;
        let fileName = cleanImageName(uglyFileName);
        let random = Math.floor(Math.random() * 4) + 1;
        if (element.gsx$review.$t != '#N/A'){
          var star = 'allstar_';
        } else {
          var star = '';
        }
        var border = `imgs/ff_cards_front_${star}0${random}.png`;
         if (element.gsx$type.$t == 'reviewer'){
          var reviewer = 'reviewer-card';
          border = `imgs/ff_cardsArtboardreviewer_front_default.png`;
         } else {
          var reviewer = '';
         }

        return `<div class="flip-container ${orientation} ${reviewer}" id="${fileName}" onclick="jQuery('#${fileName}').toggleClass('hover')"><div class="flipper">
        <a href="#${fileName}"><div class="front" style="background-image:url(${border}),url(work/${fileName}.jpg)"></div></a>${makeBack(element, random)}</div></div>`
		//  background-image: url(img_flwr.gif), url(paper.gif);

        //return '<div class="flip-container"><div class="flipper"><div class="front"><img src="data:image/jpeg;base64,'+img+'"/></div>'+makeBack(element)+'</div></div>'
}


function makeBack(element, random){
  const name = element.gsx$yournameasyouwouldlikeittoappear.$t;
  const deg = element.gsx$mfabfabainphotography.$t;
  const uni = element.gsx$youruniversitycollegenamepleasebesuretousetheofficialname.$t;
  const statement = element.gsx$onesentence140charactersmaxaboutyourawesomeaboutyouyourimageoryourwork.$t;
  const site = element["gsx$websiteurltwitterurlinstagramurl-pleaseonlyprovideone."].$t; 
  const review = element.gsx$review.$t;
  const reviewer = element.gsx$reviewer.$t;

  if (site != '#N/A'){
    externalSite = `<div class="site"><a target="_blank" href="${site}">More work from ${name}</a></div>`
  } else {
    externalSite = '';
  }

  if (review != "#N/A" || review != ''){
    var reviewStatement = `<div class="review">"${review}"<div class="reviewer">&mdash;${reviewer}</div></div>`
  } else {
    var reviewStatement = '';
  }
  const backTop = 
  `<div class="back-top">
  	</div>`;
  return `<div class="back" style="background-image:url(imgs/ff_cards_back_0${random}.png)">${backTop}<h1 class="back-title">${name}</h1>
  			<div class="uni">${uni}</div>
        <div class="deg">${deg} 2020</div>
  			<div class="statement">${statement}</div>
        ${reviewStatement}
  			${externalSite}
  			<div class="footer">©2020 FotoFika</div>
  			</div>`
}

function cleanImageName(name){
  var cleanerName = name;
  if(name.includes(' -')){
       cleanerName = name.split(' -')[0];
   // console.log('space dash there')
  }  else if (name.includes('.')) {
       cleanerName = name.split('.')[0];
   // console.log(cleanerName)
  } 
  let cleanName = cleanerName.toLowerCase();
  return cleanName;
}


function replaceImage(id) {
  fetch('https://script.google.com/macros/s/AKfycbzdFJeGVkmXVIUdT2dPz7isrvldWF_QfKSqdk5D4ZJH7s1KCHE/exec?id='+id)
    .then(res => res.json())
    .then(json => {
      console.log(json.bytes); 
      //document.querySelector('#imgName').innerText = json.name;
      //const img = document.querySelector('#imgToReplace')
      //img.setAttribute('src', `data:image/jpeg;base64,${json.bytes}`)
//    console.log(json.bytes)
    return json.bytes
    })
  
  
}

function getImgId(element){
	//"gsx$uploadyourfilehere.yourfilemustbeformattedasfollows816x1110pixelsat300ppithismayrequireyoutocropyourimagetofitrgbjpegwhensavinguse12maxforimagequalitypleaseonlyusethefollowingfilenamingrequirementsmithjane.jpgtheprinterusesanautomatedprocessandimagesthatdonotadheretotheseexactspecswillbeeliminate"

  var imgBase = element["gsx$uploadyourfilehere.yourfilemustbeformattedasfollows816x1110pixelsat300ppithismayrequireyoutocropyourimagetofitrgbjpegwhensavinguse12maxforimagequalitypleaseonlyusethefollowingfilenamingrequirementsmithjane.jpgtheprinterusesanautomatedprocessandimagesthatdonotadheretotheseexactspecswillbeeliminate"].$t;
  var equals = imgBase.search("=")+1;
  var id = imgBase.substr(equals);
  return id;
}

//document.querySelector('#replaceButton').addEventListener('click', replaceImage)

jQuery(document).ready(function(){ 
	var button = jQuery('.flipcontainer');

	button.on("click",function(){
		button.toggleClass('hover');
	});
});


//From https://css-tricks.com/snippets/jquery/smooth-scrolling/

// Select all links with hashes
jQuery('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        jQuery('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var jQuerytarget = jQuery(target);
          jQuerytarget.focus();
          if (jQuerytarget.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            jQuerytarget.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            jQuerytarget.focus(); // Set focus again
          };
        });
      }
    }
  });

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};


//scroll to if has hash

function scrollTo(){
	if(window.location.hash) {
		var element_to_scroll_to = document.querySelectorAll(window.location.hash)[0];
	    element_to_scroll_to.scrollIntoView();

	} 

}