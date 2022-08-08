
const { usersTrail } = require('../../routes/api/trailRoutes.js')



// //for loop
//         for (let i = 0; i < 10; i++) {

//             //get users trail from database
//             usersTrail = exportedUsersTrail
//             //change trails into users trail (what the users have in the users table)
//             console.log(usersTrail[i].latitude);
//             console.log(usersTrail[i].latitude);
//             console.log(usersTrail[i].trail_name);
//             console.log('-----------------------')
//         }

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: new google.maps.LatLng(46.842129529, -120.533516407),
    mapTypeId: "roadmap",
  });
  google.maps.event.addListener(map, "click", function (event) {
    //add marker
    addMarker({ coords: event.latLng });
    console.log({ coords: event.latLng });
  });


  // trail array
  const trailArray = [{
    coords: { lat: 47.6806854, lng: -122.9923121 },
    iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content: '<h1>Ranger Hole!<h1>',
  },
  {
    coords: { lat: 48.141348501, lng: -123.190475106 },

  },
  {
    coords: { lat: 48.141333333, lng: -123.189916667 },
  },
  {
    coords: { lat: 47.409284754, lng: -121.602258682 },

  },
  ];

  function addMarker(props) {
    var testMarker = new google.maps.Marker({
      position: props.coords,
      map: map,
      //icon: props.iconImage,
    });
    if (props.iconImage) {
      testMarker.setIcon(props.iconImage);
    }

    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      testMarker.addListener("click", function () {
        infoWindow.open(map, testMarker);
      });
    }
    //Loop through trail array and add markers to map
    for (var i = 0; i < trailArray.length; i++) {
      addMarker(trailArray[i]);

    }



  }
}






window.initMap = initMap;




