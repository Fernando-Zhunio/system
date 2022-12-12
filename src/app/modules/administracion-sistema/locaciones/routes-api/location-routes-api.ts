export const CODE_POSTAL_ROUTE_API = (MAPS_API_KEY, lat, lng) => {
    const latLng = `${lat},${lng}`;
   return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${MAPS_API_KEY}`;
}