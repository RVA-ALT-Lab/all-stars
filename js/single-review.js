var spreadsheetID = "146sZdCGPEUx3mGzoO8wlLupQfK2I9_me82dsgfw7ryM"; // Make sure it is published to the web
var dataURL = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID +"/1/public/values?alt=json";

//https://spreadsheets.google.com/feeds/list/146sZdCGPEUx3mGzoO8wlLupQfK2I9_me82dsgfw7ryM/1/public/values?alt=json

//set some variables
var cards = [];

//get the data
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
              makeForm(element);

          }
        })
      }
      document.getElementById('single-card').innerHTML = cards.join("");
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
        let random = Math.floor(Math.random() * 8) + 1;
        return `<div id="${fileName}">
                  <a href="#${fileName}">
                    <div class="single-front" style="background-image:url(imgs/bc-0${random}.png),url(work/${fileName}.jpg)"></div>
                  </a>
                </div>${makeBack(element)}`
    //  background-image: url(img_flwr.gif), url(paper.gif);

        //return '<div class="flip-container"><div class="flipper"><div class="front"><img src="data:image/jpeg;base64,'+img+'"/></div>'+makeBack(element)+'</div></div>'
}


function makeBack(element){
  const name = element.gsx$yournameasyouwouldlikeittoappear.$t;
  const deg = element.gsx$mfabfabainphotography.$t;
  const uni = element.gsx$youruniversitycollegenamepleasebesuretousetheofficialname.$t;
  const statement = element.gsx$onesentence140charactersmaxaboutyourawesomeaboutyouyourimageoryourwork.$t;
  const site = element["gsx$websiteurltwitterurlinstagramurl-pleaseonlyprovideone."].$t;
  const backTop = 
  `<div class="back-top">
    <div class="grad">
      <div class="deg">${deg}</div>
      <div class="year">2020</div>
    </div>
    <div class="star"></div>
    </div>`;
  return `<div class="single-back">${backTop}<h1 class="back-title">${name}</h1>
        <div class="uni">${uni}</div>
        <div class="statement">${statement}</div>
        <div class="site"><a target="_blank" href="${site}">More work from ${name}</a></div>
        <div class="footer">© 2020 FotoFika</div>
        </div>`
}


function makeForm(element){
  let name = element.gsx$yournameasyouwouldlikeittoappear.$t;
  let form = document.querySelector('iframe');
  form.src = 'https://docs.google.com/forms/d/e/1FAIpQLSffa3hhQEqIPDvSSj6kgWzF83v8K8ZydKi0V26BvaQg3HG7uA/viewform?embedded=true&usp=pp_url&entry.678498904='+name;
}


function cleanImageName(name){
  let cleanerName = name.split(' -')[0];
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
