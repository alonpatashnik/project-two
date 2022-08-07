
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: new google.maps.LatLng(46.842129529, -120.533516407),
    mapTypeId: "roadmap",
  });
  google.maps.event.addListener(map, "click", function(event) {
    //add marker
    addMarker({coords: event.latLng});
    console.log({coords: event.latLng});
  } );


  // trail array

  var trailArray = [
    {
      coords:{lat: 47.6806854, lng: -122.9923121},
      iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content: '<h1>Ranger Hole!<h1>',
    },
    {
      coords:{lat: 48.141348501, lng: -123.190475106},
      
    },
    {
      coords:{lat: 48.141333333, lng: -123.189916667},
    },
    {
      coords:{lat: 47.409284754, lng: -121.602258682},
      
    },


  ];
  
  //Loop through trail array and add markers to map
  for(var i = 0; i < trailArray.length; i++){
    addMarker(trailArray[i]);

  }
}

function addMarker(props){
    var testMarker = new google.maps.Marker({
      position: props.coords,
      map: map,
      //icon: props.iconImage,
    });
    if(props.iconImage){
      testMarker.setIcon(props.iconImage);
    }

    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      testMarker.addListener("click", function () {
        infoWindow.open(map, testMarker);
      });
  }

}


addMarker();  // addMarker function is called here



window.initMap = initMap;



  // var testMarker = new google.maps.Marker({
  //   position: { lat: 47.6806854, lng: -122.9923121 },
  //   map: map,
  //   icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',


  // });


  //add marker function 
  // addMarker({
  //   coords:{lat: 47.6806854, lng: -122.9923121},
  //   iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //   content: '<h1>Ranger Hole!<h1>',
  // });
  // addMarker({
  //   coords:{lat: 48.141333333, lng: -123.189916667},
  // });
  // addMarker({
  //   coords:{lat: 48.141348501, lng: -123.190475106},
    
  // });




// to add custom icons to the map to be updated
  // const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
  // const icons = {
  //   parking: {
  //     name: "Parking",
  //     icon: iconBase + "parking_lot_maps.png",
  //   },
  //   library: {
  //     name: "Library",
  //     icon: iconBase + "library_maps.png",
  //   },
  //   info: {
  //     name: "Info",
  //     icon: iconBase + "info-i_maps.png",
  //   },
  // };
  // map.data.loadGeoJson("/seeds/trails.json");


  // Create a <script> tag and set the USGS URL as the source.
  //const script = document.createElement("script");

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//   script.src ="../../seeds/trails.json";
//   document.getElementsByTagName("trail_name")[3].appendChild(script);
// }

// Loop through the results array and place a marker for each
// set of coordinates.
// const eqfeed_callback = function (results) {
//   for (let i = 0; i < results.features.length; i++) {
//     const coords = results.features[i].geometry.coordinates;
//     const latLng = new google.maps.LatLng(coords[1], coords[0]);

//     new google.maps.Marker({
//       position: latLng,
//       map: map,
//     });
//     return coords
//   }
// };


  
  // trying to get trails.json or trails from backend to front end
  // const features = coords.id;

  // // to add a feature for each trail in the database
  // features.forEach((feature) => {
  //   new google.maps.Marker({
  //     position: feature.position,
  //     icon: icons[feature.type].icon,
  //     map: map,
  //   });
  // });

  // const legend = document.getElementById("#map");

  // for (const key in icons) {
  //   const type = icons[key];
  //   const name = type.name;
  //   const icon = type.icon;
  //   const div = document.createElement("div");

  //   div.innerHTML = '<img src="' + icon + '"> ' + name;
  //   legend.appendChild(div);
  // }

  //map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);






// console.log("mapScript.js loaded");
// function initMap() {


//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 7,
//         center: zigZagLake,
//     });



// }

// window.initMap = initMap;








    // The location of Uluru
   // const zigZagLake = { lat: 45.846433333, lng: -122.111166667, };
    // The map, centered at Zig Zag Lake

    // const trails = Trail.findAll();
    // console.log(trails);

    
// });
// //const image = "https://cdn-icons-png.flaticon.com/512/1160/1160358.png";
// // The marker, positioned at Zig Zag Lake
// const marker = new google.maps.Marker({
//     position: zigZagLake,
//     map: map,
//     // icon: image,
// });