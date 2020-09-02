const config = require('./config/config.json');
const Snoowrap = require('snoowrap')

var factorial=(n)=>Array.from({length: n},(v, k) => k+1).reduce((a, b) => a*b, 1)
// TODO host on heroku
const r = new Snoowrap({
    userAgent: 'factorialbot (v1, kjl3080)',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.username,
    password: config.password,
});

console.info("Started unexpectedFactorialBot...");

r.getSubreddit('all').getNewComments()
.then(async (Listing) => {
    Listing.forEach(async c=>{
        let comment = await c.body
        let regex = /(\d+\!)/;
        let matched = regex.match(comment)
        if(matched !== null) {
            return c.reply(`Are you sure you meant \`${matched[0]}\`? Because that would be equal to \`${factorial(parseInt(matched[0].substring(0, matched[0].length-1)))}\`.
            \n^this ^bot ^ was ^ made ^by ^u/kjl3080.`)
        }
    })
})