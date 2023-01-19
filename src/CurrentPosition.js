import style from './CurrentPosition.module.css';

const CurrentPosition = (props) => {

    const getLocation = () => {
        var geo = navigator.geolocation;

        if(geo) {
            geo.getCurrentPosition(function(location) {
                const currentLatitude = location.coords.latitude;
                const currentLongitude = location.coords.longitude;
                console.log(currentLatitude, currentLongitude);
                props.onCurrentLocation(currentLatitude, currentLongitude);
            });
        } else {
            console.log('niedostępny');
        } 
               
    };

    return (<div className={style.currentPosition}>
        <p>Or check the weather from your current position:</p>
        <button onClick={getLocation}>Check the weather in current location</button>
            </div>)
};

export default CurrentPosition;