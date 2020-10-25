const defaultProfileImgUrl = "https://i.imgur.com/dC0gdIn.jpg"

const HBPRO_DATA = [
	{
    	id: 1,
        name: "Imre Mehesz",
        profileImgUrl: "https://i.imgur.com/prD5oTQ.png",
        location: "Jacksonville, FL",
        contact: [
        	{
            	label: "IMstandup.com",
                url: "https://imstandup.com"
            }
        ],
        lng: 19.0402,
        lat: 47.4979
    },

    {
    	id: 2,
        name: "Joel Byars",
        profileImgUrl: "https://i.imgur.com/oEuAlc6.png",
        location: "Atlanta, GA",
        contact: [
        	{
            	label: "JoelByarsComedy.com",
                url: "JoelByarsComedy.com"
            }
        ],
        lng: -84.386330,
        lat: 33.753746
    }
]


var map, marker, infoWindow

function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
}

function getHbProInfo(hbpro) {
	return `
			<div class="hbpro">
                <div class="hbpro-headshot">
                    <img src="${ hbpro.profileImgUrl }"/>
                </div>
                <div class="hbpro-info">
                    <strong>${ hbpro.name }</strong><br />
                    ${ hbpro.location }<br />
                    <a href="${ hbpro.contact[0].url }">${ hbpro.contact[0].label }</a><br />
                </div>
            </div>
    `
}

function initMap() {
    // center of the map
    var center = [HBPRO_DATA[0].lat, HBPRO_DATA[0].lng];
    // Create the map
    var map = L.map('osmap').setView(center, 3);

    // Set up the OSM layer
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map)

    marker = L.marker(center).addTo(map)
        .bindPopup(getHbProInfo(HBPRO_DATA[0]))
        .openPopup();


    setTimeout(() => {
        marker.setLatLng([HBPRO_DATA[1].lat, HBPRO_DATA[1].lng]).update();
    }, 3000)

    // add a marker in the given location
    //L.marker(center).addTo(map);
}
