const clientId = '2X1NBlmleF6VHCMbTfHvYw';
const secret =
  'ZqzkZTb064XnIkVheuT9VYQO5YDMddHimZAxKdsmCF4aFxfdy3ffnZ81tspe96cd';
let accessToken = '';

const Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${
        clientId
      }&client_secret=${secret}`,
      { method: 'POST' }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to get access token');
      })
      .then(jsonResponse => {
        accessToken = jsonResponse.access_token;
      });
  },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${
          term
        }&location=${location}&sort_by=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Search request failed');
        })
        .then(jsonResponse => {
          if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zipCode,
                category: business.categories.title,
                rating: business.rating,
                reviewCount: business.review_count,
              };
            });
          }
        });
    });
  },
};

export default Yelp;
