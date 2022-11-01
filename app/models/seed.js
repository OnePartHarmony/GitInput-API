const mongoose = require('./connection')
const Product = require('./product')

const db = mongoose.connection

db.on('open', () => {
    const startProducts = [
        {
            name: "General Motors",
            logo: "https://logo.clearbit.com/gm.com",
            domain: "Gm.com",
            description: "The General Motors Company is an American multinational automotive manufacturing company headquartered in Detroit, Michigan, United States."
        },
        {
            name: "Centene",
            logo: "https://logo.clearbit.com/centene.com",
            domain: "Centene.com",
            description: "Centene Corporation is a publicly traded managed care company based in St."
        },
        {
            name: "Meta Platforms",
            logo: "https://logo.clearbit.com/about.meta.com",
            domain: "About.meta.com",
            description: "Discover revolutionary technology from Meta, leading the way in connecting us in business and at home. Shop Meta Quest, Meta Portal, Ray-Ban Stories and accessories."
        },
        {
            name: "Comcast",
            logo: "https://logo.clearbit.com/comcast.com",
            domain: "Comcast.com",
            description: "Comcast Cable Communications, LLC, doing business as Xfinity, is an American telecommunications company and division of Comcast Corporation used to market consumer cable television, internet, telephone, and wireless services provided by the company."
        },
        {
            name: "Phillips 66",
            logo: "https://logo.clearbit.com/phillips66.com",
            domain: "phillips66.com",
            description: "The Phillips 66 Company is an American multinational energy company headquartered in Westchase, Houston, Texas."
        },
        {
            name: "Valero",
            logo: "https://logo.clearbit.com/valero.com",
            domain: "Valero.com",
            description: "Valero Energy Corporation is a Fortune 500 international manufacturer and marketer of transportation fuels, other petrochemical products, and power.."
        },
        {
            name: "Dell",
            logo: "https://logo.clearbit.com/dell.com",
            domain: "Dell.com",
            description: "Dell is an American technology company that develops, sells, repairs, and supports computers and related products and services and is owned by its parent company, Dell Technologies."
        },
        {
            name: "Target",
            logo: "https://logo.clearbit.com/target.com",
            domain: "Target.com",
            description: "Target Corporation is an American big box department store chain headquartered in Minneapolis, Minnesota."
        },
        {
            name: "Fanny Mae",
            logo: "https://logo.clearbit.com/fanniemae.com",
            domain: "Fanniemae.com",
            description: "The Federal National Mortgage Association, commonly known as Fannie Mae, is a United States government-sponsored enterprise and, since 1968, a publicly traded company."
        },
        {
            name: "UPS",
            logo: "https://logo.clearbit.com/ups.com",
            domain: "Ups.com",
            description: "Originally known as the American Messenger Company specializing in telegraphs, UPS has grown to become a Fortune 500 company and one of the world's largest shipping couriers."
        },
        {
            name: "Lowe's",
            logo: "https://logo.clearbit.com/Lowes.com",
            domain: "Lowes.com",
            description: "Lowe's Companies, Inc., often shortened to Lowe's, is an American retail company specializing in home improvement."
        },
        {
            name: "Bank Of America",
            logo: "https://logo.clearbit.com/bankofamerica.com",
            domain: "Bankofamerica.com",
            description: "What would you like the power to do? For you and your family, your business and your community. At Bank of America, our purpose is to help make financial lives better through the power of every connection."
        },

    ]

    Product.deleteMany({})
        .then(deletedProducts => {
            console.log('this is what .deleteMany returns', deletedProducts)

            Product.create(startProducts)
                .then(data => {
                    console.log('here are the newly created products', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})