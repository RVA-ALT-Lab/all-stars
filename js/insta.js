var spreadsheetID = "146sZdCGPEUx3mGzoO8wlLupQfK2I9_me82dsgfw7ryM"; // Make sure it is published to the web
var dataURL = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID +"/1/public/values?alt=json";

//https://spreadsheets.google.com/feeds/list/146sZdCGPEUx3mGzoO8wlLupQfK2I9_me82dsgfw7ryM/1/public/values?alt=json

//set some variables
var cards = [];

//get the data
fetch(dataURL).then(function(response) {
  var contentType = response.headers.get("content-type");
  const nav = document.getElementById('navigation');
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
      if (json.feed.entry) {
        var data = json.feed.entry; 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);     
        if (urlParams.get('id')){
          var size = urlParams.get('id')
        } else {
          var size = (Object.keys(data).length) -1;
          var url = new URL(window.location.href);
          var searchParams = new URLSearchParams('?id='+size);
          url.searchParams.append('id', size);
          location.replace( url );
        }
        data.forEach(function(element, index){
        	if(element.gsx$removeajerk.$t != 'yes' && index == size ){ //change to URL pagination game later
        		cards.push(makeCard(element));          
          		//console.log(element)

        	}
        })
      }
      document.getElementById('card-holder').innerHTML = cards.join("");
    }).then(function(json){
    	scrollTo()
    });
  } 
});


function makeCard(element){
        //let imgId = getImgId(element);
        //let img = replaceImage(imgId);
        const name = element.gsx$yournameasyouwouldlikeittoappear.$t;
        let orientation = element.gsx$isyourimageahorizontalorvertical.$t.toLowerCase();
        let uglyFileName = element.gsx$filename.$t;
        let fileName = cleanImageName(uglyFileName);
        let random = Math.floor(Math.random() * 8) + 1;
        return `<button class="save" onclick="clickerDL('${fileName}','${name}')">DOWNLOAD</button><div class="card-thing ${orientation}" id="${fileName}"><img class="work" src="work/${fileName}.jpg"><img class="frame" src="imgs/bc-0${random}.png">
        </div>` +  makeBack(element); //<div class="flip-container col-md-7">${makeBack(element,fileName)}</div>
}


function makeBack(element){
  const name = element.gsx$yournameasyouwouldlikeittoappear.$t;
  const deg = element.gsx$mfabfabainphotography.$t;
  const uni = element.gsx$youruniversitycollegenamepleasebesuretousetheofficialname.$t;
  const statement = element.gsx$onesentence140charactersmaxaboutyourawesomeaboutyouyourimageoryourwork.$t;
  if(element["gsx$websiteurltwitterurlinstagramurl-pleaseonlyprovideone."].$t){
      var site = element["gsx$websiteurltwitterurlinstagramurl-pleaseonlyprovideone."].$t;
      var siteDiv = `<div class="site"><a target="_blank" href="${site}">More work from ${name}</a></div>`
  } else {
     var siteDiv = '';
  }
  const backTop = 
  `<div class="back-top">
  	<div class="grad">
  		<div class="deg">${deg}</div>
  		<div class="year">2020</div>
  	</div>
  	<div class="star"></div>
  	</div>`;
    setInstaText(name, deg, uni, statement, site);
  return `<div class="card-thing vertical" id="the-back"><div id="back-content" class="back">${backTop}<h1 class="back-title">${name}</h1>
  			<div class="uni">${uni}</div>
  			<div class="statement">${statement}</div>
  			${siteDiv}
  			<div class="footer">© 2020 FotoFika</div>
  			</div></div>`
}

function setInstaText(name, deg, uni, statement, site){
  let destination = document.getElementById('insta-text');
  if (site.includes('instagram')){
    if(site.charAt(site.length-1) != '/'){
      site = site+'/'
    }
    let pieces = site.split("/")
    var insta = '@'+pieces[pieces.length - 2];
  } else {
    var insta = ''
  }
  destination.value = `${name}, ${deg}, ${uni} writes:\n"${statement}" ${insta} 
  @2020_allstars @fotofika2020 #2020allstars #fotofika2020 #spenational #centerforcreativephotography`;
}


function cleanImageName(name){
	let cleanerName = name.split(' -')[0];
	let cleanName = cleanerName.toLowerCase();
	return cleanName;
}


function getImgId(element){
	//"gsx$uploadyourfilehere.yourfilemustbeformattedasfollows816x1110pixelsat300ppithismayrequireyoutocropyourimagetofitrgbjpegwhensavinguse12maxforimagequalitypleaseonlyusethefollowingfilenamingrequirementsmithjane.jpgtheprinterusesanautomatedprocessandimagesthatdonotadheretotheseexactspecswillbeeliminate"

  var imgBase = element["gsx$uploadyourfilehere.yourfilemustbeformattedasfollows816x1110pixelsat300ppithismayrequireyoutocropyourimagetofitrgbjpegwhensavinguse12maxforimagequalitypleaseonlyusethefollowingfilenamingrequirementsmithjane.jpgtheprinterusesanautomatedprocessandimagesthatdonotadheretotheseexactspecswillbeeliminate"].$t;
  var equals = imgBase.search("=")+1;
  var id = imgBase.substr(equals);
  return id;
}

//document.querySelector('#replaceButton').addEventListener('click', replaceImage)




//scroll to if has hash

function scrollTo(){
	if(window.location.hash) {
		var element_to_scroll_to = document.querySelectorAll(window.location.hash)[0];
	    element_to_scroll_to.scrollIntoView();

	} 

}


function clickerDL(id, name){
 
  html2canvas(document.querySelector('#'+id), {
        scrollX: 0,
        scrollY: -window.scrollY
      }).then(function(canvas) {
        console.log(canvas);
        saveAs(canvas.toDataURL(), name+'_front.png');
    });
      html2canvas(document.querySelector('#the-back'), {
        scrollX: 0,
        scrollY: -window.scrollY
      }).then(function(canvas) {
        console.log(canvas);
        saveAs(canvas.toDataURL(), name+'_back.png');
    });

  var copyText = document.querySelector("#insta-text");
  copyText.select();
  document.execCommand("copy");
}

function saveCapture(element) {
  html2canvas(element).then(function(canvas) {
    download(canvas.toDataURL("image/png"));
  })
}



function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

function forwardNav(){
  const button = document.querySelector('#plus')
  button.addEventListener("click", function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);     
      if (urlParams.get('id')){
          var size = parseInt(urlParams.get('id'))+1
          var url = new URL(window.location.href);
          var search_params = url.searchParams;
          url.searchParams.set('id', size)
          url.search = search_params.toString()
          var new_url = url.toString();
          location.replace( new_url );
        }

  });
}

// var url = new URL('http://demourl.com/path?id=100&topic=main');
// var search_params = url.searchParams;

// // new value of "id" is set to "101"
// search_params.set('id', '101');

// // change the search property of the main url
// url.search = search_params.toString();

// // the new url string
// var new_url = url.toString();

// // output : http://demourl.com/path?id=101&topic=main
// console.log(new_url);

function backNav(){
  const button = document.querySelector('#minus')
  button.addEventListener("click", function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);     
      if (urlParams.get('id')){
          var size = parseInt(urlParams.get('id'))-1
          var url = new URL(window.location.href);
          var search_params = url.searchParams;
          url.searchParams.set('id', size)
          url.search = search_params.toString()
          var new_url = url.toString();
          location.replace( new_url );
        }

  });
}

forwardNav();
backNav();