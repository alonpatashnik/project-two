
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: new google.maps.LatLng(48.5149657, -120.7354966),
    mapTypeId: "roadmap",
  });

  const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
  const icons = {
    parking: {
      name: "Parking",
      icon: iconBase + "parking_lot_maps.png",
    },
    library: {
      name: "Library",
      icon: iconBase + "library_maps.png",
    },
    info: {
      name: "Info",
      icon: iconBase + "info-i_maps.png",
    },
  };
  const features = [ Trail
   
  ];

  features.forEach((feature) => {
    new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map,
    });
  });

  const legend = document.getElementById("legend");

  for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");

    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

window.initMap = initMap;
















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