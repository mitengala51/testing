function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
    const altitudeOutput = document.querySelector("#altitude");

    mapLink.href = "";
    mapLink.textContent = "";
    altitudeOutput.textContent = "";

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = "";
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        // Fetch altitude data from Open Elevation API
        const url = `https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const altitude = data.results[0].elevation;
                altitudeOutput.textContent = `Altitude: ${altitude} meters`;
            })
            .catch(error => {
                console.error("Error fetching altitude:", error);
                altitudeOutput.textContent = "Unable to retrieve altitude data";
            });
    }

    function error() {
        status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
