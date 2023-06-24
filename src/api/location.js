import { Modal } from 'antd';
import Axios from 'axios';

export const getLocation = async () => {
    return new Promise((resolve, reject) => {
        const hasLocation = retrieveLocationFromLocalStorage();
        if (hasLocation) {
            //add redux log here
            console.info('Location::Location from local storage');
            resolve(hasLocation);
        }
        else {
            console.info('Location::Location from navigator.geolocation.getCurrentPosition');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.info('Location::', position.coords.latitude, position.coords.longitude);
                    let url = `https://us1.locationiq.com/v1/reverse.php?key=pk.dd1a7fd4cfe6090beb9326726b577d1b&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
                    Axios.get(url).then((response) => {
                        console.info('Location::Converting cordinates to address', response.data?.address);
                        saveLocationToLocalStorage(response.data);
                        resolve(response.data);
                    }).catch((error) => {
                        console.log(error);
                        throw (error);
                    })
                }, (error) => {
                    console.error('Location::denied by user');
                    Modal.confirm({
                        title: 'Please Allow Location',
                        content: 'Please allow location to use this website',
                        onOk: () => {
                            getLocation();
                        
                        },
                        onCancel: () => {
                            reject('Geolocation is not supported by this browser.');
                        }
                    })      
                    reject(error);
                });
            } 
        }

    })
}



const saveLocationToLocalStorage = (location) => {
    localStorage.setItem('location', JSON.stringify(location));
}

const retrieveLocationFromLocalStorage = () => {
    let location = localStorage.getItem('location');
    if (location) {
        return JSON.parse(location);
    }
    return null;
}
