const { City } = require('../models/index');

class CityRepository{


    async createCity ({ name }){
        try {
            const city = await City.create({
                name
            });
            return city;
        } catch (error) {
           console.log("Something went wrong in repository layer ");
           throw {error};

        }
    }

    async deleteCity(cityId){
        try {
            await City.destroy({
                where : {
                    id: cityId

                }
            });
            return true;
            
        } catch (error) {
            console.log("Something went wrong in repository layer ");
            throw {error};
        }
    }
    
    async updateCity(cityId,data) {
        try {
            //The below approach also works but not return updated object
            //if we are using PgSql then returning true can be used else not
            // const city = await City.update(data, {
            //     where : {
            //         id: cityId
            //     },
               
            // })

            //for getting updated data in mysql we use the below approach
            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        } catch (error) {
            console.log("Something went wrong in repository layer ");
            throw {error};
        }
          
    }

    async getCity(cityId) {
        try {
            const city  = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in repository layer ");
            throw {error};
        }
    }

    async getAllCities () {
        try {
            const cities = await City.findAll();
            return cities;
        } catch (error) {
            
        }
    }
     
}


module.exports = CityRepository;