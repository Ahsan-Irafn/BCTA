const https = require('https');

const url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.368819036577!2d138.59972!3d-34.9258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0cedf54316d25%3A0x6b772421379f8be8!2s91%20King%20William%20St%2C%20Adelaide%20SA%205000!5e0!3m2!1sen!2sau!4v1710000000000!5m2!1sen!2sau';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  console.log('Official Embed Status:', res.statusCode);
  console.log('X-Frame-Options:', res.headers['x-frame-options']);
});
