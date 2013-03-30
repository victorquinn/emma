# Emma - Your personal switchboard operator

[Homepage](http://victorquinn.github.com/emma)

[![endorse](http://api.coderwall.com/victorquinn/endorsecount.png)](http://coderwall.com/victorquinn)

## Setup

### Heroku
This app was written to be run on heroku so setup should be a breeze.


### Twitter
At current, only supporting login via Twitter for authorization. Plans to support any OAuth in the future, but starting with Twitter for now.

In order to work with Twitter, you'll have to create an app for any instance of this app. To do so:

1. Visit [https://dev.twitter.com](https://dev.twitter.com) and sign in
1. Under your profile image in the upper right hand corner, go to "My Applications"
1. Click the "Create a new application" button
   * Give your app a name/description/website.
   * For Callback URL specify http://\{your app url\}/auth/twitter/callback
   * Select Read only under Application type
   * Check the "Allow this application to be used to Sign in with Twitter"

## About
This is an [OpenVBX](http://www.openvbx.org) style switchboard operator in node.

At its start it will be a simpler personal switchboard operator routing calls from Twilio numbers to phones in the real world (a la Google Voice) and later possibly expand to be a whole VBX system as OpenVBX is.

## Misc

This project is named for [Emma Nutt, the first female telephone operator](http://en.wikipedia.org/wiki/Emma_Nutt).
