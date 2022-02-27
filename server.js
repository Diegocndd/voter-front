const path = require('path');
const express = require('express');
 
const app = express();
 
app.use(express.static(path.join(__dirname, 'build')));
app.set('port', process.env.PORT || 3000);
 
const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});

function approveDomains(opts, certs, cb) {

    if (certs) {
      opts.domains = certs.altnames;
    }
    else {
      opts.domains = opts.domains; // each time a page has been visited, this function will be called and pass in the domain being used to visit this page; here we just assume all domains are fine, and this will generate certs for every domain the user used to visit this page
      opts.email = "skycloud112@gmail.com";
      opts.agreeTos = true;
    }
  
    cb(null, { options: opts, certs: certs });
  }
  
  var lex = require('letsencrypt-express').create({
    // NOTE, server should be set to 'staging' while testing
    server: 'https://acme-v01.api.letsencrypt.org/directory'
    , challenges: { 'tls-sni-01':
      require('le-challenge-sni').create({ webrootPath: '~/letsencrypt/var/acme-challenges' })
    }
    , challengeType: 'tls-sni-01'
    , store: require('le-store-certbot').create({
      configDir: '/etc/letsencrypt',
      privkeyPath: ':configDir/live/:hostname/privkey.pem',
      fullchainPath: ':configDir/live/:hostname/fullchain.pem',
      certPath: ':configDir/live/:hostname/cert.pem',
      chainPath: ':configDir/live/:hostname/chain.pem',
      workDir: '/var/lib/letsencrypt',
      logsDir: '/var/log/letsencrypt',
      webrootPath: '~/letsencrypt/srv/www/:hostname/.well-known/acme-challenge',
      debug: false
    })
    , approveDomains: approveDomains
  });
  //handles acme-challenge and redirects to https
  require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
    console.log("Listening for ACME http-01 challenges on", this.address());
  });
  
  require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
    console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
  });