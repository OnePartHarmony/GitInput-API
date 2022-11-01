
const mongoose = require('mongoose')
const Company = require('./company')


const db = mongoose.connection

const startCompanies = [
    {
        name: 'Walmart',
        logo: 'https://logo.clearbit.com/walmart.com',
        domain: 'walmart.com', 
        description: 'Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores from the United States, headquartered in Bentonville, Arkansas.'
    },
    {
        name: 'Amazon',
        logo: 'https://logo.clearbit.com/amazon.com',
        domain: 'amazon.com', 
        description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.'
    },
    {
        name: 'Apple',
        logo: 'https://logo.clearbit.com/apple.com',
        domain: 'apple.com', 
        description: '0090 Apple Inc. is an American multinational technology company specializing in consumer electronics, software and online services headquartered in Cupertino, California, United States.'
    },
    {
        name: 'CVS Pharmacy',
        logo: 'https://logo.clearbit.com/cvs.com',
        domain: 'cvs.com', 
        description: 'CVS Pharmacy, Inc. is an American retail corporation.'
    },
    {
        name: 'UnitedHealthcare',
        logo: 'https://logo.clearbit.com/uhc.com',
        domain: 'uhc.com', 
        description: 'UnitedHealth Group Incorporated is an American multinational managed healthcare and insurance company based in Minnetonka, Minnesota.'
    },
    {
        name: 'ExxonMobil',
        logo: 'https://logo.clearbit.com/exxon.com',
        domain: 'exxon.com', 
        description: 'ExxonMobil Corporation is an American multinational oil and gas corporation headquartered in Irving, Texas.'
    },
    {
        name: 'Berkshire Hathaway',
        logo: 'https://logo.clearbit.com/berkshirehathaway.com',
        domain: 'berkshirehathaway.com', 
        description: 'Berkshire Hathaway Inc. is an American multinational conglomerate holding company headquartered in Omaha, Nebraska, United States.'
    },
    {
        name: 'Google',
        logo: 'https://logo.clearbit.com/google.com',
        domain: 'google.com', 
        description: 'Google LLC is an American multinational technology company that focuses on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.'
    },
    {
        name: 'McKesson Corporation',
        logo: 'https://logo.clearbit.com/mckesson.com',
        domain: 'mckesson.com', 
        description: 'McKesson Corporation is an American company distributing pharmaceuticals and providing health information technology, medical supplies, and care management tools.'
    },        
    {
        name: 'AmerisourceBergen Corporation',
        logo: 'https://logo.clearbit.com/amerisourcebergen.com',
        domain: 'amerisourcebergen.com', 
        description: 'AmerisourceBergen Corporation is an American drug wholesale company that was formed by the merger of Bergen Brunswig and AmeriSource in 2001.'
    },
    {
        name: 'Microsoft',
        logo: 'https://logo.clearbit.com/microsoft.com',
        domain: 'microsoft.com', 
        description: 'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services headquartered at the Microsoft Redmond campus located in Redmond, Washington.'
    },
    {
        name: 'Costco Wholesale',
        logo: 'https://logo.clearbit.com/costco.com',
        domain: 'costco.com', 
        description: 'Costco Wholesale Corporation is an American multinational corporation which operates a chain of membership-only big-box retail stores.'
    },
    {
        name: 'Cigna',
        logo: 'https://logo.clearbit.com/homedepot.com',
        domain: 'cigna.com', 
        description: 'Walgreen Company, d/b/a Walgreens, is an American company that operates the second-largest pharmacy store chain in the United States behind CVS Health.'
    },
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
    {
	name: "Prudential Financial",
	logo: "https://logo.clearbit.com/prudential.com",
	domain: "prudential.com",
	description: "Prudential Financial, Inc. is an American Fortune Global 500 and Fortune 500 company whose subsidiaries provide insurance, retirement planning, investment management, and other products and services to both retail and institutional customers throughout..."
},
{
	name: "The Walt Disney Company",
	logo: "https://logo.clearbit.com/disneycareers.com",
	domain: "disneycareers.com",
	description: "The Walt Disney Company, commonly known as Disney, is an American multinational mass media and entertainment conglomerate headquartered at the Walt Disney Studios complex in Burbank, California."
},
{
	name: "Disney+"
	logo: "https://logo.clearbit.com/disneyplus.com",
	domain: "disneyplus.com",
	description: "Disney+ is the home for your favorite movies and TV shows from Disney, Pixar, Marvel, Star Wars, and National Geographic. Sign up for Disney+ and start streaming today."
},
{
	name: "Lockheed Martin",
	logo: "https://logo.clearbit.com/lmco.com",
	domain: "lmco.com",
	description: "Lockheed Martin Corporation is an American aerospace, arms, defense, information security, and technology corporation with worldwide interests."
},
{
	name: "Raytheon Technologies",
	logo: "https://logo.clearbit.com/rtx.com",
	domain: "rtx.com",
	description: "Raytheon Technologies Corporation is an American multinational aerospace and defense conglomerate headquartered in Arlington, Virginia."
},
{
	name: "General Assembly",
	logo: "https://logo.clearbit.com/generalassemb.ly",
	domain: "generalassemb.ly",
	description: "General Assembly is a private, for-profit education organization founded by CEO Jake Schwartz, Adam Pritzker, Matthew Brimer, and Brad Hargreaves in early 2011."
},
{
	name: "HP",
	logo: "https://logo.clearbit.com/hp.com",
	domain: "hp.com",
	description: "We are a technology company born of the belief that companies should do more than just make a profit. They should make the world a better place."
},
{
	name: "Boeing",
	logo: "https://logo.clearbit.com/boeing.com",
	domain: "boeing.com",
	description: "The Boeing Company is an American multinational corporation that designs, manufactures, and sells airplanes, rotorcraft, rockets, satellites, telecommunications equipment, and missiles worldwide."
},
{
	name:  "HCA Healthcare",
	logo: "https://logo.clearbit.com/hcahealthcare.com",
	domain: "hcahealthcare.com",
	description: "HCA Healthcare is an American for-profit operator of health care facilities that was founded in 1968."
},
{
	name: "Tesla",
	logo: "https://logo.clearbit.com/tesla.com",
	domain: "tesla.com",
	description: "Tesla is accelerating the world's transition to sustainable energy with electric cars, solar and integrated renewable energy solutions for homes and businesses."
},
]

db.on('open', () => {
  Company.deleteMany()
    .then(() => {
      Company.create(startCompanies)
        .then(() => db.close())
        .catch(err => {
          console.error(err)
          db.close()
        })
    })
    .catch(err => {
      console.error(err)
      db.close()
    })
})