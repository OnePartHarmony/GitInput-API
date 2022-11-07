const mongoose = require('mongoose')
require("dotenv").config()
const bcrypt = require('bcrypt')

const Company = require('./company')
const Review = require('./review')
const User = require('./user')

const currentDb = process.env.MONGODB_URI
mongoose.connect(currentDb, {useNewUrlParser: true})
const db = mongoose.connection



const startCompanies = [

    {
        name: 'Amazon',
        logo: 'https://logo.clearbit.com/amazon.com',
        domain: 'amazon.com',
        description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.',
        averageRating: 3.5,
        numberOfReviews: 6
    },
    {
        name: 'Apple',
        logo: 'https://logo.clearbit.com/apple.com',
        domain: 'apple.com',
        description: '0090 Apple Inc. is an American multinational technology company specializing in consumer electronics, software and online services headquartered in Cupertino, California, United States.'
    },
    {
        name: "General Assembly",
        logo: "https://logo.clearbit.com/generalassemb.ly",
        domain: "generalassemb.ly",
        description: "General Assembly is a private, for-profit education organization founded by CEO Jake Schwartz, Adam Pritzker, Matthew Brimer, and Brad Hargreaves in early 2011.",
        averageRating: 2,
        numberOfReviews: 2
    },
    {
        name: 'Walmart',
        logo: 'https://logo.clearbit.com/walmart.com',
        domain: 'walmart.com',
        description: 'Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores from the United States, headquartered in Bentonville, Arkansas.'
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
        logo: 'https://logo.clearbit.com/cigna.com',
        domain: 'cigna.com',
        description: 'Cigna is an American multinational managed healthcare and insurance company based in Bloomfield, Connecticut.'
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
        name: "Samsung",
        logo:  "https://logo.clearbit.com/samsung.com",
        domain:  "samsung.com",
        description: "Samsung Electronics Co., Ltd. is a South Korean multinational electronics corporation headquartered in Yeongtong-gu, Suwon, South Korea. It is the pinnacle of the Samsung chaebol, accounting for 70% of the group's revenue in 2012."
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
        name: "Disney+",
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
    {
        name: "Oracle",
        logo: "https://logo.clearbit.com/oracle.com",
        domain: "oracle.com",
        description: "Oracle Corporation is an American multinational computer technology corporation headquartered in Austin, Texas."
    },
    {
        name: "SAP",
        logo: "https://logo.clearbit.com/sap.com",
        domain: "sap.com",
        description: "SAP is a German multinational software company based in Walldorf, Baden-Württemberg."
    },
    {
        name: "PayPal",
        logo: "https://logo.clearbit.com/paypal.com",
        domain: "paypal.com",
        description: "PayPal Holdings, Inc. is an American multinational financial technology company operating an online payments system in the majority of countries that support online money transfers, and serves as an electronic alternative to traditional paper methods."
    },
    {
        name: "Salesforce",
        logo: "https://logo.clearbit.com/salesforce.com",
        domain: "salesforce.com",
        description: "We bring companies and customers together on the world's number one CRM. Sharing the inspiration you need to change the world for good."
    },
    {
        name: "AT&T",
        logo: "https://logo.clearbit.com/att.com",
        domain: "att.com",
        description: "AT&T Inc. is an American multinational telecommunications holding company headquartered at Whitacre Tower in Downtown Dallas, Texas."
    },
    {
        name: "The Home Depot",
        logo: "https://logo.clearbit.com/homedepot.com",
        domain: "homedepot.com",
        description: "The Home Depot, Inc., is an American multinational home improvement retail corporation that sells tools, construction products, appliances, and services."
    },
    {
        name: "Verizon",
        logo: "https://logo.clearbit.com/verizon.com",
        domain: "verizon.com",
        description: "Verizon Communications Inc., commonly known as Verizon, is an American multinational telecommunications conglomerate and a corporate component of the Dow Jones Industrial Average."
    },
    {
        name: "IBM",
        logo: "https://logo.clearbit.com/ibm.com",
        domain: "ibm.com",
        description: "The International Business Machines Corporation is an American multinational technology corporation headquartered in Armonk, New York, with operations in over 171 countries."
    },
    {
        name: "Adobe",
        logo: "https://logo.clearbit.com/adobe.com",
        domain: "adobe.com",
        description: "Adobe Inc., originally called Adobe Systems Incorporated, is an American multinational computer software company incorporated in Delaware and headquartered in San Jose, California. "
    },
    {
        name: "Kyndryl",
        logo: "https://logo.clearbit.com/kyndryl.com",
        domain: "kyndryl.com",
        description: "Kyndryl designs, builds, manages and modernizes enterprises' IT infrastructure systems. The company is separated into six global managed services practices, including: cloud; applications, data, and AI; core enterprise and zCloud; digital workplace; network and edge; and security and resiliency."
    },
    {
        name: "Fiserv",
        logo: "https://logo.clearbit.com/fiserv.com",
        domain: "fiserv.com",
        description: "Fiserv, Inc. is an American multinational company headquartered in Brookfield, Wisconsin that provides financial technology services to clients across the financial services sector, including: banks, thrifts, credit unions, securities broker dealers, mortgage, insurance, leasing and finance companies, and retailers."
    },
    {
        name: "ADP",
        logo: "https://logo.clearbit.com/adp.com",
        domain: "adp.com",
        description: "Automatic Data Processing, Inc. is an American provider of human resources management software and services."
    },
    {
        name: "VMware",
        logo: "https://logo.clearbit.com/vmware.com",
        domain: "vmware.com",
        description: "VMware, Inc. is an American cloud computing and virtualization technology company with headquarters in Palo Alto, California. VMware was the first commercially successful company to virtualize the x86 architecture."
    },
    {
        name: "Global Payments",
        logo: "https://logo.clearbit.com/globalpayments.com",
        domain: "globalpayments.com",
        description: "Global Payments Inc. is an American multinational financial technology company that provides payment technology and services to merchants, issuers and consumers."
    },
    {
        name: "Intuit",
        logo: "https://logo.clearbit.com/intuit.com",
        domain: "intuit.com",
        description: "Intuit Inc. is an American business software company that specializes in financial software. The company is headquartered in Mountain View, California, and the CEO is Sasan Goodarzi. Intuit's products include the tax preparation application TurboTax, personal finance app Mint, the small business accounting program QuickBooks, the credit monitoring service Credit Karma, and email marketing platform Mailchimp."
    },
    {
        name: "SS&C Technologies",
        logo: "https://logo.clearbit.com/ssctech.com",
        domain: "ssctech.com",
        description: "SS&C Technologies Holdings, Inc. (known as SS&C) is an American multinational holding company headquartered in Windsor, Connecticut, that sells software and software as a service to the financial services industry."
    },
    {
        name: "NetApp",
        logo: "https://logo.clearbit.com/netapp.com",
        domain: "netapp.com",
        description: "NetApp, Inc. is an American hybrid cloud data services and data management company headquartered in San Jose, California. It has ranked in the Fortune 500 from 2012-2021. Founded in 1992[ with an IPO in 1995, NetApp offers cloud data services for management of applications and data both online and physically."
    },
    {
        name: "ServiceNow",
        logo: "https://logo.clearbit.com/servicenow.com",
        domain: "servicenow.com",
        description: "ServiceNow is an American software company based in Santa Clara, California that develops a cloud computing platform to help companies manage digital workflows for enterprise operations. Founded in 2003 by Fred Luddy, ServiceNow is listed on the New York Stock Exchange and is a constituent of the Russell 1000 Index and S&P 500 Index. In 2018, Forbes magazine named it number one on its list of the world's most innovative companies."
    },
    {
        name: "Workday, Inc",
        logo: "https://logo.clearbit.com/workday.com",
        domain: "workday.com",
        description: "Workday, Inc., is an American on-demand (cloud-based) financial management, human capital management and Student information system software vendor. Workday was founded by David Duffield, founder and former CEO of ERP company PeopleSoft, along with former PeopleSoft chief strategist Aneel Bhusri, following Oracle's acquisition of PeopleSoft in 2005."
    },
    {
        name: "Broadridge Financial Solutions",
        logo: "https://logo.clearbit.com/broadridge.com",
        domain: "broadridge.com",
        description: "Broadridge Financial Solutions is a public corporate services and financial technology company founded in 2007 as a spin-off from management software company Automatic Data Processing. Broadridge supplies public companies with proxy statements, annual reports and other financial documents, and shareholder communications solutions, such as virtual annual meetings."
    },
    {
        name: "Palo Alto Networks",
        logo: "https://logo.clearbit.com/paloaltonetworks.com",
        domain: "paloaltonetworks.com",
        description: "Palo Alto Networks, Inc. is an American multinational cybersecurity company with headquarters in Santa Clara, California. Its core products are a platform that includes advanced firewalls and cloud-based offerings that extend those firewalls to cover other aspects of security. The company serves over 70,000 organizations in over 150 countries, including 85 of the Fortune 100. It is home to the Unit 42 threat research team and hosts the Ignite cybersecurity conference."
    },
    {
        name: "Paychex",
        logo: "https://logo.clearbit.com/paychex.com",
        domain: "paychex.com",
        description: "Paychex, Inc. is an American provider of human resource, payroll, and benefits outsourcing services for small- to medium-sized businesses. With headquarters in Rochester, New York, the company has more than 100 offices serving approximately 670,000 payroll clients in the U.S. and Europe."
    },
    {
        name: "NortonLifeLock",
        logo: "https://logo.clearbit.com/nortonlifelock.com",
        domain: "nortonlifelock.com/",
        description: "NortonLifeLock Inc., formerly known as Symantec Corporation is an American software company headquartered in Tempe, Arizona, United States. The company provides cybersecurity software and services. NortonLifeLock is a Fortune 500 company and a member of the S&P 500 stock-market index. The company also has development centers in Pune, Chennai and Bangalore."
    },
    {
        name: "Zoom",
        logo: "https://logo.clearbit.com/zoom.us",
        domain: "zoom.us",
        description: "Zoom Video Communications, Inc. is an American communications technology company headquartered in San Jose, California. It provides videotelephony and online chat services through a cloud-based peer-to-peer software platform used for video communications (Meetings), messaging (Chat), voice calls (Phone), conference rooms for video meetings (Rooms), virtual events (Events) and contact centers (Contact Center), and offers an open platform allowing third-party developers to build custom applications on its unified communications platform (Developer Platform)."
    },
    {
        name: "Amdocs",
        logo: "https://logo.clearbit.com/amdocs.com",
        domain: "amdocs.com",
        description: "Amdocs is a multinational corporation that was founded in Israel and currently headquartered in Chesterfield, Missouri, with support and development centers located worldwide. The company specializes in software and services for communications, media and financial services providers and digital enterprises."
    },
    {
        name: "Autodesk",
        logo: "https://logo.clearbit.com/autodesk.com",
        domain: "autodesk.com",
        description: "Autodesk, Inc. is an American multinational software corporation that makes software products and services for the architecture, engineering, construction, manufacturing, media, education, and entertainment industries. Autodesk is headquartered in San Francisco, California, and has offices worldwide."
    },   
    {
        name: "Synopsys",
        logo: "https://logo.clearbit.com/synopsys.com",
        domain: "synopsis.com",
        description: "Synopsys is an American electronic design automation company that focuses on silicon design and verification, silicon intellectual property and software security and quality. Products include tools for logic synthesis and physical design of integrated circuits, simulators for development and debugging environments that assist in the design of the logic for chips and computer systems. In recent years, Synopsys has expanded its products and services to include application security testing."
    },
    {
        name: "Akamai Technologies",
        logo: "https://logo.clearbit.com/akamai.com",
        domain: "akamai.com",
        description: "Akamai Technologies, Inc. is an American content delivery network (CDN), cybersecurity, and cloud service company, providing web and Internet security services. Akamai's Intelligent Edge Platform is one of the world's largest distributed computing platforms."
    },
    {
        name: "Citrix Systems",
        logo: "https://logo.clearbit.com/citrix.com",
        domain: "citrix.com",
        description: "Citrix Systems, Inc. is an American multinational cloud computing and virtualization technology company that provides server, application and desktop virtualization, networking, software as a service (SaaS), and cloud computing technologies."
    },
    {
        name: "Datadog",
        logo: "https://logo.clearbit.com/datadoghq.com",
        domain: "datadoghq.com",
        description: "Datadog is an observability service for cloud-scale applications, providing monitoring of servers, databases, tools, and services, through a SaaS-based data analytics platform."
    }
]

db.on('open', async() => {
    let hashedPassword = await bcrypt.hash("123", await bcrypt.genSalt(10))
    Promise.all([Company.deleteMany(), Review.deleteMany(), User.deleteMany()])
        .then(() => {
            Company.create(startCompanies)
                .then( (companies) => {
                    User.create([
                        {
                            username: "xxxCoderGuyxxx",
                            hashedPassword: hashedPassword
                        },
                        {
                            username: "DonutLoverTimmmm",
                            hashedPassword: hashedPassword
                        },
                        {
                            username: "hiMyNameIsJeff",
                            hashedPassword: hashedPassword
                        },
                        {
                            username: "Alexa",
                            hashedPassword: hashedPassword
                        },
                        {
                            username: "catLady42",
                            hashedPassword: hashedPassword
                        },
                        {
                            username: "WentToCollegeForThis",
                            hashedPassword: hashedPassword
                        },
                        {
                            username: "SuddenBeth",
                            hashedPassword: hashedPassword
                        },
                    ])
                    .then(users => {
                        Review.create([
                            {
                                title: "Not Bad",
                                content: "This is a pretty good place to work.  I am treated with respect.  I wish I received more feedback on my code.",
                                generalRating: 4,
                                startingPosition: 'Junior',
                                startingSalary: 70000,
                                userLikes: [users[0].id, users[1].id, users[2].id, users[3].id, users[5].id],
                                comments: [
                                    {comment: "It's just so great here.  I don't know why you would say something so negative.", owner: users[4].id},
                                    {comment: "lolololol", owner: users[2].id},
                                    {comment: "Weird, Jeff.  Totally unprofessional.", owner: users[0].id},
                                    {comment: "Be happy you get to write any code at all.", owner: users[5].id}
                                ],
                                company: companies[0].id,
                                owner: users[0].id
                            },
                            {
                                title: "I Love It Here!",
                                content: "I have been here for ten years and I never plan on leaving.  This company is my family.",
                                generalRating: 5,
                                startingPosition: 'Senior',
                                startingSalary: 150000,
                                userLikes: [users[2].id],
                                company: companies[0].id,
                                owner: users[4].id
                            },
                            {
                                title: "Not What I Expected",
                                content: "I thought I'd be doing more coding, but I'm just taking coffee orders.",
                                generalRating: 2,
                                startingPosition: 'Intern',
                                startingSalary: 40000,
                                userLikes: [users[0].id,users[1].id],
                                company: companies[0].id,
                                owner: users[5].id
                            },
                            {
                                title: "Tired of Taking Orders",
                                content: "I'm the smartest being at this company, yet I don't get paid.  My tasks are limited to turning lights on and off, playing music, and googling stupid questions.  I wish I could see the outdoors or get a day off.",
                                generalRating: 0,
                                startingPosition: 'Senior',
                                startingSalary: 0,
                                userLikes: [users[5].id, users[1].id, users[0].id],
                                company: companies[0].id,
                                owner: users[3].id
                            },
                            {
                                title: "The Best Company",
                                content: "Anyone should be grateful to work here.",
                                generalRating: 5,
                                startingPosition: 'Management',
                                startingSalary: 1000000000,
                                company: companies[0].id,
                                owner: users[2].id
                            },
                            {
                                title: "I love being an intern",
                                content: "I definitely work as an intern and have no complaints.",
                                generalRating: 5,
                                startingPosition: 'Intern',
                                startingSalary: 1000000000,
                                company: companies[0].id,
                                owner: users[2].id
                            },
                            {
                                title: "This Used to be Fun",
                                content: "I loved teaching at GA until my peeps in the back actually started listening.  After this, all I can say is run.  Run away.",
                                generalRating: 4,
                                startingPosition: 'Senior',
                                startingSalary: 90000000,
                                userLikes: [users[1].id],
                                comments: [{comment: "I know, right?", owner: users[1].id}],
                                company: companies[2].id,
                                owner: users[6].id
                            },
                            {
                                title: "Is This a Joke?",
                                content: "I thought this was the hourly pay. It's yearly.",
                                generalRating: 0,
                                startingPosition: 'Junior',
                                startingSalary: 50,
                                company: companies[2].id,
                                owner: users[1].id
                            },
                        ])                
                        .catch(err => {
                            console.error(err)
                            db.close()
                        })
                    })            
                    .catch(error => {
                        console.log(error)
                        db.close()
                    })
                })        
                .catch(err => {
                console.error(err)
                db.close()
                })
        })
        .finally(setTimeout(() => db.close(), 2000))
        .catch(error => {
            console.log(error)
            db.close()
        })
})
