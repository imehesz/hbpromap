const defaultProfileImgUrl = "https://i.imgur.com/dC0gdIn.jpg"

const HBPRO_DATA = [
	{
    	id: 1,
        name: "Imre Mehesz",
        profileImgUrl: "https://i.imgur.com/prD5oTQ.png",
        location: "Jacksonville, FL",
        social: [
        	{
            	label: "IMstandup.com",
                url: "https://imstandup.com"
            }
        ],
        website: [
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
        website: [
        	{
            	label: "JoelByarsComedy.com",
                url: "JoelByarsComedy.com"
            }
        ],
        social: [
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

function _generateSocialLinks(hbpro) {
    let retval = ""

    // resource
    // https://github.com/edent/SuperTinyIcons

    hbpro.social.map((social) => {
        switch( social.label.toLowerCase() ) {
            case "twitter":
                            retval += `<a target="_blank" class="social-link" href="${ social.url }" title="${ social.url }"><img src="https://camo.githubusercontent.com/9bbddae7e626bda73c943e06b4568a7a02e193b4/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f747769747465722e737667" /></a>`
                            break;

            case "facebook":
                            retval += `<a target="_blank" class="social-link" href="${ social.url }" title="${ social.url }"><img src="https://camo.githubusercontent.com/e6d2040c65e8c6f4da10db72436cf9a1196e43ae/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f66616365626f6f6b2e737667" /></a>`
                            break;

            case "mailchimp":
                            retval += `<a target="_blank" class="social-link" href="${ social.url }" title="${ social.url }"><img src="https://camo.githubusercontent.com/277d0abb1e009ef37af51cca0d98e7e5548beb99/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6d61696c6368696d702e737667" /></a>`
                            break;

            case "insta":
                            retval += `<a target="_blank" class="social-link" href="${ social.url }" title="${ social.url }"><img src="https://camo.githubusercontent.com/68ff38b86f01b428567dcc406116e23728245f4e/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f696e7374616772616d2e737667" /></a>`
                            break;

            case "youtube":
                            retval += `<a target="_blank" class="social-link" href="${ social.url }" title="${ social.url }"><img src="https://camo.githubusercontent.com/0f31a4f7adb78461ca03dfaad4a138eedf0d14e0/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f796f75747562652e737667" /></a>`

                            break;

            default:
                retval += `<a target="_blank" class="social-link" href="${ social.url }" title="${ social.url }"><img src="https://camo.githubusercontent.com/16fa1202696e1ea968f37f2e6a31bd3e118df23d/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f67686f73742e737667"/></a>`
        }
    })

    return retval
}

function _generateHostInfo(hbpro) {
    return  '<div class="is-host">' +
                (( hbpro.hostLive == "Y" || hbpro.hostOnline == "Y" ) ? '<span>Hosting:</span>' : '') +
                (( hbpro.hostLive == "Y" ) ? '<span class="bullet bullet__live">LIVE</span>' : '') +
                (( hbpro.hostOnline == "Y" ) ? '<span class="bullet bullet__online">ONLINE</span>' : '') +
            '</div>'
}

function getHbProInfo(hbpro) {
    let socialLinks = _generateSocialLinks(hbpro)
    let hostInfo = _generateHostInfo(hbpro)

	return `
			<div class="hbpro">
                <div class="hbpro-headshot">
                    <img src="${ hbpro.profileImgUrl }"/>
                </div>
                <div class="hbpro-info">
                    <strong>${ hbpro.name }</strong>

                    ${ hostInfo }

                    ${ hbpro.location }<br />
                    <a target="_blank" href="${ hbpro.website.url }">${ hbpro.website.label }</a><br />
                    ${ socialLinks }
                </div>
            </div>
    `
}

function moveMarker(hbpro) {
    map.flyTo([hbpro.lat, hbpro.lng])
    marker._popup.setContent(getHbProInfo(hbpro))
    marker.setLatLng([hbpro.lat, hbpro.lng]).update()
}

function initMap(hbproData) {
    if(!hbproData) hbproData = HBPRO_DATA

    // get random pro from data
    let hbpro = hbproData[getRandomInt(hbproData.length)]

    // center of the map
    var center = [hbpro.lat, hbpro.lng];
    // Create the map
    map = L.map('osmap').setView(center, 5);

    // Set up the OSM layer
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map)

    marker = L.marker(center).addTo(map)
        .bindPopup(getHbProInfo(hbpro))
        .openPopup();

    setInterval(() => {
        hbpro = hbproData[getRandomInt(hbproData.length)]
        moveMarker(hbpro)
    }, 6000)

    // add a marker in the given location
    //L.marker(center).addTo(map);
}
